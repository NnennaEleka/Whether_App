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
