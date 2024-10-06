// This file contains functions to interact with your Strapi API

// Use import.meta.env instead of process.env for Vite projects
const STRAPI_API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

// Placeholder data for when Strapi is not connected
const placeholderPosts = [
  {
    id: 1,
    attributes: {
      title: "Getting Started with React",
      content: "<p>This is a placeholder content for the React tutorial. In this post, we'll cover the basics of React, including components, state, and props.</p><h2>What is React?</h2><p>React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage the state of your application efficiently.</p><h2>Key Concepts</h2><ul><li>Components</li><li>JSX</li><li>State and Props</li><li>Hooks</li></ul><p>Stay tuned for more in-depth React tutorials!</p>",
      excerpt: "Learn the basics of React in this comprehensive guide.",
      publishedAt: "2023-04-01T10:00:00.000Z",
      author: {
        data: {
          attributes: {
            name: "John Doe"
          }
        }
      },
      category: {
        data: {
          attributes: {
            name: "Frontend"
          }
        }
      },
      tags: {
        data: [
          { attributes: { name: "React" } },
          { attributes: { name: "JavaScript" } }
        ]
      },
      image: {
        data: {
          attributes: {
            url: "/placeholder-image.jpg"
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Introduction to Node.js",
      content: "<p>This is a placeholder content for the Node.js tutorial. In this post, we'll introduce you to Node.js and its core concepts.</p><h2>What is Node.js?</h2><p>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side.</p><h2>Key Features</h2><ul><li>Asynchronous I/O</li><li>Event-driven architecture</li><li>NPM (Node Package Manager)</li><li>Built-in modules</li></ul><p>Stay tuned for more in-depth Node.js tutorials!</p>",
      excerpt: "Discover the power of server-side JavaScript with Node.js.",
      publishedAt: "2023-04-15T14:30:00.000Z",
      author: {
        data: {
          attributes: {
            name: "Jane Smith"
          }
        }
      },
      category: {
        data: {
          attributes: {
            name: "Backend"
          }
        }
      },
      tags: {
        data: [
          { attributes: { name: "Node.js" } },
          { attributes: { name: "JavaScript" } },
          { attributes: { name: "Backend" } }
        ]
      },
      image: {
        data: {
          attributes: {
            url: "/placeholder-image-2.jpg"
          }
        }
      }
    }
  }
];

// Function to fetch all blog posts
export const fetchBlogPosts = async () => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blog-posts?populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.warn('Unable to fetch blog posts from Strapi. Using placeholder data instead.');
    console.info('To connect to your Strapi backend, make sure to set the VITE_STRAPI_URL environment variable.');
    return placeholderPosts;
  }
};

// Function to fetch a single blog post by ID
export const fetchBlogPost = async (id: string) => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blog-posts/${id}?populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.warn(`Unable to fetch blog post with id ${id} from Strapi. Using placeholder data instead.`);
    console.info('To connect to your Strapi backend, make sure to set the VITE_STRAPI_URL environment variable.');
    return placeholderPosts.find(post => post.id.toString() === id) || null;
  }
};

// Function to create a new blog post
export const createBlogPost = async (postData: Partial<BlogPost>) => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blog-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: postData }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

// Function to update an existing blog post
export const updateBlogPost = async (id: number, postData: Partial<BlogPost>) => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blog-posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: postData }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

// Function to delete a blog post
export const deleteBlogPost = async (id: number) => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blog-posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};