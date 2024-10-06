import React from 'react'
import { motion } from 'framer-motion'

interface TagFilterProps {
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

const allTags = [
  'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript',
  'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'API'
]

const TagFilter: React.FC<TagFilterProps> = ({ selectedTags, onTagToggle }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map(tag => (
        <motion.button
          key={tag}
          onClick={() => onTagToggle(tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedTags.includes(tag)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tag}
        </motion.button>
      ))}
    </div>
  )
}

export default TagFilter