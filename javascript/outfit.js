const weatherstackKey = "8c2835d0af81eeb0484e866b8a716d7b"; // Replace with your key

function getWeather() {
const selectedCollege = document.getElementById("collegeInput").value.trim();
  if (!selectedCollege) return;

  document.getElementById("location").textContent = "Loading weather...";
  document.getElementById("description").textContent = "";
  document.getElementById("outfit-suggestion").textContent = "";
  document.getElementById("weather-character").src = "images/default.png";

  const query = encodeURIComponent(selectedCollege);
  const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data.current) {
        document.getElementById("location").textContent = "Error loading weather.";
        return;
      }

      const city = data.location.name;
      const region = data.location.region;
      const desc = data.current.weather_descriptions[0];

      document.getElementById("location").textContent = `📍 ${city}, ${region}`;
      document.getElementById("description").textContent = `☁️ ${desc}`;

      suggestOutfit(desc);
    })
    .catch(error => {
      console.error("Fetch error:", error);
      document.getElementById("location").textContent = "Failed to get weather.";
    });
}

function suggestOutfit(description) {
  const lowerDesc = description.toLowerCase();
  const characterImg = document.getElementById("weather-character");
  const outfitText = document.getElementById("outfit-suggestion");

  if (lowerDesc.includes("rain")) {
    characterImg.src = "images/raincoat.png";
    outfitText.textContent = "It's rainy! Wear a raincoat and waterproof shoes.";
  } else if (lowerDesc.includes("snow")) {
    characterImg.src = "images/snow.png";
    outfitText.textContent = "Snowy weather! Bundle up with a coat, gloves, and boots.";
  } else if (lowerDesc.includes("sunny")) {
    characterImg.src = "images/sunny.png";
    outfitText.textContent = "Sunny skies! Go for light clothing and sunglasses.";
  } else if (lowerDesc.includes("cloudy")) {
    characterImg.src = "images/cloudy.png";
    outfitText.textContent = "Cloudy out! Wear layers in case it cools down.";
  } else if (lowerDesc.includes("fog")) {
    characterImg.src = "images/foggy.png";
    outfitText.textContent = "It's foggy! Be visible and wear warm layers.";
  } else {
    characterImg.src = "images/default.jpg";
    outfitText.textContent = "Weather unknown — dress comfortably and check for updates!";
  }
}
