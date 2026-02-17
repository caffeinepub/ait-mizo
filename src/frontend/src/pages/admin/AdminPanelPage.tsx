import { useIsCallerAdmin, useListAllUsers, useDeactivateUser, useReactivateUser, useAssignUserRole } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Shield, ShieldOff, UserX, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import { UserRole } from '../../backend';
import { useState } from 'react';

export default function AdminPanelPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: users = [], isLoading: usersLoading } = useListAllUsers();
  const deactivateUser = useDeactivateUser();
  const reactivateUser = useReactivateUser();
  const assignRole = useAssignUserRole();
  const [actionUser, setActionUser] = useState<string | null>(null);

  if (adminLoading || usersLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access the admin panel.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleDeactivate = async (principal: string) => {
    try {
      await deactivateUser.mutateAsync({ toText: () => principal } as any);
      toast.success('User deactivated successfully');
      setActionUser(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to deactivate user');
    }
  };

  const handleReactivate = async (principal: string) => {
    try {
      await reactivateUser.mutateAsync({ toText: () => principal } as any);
      toast.success('User reactivated successfully');
      setActionUser(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to reactivate user');
    }
  };

  const handleToggleAdmin = async (principal: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? UserRole.user : UserRole.admin;
      await assignRole.mutateAsync({ 
        user: { toText: () => principal } as any, 
        role: newRole 
      });
      toast.success(`User role updated to ${newRole}`);
      setActionUser(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user role');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground text-lg">
          Manage users, roles, and system settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage all registered users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const principalText = user.principal.toText();
                return (
                  <TableRow key={principalText}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell className="font-mono text-xs max-w-[200px] truncate">
                      {principalText}
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? 'default' : 'secondary'}>
                        {user.isActive ? 'Active' : 'Deactivated'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(Number(user.createdAt) / 1000000).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => {
                                e.preventDefault();
                                setActionUser(principalText);
                              }}>
                                <Shield className="mr-2 h-4 w-4" />
                                Toggle Admin Role
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            {actionUser === principalText && (
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Change User Role</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to change this user's role?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setActionUser(null)}>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleToggleAdmin(principalText, 'user')}>
                                    Confirm
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            )}
                          </AlertDialog>

                          {user.isActive ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => {
                                  e.preventDefault();
                                  setActionUser(principalText);
                                }}>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Deactivate User
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              {actionUser === principalText && (
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Deactivate User</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will prevent the user from accessing the platform. You can reactivate them later.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setActionUser(null)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeactivate(principalText)}>
                                      Deactivate
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              )}
                            </AlertDialog>
                          ) : (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => {
                                  e.preventDefault();
                                  setActionUser(principalText);
                                }}>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Reactivate User
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              {actionUser === principalText && (
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Reactivate User</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will restore the user's access to the platform.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setActionUser(null)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleReactivate(principalText)}>
                                      Reactivate
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              )}
                            </AlertDialog>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {users.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No users found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
