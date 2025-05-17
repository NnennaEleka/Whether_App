const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const supabaseURL = 'https://wekxazogbvbhpexyqngi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla3hhem9nYnZiaHBleHlxbmdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MTUzNDEsImV4cCI6MjA2MzA5MTM0MX0.mSGCeCK6UXI4j8JhYEoSR5HMaevrTDF-EJGHscRkNpM';
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

app.get('/forum_posts', async (req, res) => {
    console.log('Attempting to get all forum posts')

    const { data, error } = await supabase
  .from('forum_posts')
  .select('*')
  .order('upvotes', { ascending: false });

  if(error) {
    console.log(`Error: ${error}`)
    res.statusCode = 400
    res.send(error)
  }

  res.send(data)
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

