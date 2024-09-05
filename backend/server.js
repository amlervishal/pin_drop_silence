import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Could not connect to MongoDB', error));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Define Post Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Function to create predefined users
async function createPredefinedUsers() {
  const users = [
    { username: process.env.USER1_USERNAME, password: process.env.USER1_PASSWORD },
    { username: process.env.USER2_USERNAME, password: process.env.USER2_PASSWORD }
  ];

  for (let user of users) {
    try {
      const existingUser = await User.findOne({ username: user.username });
      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        await User.create({ username: user.username, password: hashedPassword });
        console.log(`User ${user.username} created successfully`);
      }
    } catch (error) {
      console.error(`Error creating user ${user.username}:`, error);
    }
  }
}

// Call the function to create predefined users
createPredefinedUsers();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid', error });
  }
};

// Routes

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  console.log('Received request to fetch posts');
  try {
    const posts = await Post.find().sort({ date: -1 });
    console.log(`Found ${posts.length} posts`);
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
app.post('/api/posts/', verifyToken, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific post
app.get('/api/posts/:id', async (req, res) => {
  console.log('Received request for post with id:', req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      console.log('Post not found for id:', req.params.id);
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log('Found post:', post);
    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update a post
app.put('/api/posts/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, 
      { 
        title: req.body.title, 
        content: req.body.content,
        imageUrl: req.body.imageUrl
      }, 
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post (protected route)
app.delete('/api/posts/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Listen to server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`Full server address: http://localhost:${PORT}`);
});