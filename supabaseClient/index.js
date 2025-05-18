require('dotenv').config();

const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

// const dotenv = require('dotenv');
// dotenv.config();

const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);
console.log('Supabase URL:', supabaseURL);
console.log('Supabase Key:', supabaseKey);

app.get('/forum_posts', async (req, res) => {
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

app.post('/forum_post', async(req, res) => {
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

app.listen(port, () => {
    console.log('App is alive on port', + port);
});

