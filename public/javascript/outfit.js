const apiKey = "8c2835d0af81eeb0484e866b8a716d7b"; // Use your API key

function getWeather() {
  const select = document.getElementById("collegeSelect");
  const location = select.value;

  if (!location) return;

  const weatherstackURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(
    location
  )}`;
  const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(
    weatherstackURL
  )}`;

  fetch(proxyURL)
    .then((response) => response.json())
    .then((data) => {
      try {
        const parsed = JSON.parse(data.contents);
        if (!parsed || !parsed.current) {
          throw new Error("Weather data unavailable.");
        }

        const description = parsed.current.weather_descriptions[0];
        const temp = parsed.current.temperature;

        updateOutfit(description, temp);
        document.getElementById("location").textContent = `📍 ${location}`;
        document.getElementById(
          "description"
        ).textContent = `🌡️ ${temp}°F - ${description}`;
      } catch (err) {
        console.error("Parsing error:", err);
        document.getElementById("description").textContent =
          "⚠️ Weather info unavailable.";
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById("description").textContent =
        "⚠️ Failed to fetch weather.";
    });
}

function updateOutfit(description, temp) {
  const suggestion = document.getElementById("outfit-suggestion");
  const characterImg = document.getElementById("weather-character");

  const desc = description.toLowerCase();

  if (desc.includes("rain")) {
    characterImg.src = "images/outfit-rainy.jpeg";
    typeOutfitSuggestion("🌧 Rainy — Bring a raincoat and umbrella.");
  } else if (desc.includes("snow")) {
    characterImg.src = "images/outfit-snowy.jpeg";
    typeOutfitSuggestion("❄️ Snowy — Bundle up with coat, boots, and scarf!");
  } else if (temp < 50) {
    characterImg.src = "images/outfit-cold.jpeg";
    typeOutfitSuggestion("🧥 Chilly — Wear a jacket or hoodie.");
  } else if (temp >= 50 && temp < 75) {
    characterImg.src = "images/outfit-mild.jpeg";
    typeOutfitSuggestion("👕 Mild — Long sleeves or light layers recommended.");
  } else if (temp >= 75) {
    characterImg.src = "images/outfit-hot.jpg";
    typeOutfitSuggestion("😎 Hot — T-shirt and shorts weather!");
  } else {
    characterImg.src = "images/default.jpg";
    typeOutfitSuggestion("👚 Weather unclear — Dress comfortably.");
  }
}

function typeOutfitSuggestion(text) {
  const suggestion = document.getElementById("outfit-suggestion");

  new TypeIt("#outfit-suggestion", {
    speed: 40,
    lifeLike: true,
    cursor: false,
  })
    .empty()
    .type(text)
    .go();
}
