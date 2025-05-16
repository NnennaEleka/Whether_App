const apiKey = '8c2835d0af81eeb0484e866b8a716d7b'; // Your Weatherstack API key

function getWeather() {
  const select = document.getElementById('collegeSelect');
  const location = select.value;

  if (!location) return;

  const weatherstackURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(location)}`;
  const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(weatherstackURL)}`;

  fetch(proxyURL)
    .then(response => response.json())
    .then(data => {
      try {
        const parsed = JSON.parse(data.contents); // Parse the actual Weatherstack response
        console.log("Parsed API response:", parsed);

        if (!parsed || !parsed.current) {
          throw new Error("Missing 'current' weather data");
        }

        const temp = parsed.current.temperature;
        const desc = parsed.current.weather_descriptions[0];
        const hashtag = generateHashtag(desc);

        document.getElementById('location').textContent = `📍 ${location}`;
        document.getElementById('temperature').textContent = `🌡️ ${temp}°F`;
        document.getElementById('description').textContent = `🌤️ ${desc}`;
        document.getElementById('hashtag').textContent = hashtag;

        updateBackground(desc);
      } catch (err) {
        console.error("Error processing API response:", err);
        document.getElementById('temperature').textContent = '⚠️ Weather data unavailable.';
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      document.getElementById('temperature').textContent = '⚠️ Failed to load weather.';
    });
}

function generateHashtag(description) {
  const desc = description.toLowerCase();
  if (desc.includes('rain')) return '#rainyday';
  if (desc.includes('sun')) return '#sunnyvibes';
  if (desc.includes('cloud')) return '#cloudcover';
  if (desc.includes('snow')) return '#snowday';
  return '#weatherupdate';
}

function updateBackground(description) {
  const body = document.body;
  const desc = description.toLowerCase();
  if (desc.includes('rain')) body.style.backgroundColor = '#d0e7f9';
  else if (desc.includes('sun')) body.style.backgroundColor = '#fff3b0';
  else if (desc.includes('cloud')) body.style.backgroundColor = '#d3d3d3';
  else if (desc.includes('snow')) body.style.backgroundColor = '#e0f7fa';
  else body.style.backgroundColor = '#e0f7fa';
}
