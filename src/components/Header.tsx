import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import AdminLogin from './AdminLogin'

const Header: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdmin') === 'true'
      setIsAdmin(adminStatus)
    }

    checkAdminStatus()
    window.addEventListener('storage', checkAdminStatus)

    return () => {
      window.removeEventListener('storage', checkAdminStatus)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-600 dark:bg-blue-800 text-white py-4 px-6 md:px-12"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-bold flex items-center">
          <Code className="mr-2" />
          <span>John Doe</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-blue-200 transition-colors">Home</Link></li>
              <li><Link to="/dev-projects" className="hover:text-blue-200 transition-colors">Projects</Link></li>
              <li><Link to="/blog" className="hover:text-blue-200 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-200 transition-colors">Contact</Link></li>
              {isAdmin && (
                <li><Link to="/admin/blog" className="hover:text-blue-200 transition-colors">Manage Blog</Link></li>
              )}
            </ul>
          </nav>
          <ThemeToggle />
          <AdminLogin />
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <nav>
              <ul className="flex flex-col space-y-2">
                <li><Link to="/" className="block py-2 hover:text-blue-200 transition-colors" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/dev-projects" className="block py-2 hover:text-blue-200 transition-colors" onClick={toggleMenu}>Projects</Link></li>
                <li><Link to="/blog" className="block py-2 hover:text-blue-200 transition-colors" onClick={toggleMenu}>Blog</Link></li>
                <li><Link to="/contact" className="block py-2 hover:text-blue-200 transition-colors" onClick={toggleMenu}>Contact</Link></li>
                {isAdmin && (
                  <li><Link to="/admin/blog" className="block py-2 hover:text-blue-200 transition-colors" onClick={toggleMenu}>Manage Blog</Link></li>
                )}
              </ul>
            </nav>
            <div className="mt-4 flex items-center justify-between">
              <ThemeToggle />
              <AdminLogin />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header