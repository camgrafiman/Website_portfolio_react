import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash } from 'lucide-react';
import { fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../services/strapiService';
import BlogPostForm from '../components/BlogPostForm';
import SEO from '../components/SEO';

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

const AdminBlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await fetchBlogPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to load blog posts.');
      console.error('Error loading blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData: Partial<BlogPost>) => {
    try {
      await createBlogPost(postData);
      loadPosts();
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError('Failed to create blog post.');
    }
  };

  const handleUpdatePost = async (postId: number, postData: Partial<BlogPost>) => {
    try {
      await updateBlogPost(postId, postData);
      loadPosts();
      setSelectedPost(null);
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError('Failed to update blog post.');
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteBlogPost(postId);
        loadPosts();
      } catch (err) {
        console.error('Error deleting blog post:', err);
        setError('Failed to delete blog post.');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="Admin - Manage Blog Posts"
        description="Admin page for managing blog posts"
      />
      <h1 className="text-4xl font-bold mb-8">Manage Blog Posts</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={() => {
          setSelectedPost(null);
          setIsFormOpen(true);
        }}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded flex items-center"
      >
        <Plus size={20} className="mr-2" />
        Create New Post
      </button>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{post.attributes.title}</h2>
              <div>
                <button
                  onClick={() => {
                    setSelectedPost(post);
                    setIsFormOpen(true);
                  }}
                  className="mr-2 text-blue-500 hover:text-blue-700"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isFormOpen && (
        <BlogPostForm
          post={selectedPost}
          onSubmit={selectedPost ? (data) => handleUpdatePost(selectedPost.id, data) : handleCreatePost}
          onCancel={() => {
            setSelectedPost(null);
            setIsFormOpen(false);
          }}
        />
      )}
    </motion.div>
  );
};

export default AdminBlogPage;