require('dotenv').config();

const express = require('express');
const path = require('path');

const supabaseClient = require('@supabase/supabase-js');
// const bodyParser = require('body-parser');
const serverless = require('serverless-http');

// const dotenv = require('dotenv');
// dotenv.config();

const app = express()
//const port = 3000;
//local server testing
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🌐 Local server running on http://localhost:${PORT}`);
  });
}

// app.use(bodyParser.json())
// app.use(express.static(__dirname + '/public'));
app.use(express.json());



const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

console.log('Supabase URL:', supabaseURL);
console.log('Supabase Key:', supabaseKey);




// app.get('/', (req, res) => {
//   res.sendFile('public/Home.html', {root: __dirname});
// });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});



app.get('/api/forum_posts', async (req, res) => {
    console.log('Attempting to get all forum posts')

    const { data, error } = await supabase
  .from('forum_posts')
  .select('*')
  .order('upvotes', { ascending: false });

  if(error) {
    console.error('Supabase error:', error);
    return res.status(400).json({ error: error.message });
  }

  res.json(data)
});

app.post('/api/forum_post', async(req, res) => {
    console.log('Adding forum post');

    console.log(req.body);


  const { text, location, upvotes } = req.body;

  if (!text || !location) {
    return res.status(400).json({ error: 'Text and location are required' });
  }

  const { data, error } = await supabase
    .from('forum_posts')
    .insert([{ text, location, upvotes: upvotes || 0 }])
    .select(); 

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: error.message });
  }

  console.log('Post created:', data[0]);

  res.status(201).json({ message: 'Post created!', post: data[0] });
});

app.post('/api/upvote_post', async (req, res) => {
  const postId = req.query.id;

  if (!postId) return res.status(400).json({ error: 'Missing post ID' });

  // 1. Get the current upvotes
  const { data: existing, error: getError } = await supabase
    .from('forum_posts')
    .select('upvotes')
    .eq('id', postId)
    .single();

  if (getError || !existing) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const newUpvotes = (existing.upvotes || 0) + 1;

  // 2. Update with new upvote count
  const { data, error: updateError } = await supabase
    .from('forum_posts')
    .update({ upvotes: newUpvotes })
    .eq('id', postId)
    .select();

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  res.status(200).json({ message: 'Upvoted!', post: data[0] });
});



// app.listen(port, () => {
//     console.log('App is alive on port', + port);
// });


module.exports = app;
module.exports.handler = serverless(app);