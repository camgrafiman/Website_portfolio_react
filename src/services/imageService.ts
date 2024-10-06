import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const uploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const updateImage = async (image: { id: number; title: string; category: string }) => {
  try {
    const response = await axios.put(`${API_URL}/images/${image.id}`, image)
    return response.data
  } catch (error) {
    console.error('Error updating image:', error)
    throw error
  }
}

export const deleteImage = async (imageId: number) => {
  try {
    await axios.delete(`${API_URL}/images/${imageId}`)
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}