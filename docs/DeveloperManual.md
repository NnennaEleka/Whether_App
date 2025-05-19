
## Developer Manual

This manual is written for future developers who will work on this application. You should be comfortable with JavaScript, Express, and general web application architecture.

---

### 🚀 Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/NnennaEleka/Whether_App.git
cd Whether_App

2. Install Dependencies
npm install
Ensure the following key packages are installed via package.json:
express, @supabase/supabase-js, dotenv, serverless-http, nodemon


3. Set Up Environment Variables
Create a .env file in the project root:

env
Copy
Edit
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key

🖥️ Run the App Locally
To start the backend and serve the front end locally:

bash
Copy
Edit
nodemon index.js

http://localhost:3000/

✅ Manual Testing
We currently support manual testing only:

Use browser DevTools to view console logs and network requests.

Use tools like Postman or Insomnia to test API endpoints.

No automated unit or integration tests have been written yet.

🔌 API Endpoints
GET /api/forum_posts
Returns all forum posts ordered by upvotes.

POST /api/forum_post
Creates a new forum post.

Example Body:

json
Copy
Edit
{
  "text": "It’s hot out here!",
  "location": "College Park, MD",
  "upvotes": 0
}
POST /api/upvote_post?id=POST_ID
Increments the upvote count for the specified forum post ID.

 Known Bugs
Weatherstack API may hit rate limits due to free tier

No filtering or moderation for forum posts

No user authentication (anyone can post or upvote)

Weather chart uses mock data offsets for historical temperatures

📈 Future Roadmap
Add user auth via Supabase Auth

Implement mobile responsiveness and layout fixes

Enable comment threading and moderation for the forum

Integrate better historical weather APIs

Add email or text notifications for daily weather

✅ Deployment
This project is deployed and hosted using Vercel.

You can view the live version here:
whether-app-wheat.vercel.app

It is configured to auto-deploy via GitHub on each push to the main branch.
Serverless functions are located in index.js, and static files are in /public.

📁 Project Structure
pgsql
Copy
Edit
/Whether_App
├── index.js                  # Main Express app
├── public/                   # Static front-end files
│   ├── Home.html
│   ├── forum.html
│   ├── about.html
│   ├── outfit.html
│   ├── help.html
│   ├── styles.css
│   └── home.js
├── .env                      # Not committed
├── package.json
├── vercel.json
├── README.md
└── docs/
    └── DeveloperManual.md    # (optional duplicate of this section)