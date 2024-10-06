import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    name: "Personal Portfolio",
    description: "A responsive portfolio website built with React and Tailwind CSS.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/johndoe/portfolio",
    liveUrl: "https://johndoe-portfolio.netlify.app"
  },
  {
    id: 2,
    name: "Task Manager API",
    description: "RESTful API for a task management application built with Node.js and Express.",
    technologies: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/johndoe/task-manager-api"
  },
  {
    id: 3,
    name: "Weather App",
    description: "A weather application that fetches data from an external API and displays it in a user-friendly interface.",
    technologies: ["JavaScript", "HTML", "CSS", "API"],
    githubUrl: "https://github.com/johndoe/weather-app",
    liveUrl: "https://johndoe-weather-app.netlify.app"
  },
  {
    id: 4,
    name: "E-commerce Platform",
    description: "A full-stack e-commerce platform with user authentication and payment integration.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    liveUrl: "https://johndoe-ecommerce.herokuapp.com"
  },
  {
    id: 5,
    name: "Chat Application",
    description: "Real-time chat application using WebSockets and React.",
    technologies: ["React", "Node.js", "Socket.io", "Express"],
    githubUrl: "https://github.com/johndoe/chat-app"
  }
]

interface ProjectGalleryProps {
  searchTerm: string
  selectedTags: string[]
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ searchTerm, selectedTags }) => {
  const filteredProjects = projects.filter((project) =>
    (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedTags.length === 0 || selectedTags.some(tag => project.technologies.includes(tag)))
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex space-x-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Github size={20} className="mr-1" />
                GitHub
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink size={20} className="mr-1" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ProjectGallery