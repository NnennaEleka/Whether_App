let posts = [];

window.onload = () => {
  fetchPosts();
};

async function fetchPosts() {
  try {
    const response = await fetch('/api/forum_posts');
    const data = await response.json();

    posts = data; // Update the global posts array for AI summary

    const list = document.getElementById('post-list');
    list.innerHTML = ''; // Clear current list

    data.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `
      <strong>${post.location}</strong>: ${post.text}
      <button onclick="upvotePost(${post.id})">👍 ${post.upvotes || 0}</button>
    `;
      list.appendChild(li);
    });

    updateAISummary(); //Call the AI summary after rendering posts
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}


async function submitPost() {
  const text = document.getElementById('post-input').value.trim();
  const location = localStorage.getItem('selectedLocation'); // saved from Home

  if (!text) return alert("Please enter something!");
  if (!location) return alert("Location not set. Please select on Home page first.");

  try {
    const response = await fetch('/api/forum_post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, location })
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Post added:', result);
      document.getElementById('post-input').value = '';
      fetchPosts(); // reload posts
    } else {
      console.error('POST failed:', result.error);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

async function upvotePost(postId) {
  try {
    const response = await fetch(`/api/upvote_post?id=${postId}`, {
      method: 'POST'
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Upvoted:', result);
      fetchPosts(); // Refresh the post list
    } else {
      console.error('Upvote failed:', result.error);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}



  

function updateAISummary() {
  const summaryBox = document.getElementById('ai-summary');
  if (!summaryBox) return;

  // Combine all post texts
  const allText = posts.map(p => p.text.toLowerCase()).join(' ');

  // Simple keyword extraction: count word frequency
  const words = allText.match(/\b[a-z]+\b/g) || [];
  const stopwords = ['the', 'and', 'is', 'are', 'to', 'a', 'it', 'on', 'in', 'for', 'of', 'with', 'i', 'you'];
  const freqMap = {};

  words.forEach(word => {
    if (!stopwords.includes(word)) {
      freqMap[word] = (freqMap[word] || 0) + 1;
    }
  });

  // Get top 5 keywords
  const topWords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);

  // Display AI Summary
  summaryBox.innerHTML = `<strong>AI Summary:</strong> ${topWords.join(', ')} — students suggest dressing accordingly.`;
}
