import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, Folder } from 'lucide-react';
import SEO from '../components/SEO';
import BlogPostView from '../components/BlogPostView';
import { fetchBlogPosts, fetchBlogPost } from '../services/strapiService';

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

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPosts = await fetchBlogPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to load blog posts. Using placeholder data.');
        console.error('Error loading blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handlePostClick = async (postId: number) => {
    try {
      setLoading(true);
      setError(null);
      const post = await fetchBlogPost(postId.toString());
      setSelectedPost(post);
    } catch (err) {
      setError('Failed to load the blog post. Using placeholder data.');
      console.error('Error loading blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="John Doe's Blog - Web Development Insights"
        description="Read the latest articles on web development, design trends, and tech insights from John Doe."
      />
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="text-yellow-500">{error}</p>
      ) : selectedPost ? (
        <BlogPostView post={selectedPost} onBack={() => setSelectedPost(null)} />
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <img 
                src={`${import.meta.env.VITE_STRAPI_URL || ''}${post.attributes.image.data.attributes.url}`} 
                alt={post.attributes.title} 
                className="w-full h-64 object-cover" 
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{post.attributes.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.attributes.excerpt}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center mr-4 mb-2">
                    <Calendar size={16} className="mr-1" />
                    {new Date(post.attributes.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center mr-4 mb-2">
                    <User size={16} className="mr-1" />
                    {post.attributes.author.data.attributes.name}
                  </span>
                  <span className="flex items-center mr-4 mb-2">
                    <Folder size={16} className="mr-1" />
                    {post.attributes.category.data.attributes.name}
                  </span>
                  {post.attributes.tags.data.map((tag) => (
                    <span key={tag.attributes.name} className="flex items-center mr-2 mb-2">
                      <Tag size={16} className="mr-1" />
                      {tag.attributes.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BlogPage;