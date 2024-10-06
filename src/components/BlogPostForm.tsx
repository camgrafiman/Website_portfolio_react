import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  attributes: {
    title: string;
    content: string;
    excerpt: string;
    publishedAt: string;
    author: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
    tags: {
      data: Array<{
        attributes: {
          name: string;
        };
      }>;
    };
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface BlogPostFormProps {
  post: BlogPost | null;
  onSubmit: (data: Partial<BlogPost>) => void;
  onCancel: () => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    tags: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.attributes.title,
        content: post.attributes.content,
        excerpt: post.attributes.excerpt,
        author: post.attributes.author.data.attributes.name,
        category: post.attributes.category.data.attributes.name,
        tags: post.attributes.tags.data.map(tag => tag.attributes.name).join(', '),
        imageUrl: post.attributes.image.data.attributes.url,
      });
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      attributes: {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author: { data: { attributes: { name: formData.author } } },
        category: { data: { attributes: { name: formData.category } } },
        tags: { data: formData.tags.split(',').map(tag => ({ attributes: { name: tag.trim() } })) },
        image: { data: { attributes: { url: formData.imageUrl } } },
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">{post ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="content" className="block mb-1">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            ></textarea>
          </div>
          <div>
            <label htmlFor="excerpt" className="block mb-1">Excerpt</label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="author" className="block mb-1">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-1">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block mb-1">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {post ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default BlogPostForm;