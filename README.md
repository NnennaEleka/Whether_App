# Names: Wahida Zaker & Nnenna Elekalachi

# 🌤️ Whether App

Whether is a weather-based outfit recommendation and student feedback web application built for college students. It helps users make smarter clothing decisions by providing real-time weather updates, animated outfit suggestions, and a student forum to share campus-specific weather perceptions.

---

## 🚀 Features

- 🌦️ **Real-Time Weather Updates** via Weatherstack API
- 🧥 **Dynamic Outfit Recommendations** based on temperature and conditions
- 📈 **Interactive Temperature Trend Chart** using Chart.js
- ✍️ **Typing Animation for Outfit Tips** powered by TypeIt.js
- 💬 **Student Forum** for sharing live, crowd-sourced weather impressions
- 📱 **Responsive Design** for mobile and desktop users

---

## 🛠️ Technologies Used

### Front-End

- **HTML, CSS, JavaScript**
- **Chart.js** – for visualizing recent temperature trends
- **TypeIt.js** – for animating outfit suggestions
- **Weatherstack API** – for fetching current weather data

---

## 📄 Pages Overview

- **Home Page**: Users select a college and view real-time weather and a chart of simulated past temperatures.
- **Outfit Page**: Displays a character image and outfit suggestion based on current weather with animated typing.
- **Forum Page**: Students can post weather perceptions and upvote others' posts; includes an AI-style summary.
- **Help Page**: Quick-start instructions for new users.
- **About Page**: Overview of the app’s purpose and who it’s for.

---

## 💻 Front-End Implementation Notes

- The `home.js` file handles the weather lookup when a user selects a college. It shows the current temperature, weather description, and a related hashtag. It also changes the background color to match the weather and shows a line chart (using Chart.js) to display how the temperature has changed over the past 4 hours.

- The `outfit.js` file gives users an outfit recommendation based on the current temperature and weather. It changes the character image and shows a typed-out suggestion using TypeIt.js, making the text feel more interactive.

- The `forum.js` file lets students post what the weather feels like on their campus. Users can upvote posts, and the app highlights the most popular ones. It also creates a short summary by pulling out the most common words used in recent posts.

- All the pages share the same navigation bar and footer, so it's easy to move between them.

- Everything on the front end is built with basic HTML, CSS, and JavaScript — no frameworks — so it’s lightweight and easy to follow.

- The app uses a free proxy (AllOrigins) to safely pull data from the Weatherstack API without running into CORS issues.

[Developer Manual](#developer-manual)

# ☁️ Whether App

## Project Description

The **Whether App** is a weather-driven campus assistant designed to help college students quickly decide whether to bring an umbrella, wear shorts, or grab a jacket. It integrates live weather forecasts with community feedback from students across campus. Users can:

- View real-time temperature and weather conditions
- Get clothing recommendations based on weather
- Post and upvote weather-related messages on a student forum

Our unique feature? We blend accurate forecast data from Weatherstack with live, location-based feedback from students, giving a personalized take on the campus climate.

---

## Target Browsers

This application has been tested and is optimized for:

- Google Chrome (macOS, Windows, Android)
- Safari (macOS, iOS)
- Firefox (macOS, Windows)
- Microsoft Edge (Windows)

Mobile support is not the primary focus, but layout remains functional on iOS and Android mobile devices.

---

## [Developer Manual](#developer-manual)

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