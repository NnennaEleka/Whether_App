const apiKey = "8c2835d0af81eeb0484e866b8a716d7b"; // Your Weatherstack API key

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
        const parsed = JSON.parse(data.contents); // Parse the actual Weatherstack response
        console.log("Parsed API response:", parsed);

        if (!parsed || !parsed.current) {
          throw new Error("Missing 'current' weather data");
        }

        const temp = parsed.current.temperature;
        const desc = parsed.current.weather_descriptions[0];
        const hashtag = generateHashtag(desc);

        document.getElementById("location").textContent = `📍 ${location}`;
        document.getElementById("temperature").textContent = `🌡️ ${temp}°F`;
        document.getElementById("description").textContent = `🌤️ ${desc}`;
        document.getElementById("hashtag").textContent = hashtag;

        updateBackground(desc);
        updateChart(location, temp);
      } catch (err) {
        console.error("Error processing API response:", err);
        document.getElementById("temperature").textContent =
          "⚠️ Weather data unavailable.";
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById("temperature").textContent =
        "⚠️ Failed to load weather.";
    });
}

function generateHashtag(description) {
  const desc = description.toLowerCase();
  if (desc.includes("rain")) return "#rainyday";
  if (desc.includes("sun")) return "#sunnyvibes";
  if (desc.includes("cloud")) return "#cloudcover";
  if (desc.includes("snow")) return "#snowday";
  return "#weatherupdate";
}

function updateBackground(description) {
  const body = document.body;
  const desc = description.toLowerCase();
  if (desc.includes("rain")) body.style.backgroundColor = "#d0e7f9";
  else if (desc.includes("sun")) body.style.backgroundColor = "#fff3b0";
  else if (desc.includes("cloud")) body.style.backgroundColor = "#d3d3d3";
  else if (desc.includes("snow")) body.style.backgroundColor = "#e0f7fa";
  else body.style.backgroundColor = "#e0f7fa";
}

let tempHistory = [];
let chart;

function updateChart(location, currentTemp) {
  const tempData = [
    currentTemp - 4, // 4 hours ago
    currentTemp - 3, // 3 hours ago
    currentTemp - 2, // 2 hours ago
    currentTemp - 1, // 1 hour ago
    currentTemp      // now
  ];

  const timeLabels = ['-4h', '-3h', '-2h', '-1h', 'Now'];

  const ctx = document.getElementById('tempChart').getContext('2d');

  if (chart) {
    chart.data.labels = timeLabels;
    chart.data.datasets[0].data = tempData;
    chart.update();
  } else {
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: [{
          label: `Last 4 Hours Temp (${location})`,
          data: tempData,
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}
