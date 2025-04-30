import Blog from '../models/Blog.js';
import { body,validationResult } from 'express-validator';


export const createBlog = async (req, res) => {
body('title').notEmpty().withMessage('Title is required'),
body('content').notEmpty().withMessage('Content is required'),
body('category').isMongoId().withMessage('Category is required')
const errors = validationResult(req);
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const blog = new Blog({ ...req.body, author: req.user.id });
    await blog.save();
    res.status(201).json({blog});
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name')
      .populate('category', 'name');
    res.json(blogs);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name')
      .populate('category', 'name');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog removed' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};