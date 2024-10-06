import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import Lightbox from './Lightbox'
import AdminLogin from './AdminLogin'
import ImageEdit from './ImageEdit'
import { uploadImage, updateImage, deleteImage } from '../services/imageService'

interface Image {
  id: number
  src: string
  category: string
  title: string
}

interface ImageGalleryProps {
  searchTerm: string
  selectedCategory: string
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ searchTerm, selectedCategory }) => {
  const [images, setImages] = useState<Image[]>([
    {
      id: 1,
      src: "/images/web-development-workspace.jpg",
      category: "web",
      title: "Web Development Workspace"
    },
    {
      id: 2,
      src: "/images/creative-design-process.jpg",
      category: "graphic",
      title: "Creative Design Process"
    },
    {
      id: 3,
      src: "/images/mobile-app-interface-design.jpg",
      category: "ui",
      title: "Mobile App Interface Design"
    },
    {
      id: 4,
      src: "/images/ecommerce-website.jpg",
      category: "web",
      title: "E-commerce Website"
    },
    {
      id: 5,
      src: "/images/brand-identity-design.jpg",
      category: "graphic",
      title: "Brand Identity Design"
    }
  ])
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editingImage, setEditingImage] = useState<Image | null>(null)
  const [newImageTitle, setNewImageTitle] = useState('')
  const [newImageCategory, setNewImageCategory] = useState('')

  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [images, searchTerm, selectedCategory])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('title', newImageTitle)
      formData.append('category', newImageCategory)

      uploadImage(formData).then((response) => {
        const newImage: Image = {
          id: response.id,
          src: response.src,
          category: response.category,
          title: response.title
        }
        setImages((prevImages) => [...prevImages, newImage])
        setNewImageTitle('')
        setNewImageCategory('')
      }).catch((error) => {
        console.error('Error uploading image:', error)
      })
    })
  }, [newImageTitle, newImageCategory])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleImageEdit = (updatedImage: Image) => {
    setImages((prevImages) =>
      prevImages.map((img) => (img.id === updatedImage.id ? updatedImage : img))
    )
    setEditingImage(null)
  }

  const handleImageDelete = (imageId: number) => {
    deleteImage(imageId).then(() => {
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId))
    }).catch((error) => {
      console.error('Error deleting image:', error)
    })
  }

  return (
    <>
      <AdminLogin setIsAdmin={setIsAdmin} />
      {isAdmin && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Upload New Image</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Image Title"
              value={newImageTitle}
              onChange={(e) => setNewImageTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mr-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Image Category"
              value={newImageCategory}
              onChange={(e) => setNewImageCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mr-2"
            />
          </div>
          <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here ...</p>
            ) : (
              <p>Drag 'n' drop an image here, or click to select one</p>
            )}
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {filteredImages.map((image) => (
          <motion.div
            key={image.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer relative"
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-48 object-cover"
              onClick={() => setSelectedImage(image)}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
              <span className="text-sm text-gray-500 capitalize">{image.category}</span>
            </div>
            {isAdmin && (
              <div className="absolute top-2 right-2 space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditingImage(image)
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleImageDelete(image.id)
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedImage && (
          <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
      {editingImage && (
        <ImageEdit
          image={editingImage}
          onSave={handleImageEdit}
          onCancel={() => setEditingImage(null)}
        />
      )}
    </>
  )
}

export default ImageGallery