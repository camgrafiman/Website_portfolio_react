import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import About from '../components/About'
import ImageGallery from '../components/ImageGallery'
import SEO from '../components/SEO'

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <>
      <SEO 
        title="John Doe - Web Developer & Designer Portfolio"
        description="Explore John Doe's portfolio showcasing innovative web development and design projects. Discover my skills in React, JavaScript, and UI/UX design."
      />
      <About />
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Image Gallery</h2>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center">
            <Filter className="mr-2 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="web">Web Design</option>
              <option value="graphic">Graphic Design</option>
              <option value="ui">UI/UX</option>
            </select>
          </div>
        </div>
        <ImageGallery searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </section>
    </>
  )
}

export default HomePage