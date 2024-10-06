import React, { useState } from 'react'

interface Image {
  id: number
  src: string
  category: string
  title: string
}

interface ImageEditProps {
  image: Image
  onSave: (updatedImage: Image) => void
  onCancel: () => void
}

const ImageEdit: React.FC<ImageEditProps> = ({ image, onSave, onCancel }) => {
  const [title, setTitle] = useState(image.title)
  const [category, setCategory] = useState(image.category)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...image, title, category })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Image</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-1">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ImageEdit