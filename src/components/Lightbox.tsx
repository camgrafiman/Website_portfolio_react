import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface LightboxProps {
  image: {
    src: string
    title: string
  }
  onClose: () => void
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
      >
        <img src={image.src} alt={image.title} className="w-full h-auto" />
        <div className="absolute top-0 right-0 m-4">
          <button
            onClick={onClose}
            className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h3 className="text-xl font-semibold">{image.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Lightbox