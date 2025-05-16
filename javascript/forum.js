let posts = [];

function submitPost() {
  const input = document.getElementById('post-input');
  const text = input.value.trim();
  if (!text) return;

  const post = {
    text: text,
    upvotes: 0,
    id: Date.now()
  };

  posts.unshift(post); // add to the top
  input.value = '';
  renderPosts();
  updateAISummary();
}

function upvotePost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.upvotes++;
    renderPosts();
    updateAISummary();
  }
}

function renderPosts() {
    const list = document.getElementById('post-list');
    list.innerHTML = '';
  
    // Sort posts: highest upvotes first, then newest
    const sortedPosts = [...posts].sort((a, b) => {
      if (b.upvotes === a.upvotes) {
        return b.id - a.id; // newer posts first if upvotes are equal
      }
      return b.upvotes - a.upvotes; // higher upvotes first
    });
  
    sortedPosts.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${post.text}</span>
        <button class="upvote" onclick="upvotePost(${post.id})">👍 ${post.upvotes}</button>
      `;
      list.appendChild(li);
    });
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
