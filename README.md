# LUMA
Math Recommender System
Luma Recommender — local dev server

Quick server setup (optional):

1. Install Node (>=14).
2. In the project folder run:
   npm install
3. Start the server:
   npm start

API endpoints:
- GET  /api/ping
- GET  /api/users
- POST /api/users      { username, role }
- GET  /api/progress
- GET  /api/progress/:user
- POST /api/progress/:user   (JSON body = progress object)

Notes:
- Server stores data in `store.json` next to `server.js`.
- This server is a minimal scaffold for local testing only.

Client & testing notes:
- Open `index.html` in your browser (double-click or serve from a static server).
- To try the teacher dashboard quickly: in the Teacher panel click **Add sample data** (creates `alice`, `bobby`, and `teacher` accounts).
- Sign in as **teacher** or use the **Switch role** button and enter `teacher` to access export and sync features.
- To try server sync, run the server locally (`npm install`, `npm start`) and click **Sync to server** from the Teacher panel.
