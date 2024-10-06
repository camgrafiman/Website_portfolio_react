import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Folder } from 'lucide-react';
import SEO from './SEO';

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

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack }) => {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title={`${post.attributes.title} - John Doe's Blog`}
        description={post.attributes.excerpt}
      />
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to all posts
      </button>
      <img 
        src={`${import.meta.env.VITE_STRAPI_URL || ''}${post.attributes.image.data.attributes.url}`} 
        alt={post.attributes.title} 
        className="w-full h-96 object-cover rounded-lg mb-6" 
      />
      <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>
      <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
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
      <div 
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.attributes.content }}
      />
    </motion.article>
  );
};

export default BlogPostView;