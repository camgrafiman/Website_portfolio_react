import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import DevProjectsPage from './pages/DevProjectsPage'
import ContactForm from './components/ContactForm'
import ThanksPage from './pages/ThanksPage'
import BlogPage from './pages/BlogPage'
import AdminBlogPage from './pages/AdminBlogPage'
import PrivateRoute from './components/PrivateRoute'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dev-projects" element={<DevProjectsPage />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/thanks" element={<ThanksPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route
              path="/admin/blog"
              element={
                <PrivateRoute>
                  <AdminBlogPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App