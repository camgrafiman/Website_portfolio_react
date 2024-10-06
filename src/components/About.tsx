import React from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Server, Database, Globe, Wrench } from 'lucide-react'

const technologies = [
  { name: 'React', icon: <Code className="w-6 h-6" /> },
  { name: 'Node.js', icon: <Server className="w-6 h-6" /> },
  { name: 'MongoDB', icon: <Database className="w-6 h-6" /> },
  { name: 'TypeScript', icon: <Code className="w-6 h-6" /> },
  { name: 'Tailwind CSS', icon: <Palette className="w-6 h-6" /> },
  { name: 'GraphQL', icon: <Globe className="w-6 h-6" /> },
  { name: 'Docker', icon: <Wrench className="w-6 h-6" /> },
  { name: 'Git', icon: <Code className="w-6 h-6" /> },
]

const About: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mt-8"
    >
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          alt="John Doe"
          className="w-48 h-48 rounded-full object-cover mb-6 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <p className="text-lg mb-4">
            Hi, I'm John Doe, a passionate full-stack developer and UI/UX enthusiast with over 5 years of experience in creating beautiful, functional, and user-centered digital experiences.
          </p>
          <p className="text-lg mb-4">
            My journey in web development started with a curiosity for creating interactive websites, which quickly grew into a love for solving complex problems and building robust applications.
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">My Expertise</h3>
            <ul className="list-disc list-inside">
              <li>Full-stack Web Development</li>
              <li>Responsive and Mobile-first Design</li>
              <li>RESTful API Development</li>
              <li>Database Design and Optimization</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Technologies I Work With</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md"
                >
                  {tech.icon}
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About