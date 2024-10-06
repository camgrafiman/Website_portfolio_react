import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import ProjectGallery from '../components/ProjectGallery'
import TagFilter from '../components/TagFilter'
import SEO from '../components/SEO'

const DevProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="John Doe - Development Projects"
        description="Browse through John Doe's development projects. See my work in React, Node.js, and other modern web technologies."
      />
      <h1 className="text-4xl font-bold mb-8">Dev Projects</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filter by Tags</h2>
        <TagFilter selectedTags={selectedTags} onTagToggle={handleTagToggle} />
      </div>
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <ProjectGallery searchTerm={searchTerm} selectedTags={selectedTags} />
    </motion.div>
  )
}

export default DevProjectsPage