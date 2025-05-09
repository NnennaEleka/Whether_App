const weatherstackKey = "8c2835d0af81eeb0484e866b8a716d7b"; // Replace with your Weatherstack API key

// 1. Load Colleges and their City/State
// function loadColleges() {
//     fetch('https://api.data.gov/ed/collegescorecard/v1/schools?api_key='MY API_KEY')
//       .then(response => response.json())
//       .then(data => {
//         const collegeSelect = document.getElementById('collegeSelect');
//         data.results.forEach(school => {
//           const option = document.createElement('option');
//           option.value = school.id; // Unique ID for each school
//           option.textContent = `${school.school.name} - ${school.location.city}, ${school.location.state}`;
//           collegeSelect.appendChild(option);
//         });
//       })
//       .catch(error => console.error('Failed to load colleges:', error));
//   }

// 2. Get Weather Data for Selected College (City and State)
function getWeather() {
  const selectedCollege = document.getElementById("collegeSelect").value;
  if (!selectedCollege) return; // No college selected

  document.getElementById("location").textContent = "Loading...";
  document.getElementById("temperature").textContent = "";
  document.getElementById("description").textContent = "";
  document.getElementById("hashtag").textContent = "";

  const query = encodeURIComponent(selectedCollege);
  const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data.current) {
        document.getElementById(
          "location"
        ).innerHTML = `<span class="error">Error: ${
          data.error?.info || "Could not load weather"
        }</span>`;
        return;
      }

      const city = data.location.name;
      const region = data.location.region;
      const tempC = data.current.temperature;
      const desc = data.current.weather_descriptions[0];

      const tempF = (tempC * 9) / 5 + 32;

      document.getElementById("location").textContent = `📍 ${city}, ${region}`;
      document.getElementById("temperature").textContent = `${tempF.toFixed(
        1
      )}°F`;
      document.getElementById("description").textContent = `☁️ ${desc}`;
      document.getElementById("hashtag").textContent = generateHashtag(desc);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      document.getElementById("location").innerHTML =
        '<span class="error">Failed to fetch weather.</span>';
    });

  // fetch(`https://api.data.gov/ed/collegescorecard/v1/schools/${selectedCollege}?api_key=YOUR_API_KEY`)
  //   .then(response => response.json())
  //   .then(data => {
  //     const city = data.results[0].location.city;
  //     const state = data.results[0].location.state;

  //     // Use the city and state to fetch weather data
  //     fetch(`http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${encodeURIComponent(city)},${state}`)
  //       .then(response => response.json())
  //       .then(weatherData => {
  //         if (weatherData.success === false) {
  //           document.getElementById('location').innerHTML = `<span class="error">Error: ${weatherData.error.info}</span>`;
  //           return;
  //         }

  //         document.getElementById('location').textContent = `📍 ${city}, ${state}`;
  //         document.getElementById('temperature').textContent = `🌡️ ${weatherData.current.temperature}°C`;
  //         document.getElementById('description').textContent = `☁️ ${weatherData.current.weather_descriptions[0]}`;
  //       })
  //       .catch(error => {
  //         document.getElementById('location').innerHTML = '<span class="error">Failed to fetch weather.</span>';
  //         console.error(error);
  //       });
  //   })
  //   .catch(error => {
  //     document.getElementById('location').innerHTML = '<span class="error">Failed to fetch college data.</span>';
  //     console.error(error);
  //   });
}

// Toggle Between °C and °F
function toggleTempUnit() {
  if (currentTempCelsius === null) return;

  if (showingFahrenheit) {
    document.getElementById(
      "temp-value"
    ).textContent = `${currentTempCelsius}°C`;
    showingFahrenheit = false;
  } else {
    const tempF = (currentTempCelsius * 9) / 5 + 32;
    document.getElementById("temp-value").textContent = `${tempF.toFixed(1)}°F`;
    showingFahrenheit = true;
  }
}

// Generate Hashtag from Weather Description
function generateHashtag(description) {
  if (!description) return "";

  const keywords = [
    "sunny",
    "cloudy",
    "rain",
    "storm",
    "fog",
    "snow",
    "wind",
    "haze",
  ];

  const lowerDesc = description.toLowerCase();

  for (const keyword of keywords) {
    if (lowerDesc.includes(keyword)) {
      return `#${keyword}`;
    }
  }

  // fallback to first word if no match found
  return `#${lowerDesc.split(" ")[0]}`;
}

function testWeatherAPI() {
  const testCity = "New York";

  const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${encodeURIComponent(
    testCity
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("WeatherStack API Response:", data);

      if (data.success === false) {
        console.error("WeatherStack Error:", data.error.info);
      } else {
        console.log(
          `✅ Weather in ${data.location.name}: ${data.current.temperature}°C and ${data.current.weather_descriptions[0]}`
        );
      }
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
}

// Initialize college dropdown on page load
//   window.addEventListener('DOMContentLoaded', loadColleges);

//window.onload = loadWeather();
