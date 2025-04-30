import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blogg', BlogSchema);

export default Blog;