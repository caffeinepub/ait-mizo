# Specification

## Summary
**Goal:** Build a login-protected shared media archive (AIT MIZO) with Internet Identity authentication, unique usernames, admin user management, organized uploads for Memories and Question Papers, search/filtering, and installable PWA branding.

**Planned changes:**
- Add Internet Identity sign-in/out and protect all main routes behind authentication.
- Add first-login onboarding to claim a globally unique username mapped to the authenticated principal and display it in the UI.
- Build a responsive post-login dashboard with two sections: Memory and Question Papers, with navigation for desktop and mobile.
- Implement Memory archive: upload (drag-and-drop, bulk, preview, progress), item metadata (upload date), sorting (newest/oldest), search by filename/metadata, download, and internal copy-link per item.
- Implement Memory organization: folders (create/rename/delete with defined behavior), moving items between folders, categories/labels for filtering.
- Implement Question Papers section with two sub-sections: Old Question Paper Images and External Links & Sources, each separated in UI/data model.
- Implement Old Question Paper Images: bulk image uploads with progress, upload date display, subject/year folder structure and management, search & filters by subject/year.
- Implement External Links & Sources: add link entries (URL/title/description), foldering, categorization (subject/exam type), search/filter, and safe open/redirect action.
- Enforce shared-archive access: all active logged-in users can view/search/download all content; deactivated users are blocked.
- Add storage usage indicator (total and/or per-section) that updates after uploads/deletes.
- Implement large upload handling via chunked uploads with retry UX and backend chunk assembly/finalization.
- Add backend query/indexing for paginated listing and server-side search/filtering across required fields.
- Create admin-only panel: list users, view details, grant/revoke admin, deactivate/reactivate; enforce admin-only access.
- Add admin-only backup/export of metadata (and link data) plus a restore/import mechanism or clearly surfaced restore procedure with feedback.
- Apply cohesive responsive UI theme (cream/white base, deep blue/muted purple accents, card-based layout, smooth animations).
- Add PWA support (manifest + installability) and integrate generated brand assets (logo/icons) into UI, favicon, and manifest.

**User-visible outcome:** Users can sign in with Internet Identity, claim a unique username, and access a shared archive to upload, organize, search, preview, and download Memories and Question Paper content; admins can manage users and export/restore metadata; the app is responsive and installable as a PWA with AIT MIZO branding.
