"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the shape of a project object
interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
}

// Define the shape of a resume section
interface ResumeSection {
  title: string;
  content: string[];
}

// Define the shape of a job profile tab
interface JobProfileTab {
  id: number;
  title: string;
  content: string;
}

// Mock data for the portfolio projects
const projects: Project[] = [
  {
    id: 1,
    title: 'Open_Law_Forum',
    description: 'A modern learning platform for legal students, authors and gain insights with AI generative response and analyzing legal doccuments in real time with AI',
    url: 'https://open-law-forum.netlify.app/DocAnalyzer' // Use a real URL for your project
  },
  {
    id: 2,
    title: 'Supply-Chain-Web-Design',
    description: 'A simple, minimalist website for supply-chain and logistics of automotive parts and base oil',
    url: 'https://synergy-solutions-ltd.netlify.app/pages/supply-chain' // Use a real URL for your project
  },
  {
    id: 3,
    title: 'School-Management-Web-Design',
    description: 'An interactive web application that provides interface to manage school activities, strength, teachers, economics etc..',
    url: 'https://test-manage-assist.netlify.app/dashboard/admin' // Use a real URL for your project
  },
  {
    id: 4,
    title: 'Sigma-Sale and E-Commerce platform',
    description: 'A sleek modern E-Commerce platform with light & dark Mode',
    url: 'https://sigma-sale.vercel.app/' // Use a real URL for your project
  },
];

// Resume data parsed from the document
const resumeContent: ResumeSection[] = [
  {
    title: 'Skills',
    content: [
      'Operations', 'Public Transport Management', 'Fleet Management', 'Transport Automation', 'Geographic Understanding', 'Vendor Management', 'Admin & Facility Management', 'Housekeeping & Security Management', 'EHS & Compliance', 'Escalation Management', 'People Management', 'Billing & MIS'
    ],
  },
  {
    title: 'Academic',
    content: [
      'Pursuing MBA in Operations & Logistics',
      'BA - English & Sociology',
    ],
  },
];

// Job profile data broken down into tabs
const jobProfileTabs: JobProfileTab[] = [
  {
    id: 1,
    title: 'Fleet Management',
    content: 'Ensuring timely In-shedding/Out-shedding of buses, Mileage adherence, Minimizing Breakdown, and Asset Management.'
  },
  {
    id: 2,
    title: 'Public & Government Relations',
    content: 'Handling public grievances, ensuring Government Statutory compliance, and meeting with Government Officials.'
  },
  {
    id: 3,
    title: 'Audits & Training',
    content: 'Ensuring Inventory of spare parts, conducting Internal & External ISO & Government Audits, and providing Training to Depot Staff & Drivers.'
  },
  {
    id: 4,
    title: 'Staff & Budget Management',
    content: 'Ensuring Staff engagement programs, Maintaining & ensuring present ability of buses, Ensuring Monthly payment of Bills, and Strict control on Depot Budget.'
  },
  {
    id: 5,
    title: 'Depot & Safety Management',
    content: 'Ensuring Cleanliness, Maintenance, and Safety & Security of the administrative/operational area. Ensuring Parking management and Proper checking of depot canteen.'
  },
  {
    id: 6,
    title: 'MIS & Reporting',
    content: 'Implementing and managing the billing module, Finalizing the Daily fleet summary, Issuing show cause notices, and Preparation of reconciliation for arbitration cases.'
  },
  {
    id: 7,
    title: 'Real-time Operations',
    content: 'Maintaining Database operations, Preparing Vehicle Out-shedding details, Tracking idle vehicle reports, Incident/accident management and reporting, Real-time route monitoring, and Real-time escalation to the bus operator and conductor agency.'
  },
];

export default function App() {
  // State to track the currently selected tab: 'portfolio' or 'resume'
  const [selectedTab, setSelectedTab] = useState<'portfolio' | 'resume'>('portfolio');

  // State to track the currently selected project (only for the portfolio tab)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // State to track the currently selected job profile tab
  const [selectedJobProfileTab, setSelectedJobProfileTab] = useState<JobProfileTab | null>(jobProfileTabs[0]);

  // State to track which project descriptions are expanded
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  // Toggle the expansion of a project description
  const toggleProjectExpansion = (id: number) => {
    setExpandedProjects(prev =>
      prev.includes(id) ? prev.filter(projectId => projectId !== id) : [...prev, id]
    );
  };

  // Handle the click event when a user selects a project for preview
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setSelectedTab('portfolio');
  };

  // Handle the close button to exit the live preview
  const handleClosePreview = () => {
    setSelectedProject(null);
  };

  // Framer Motion variants for resume sections and list items
  const resumeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Framer Motion variants for collapsible description
  const descriptionVariants = {
    collapsed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
    expanded: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Sidebar for navigation */}
      <aside 
        className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-8 bg-gray-800 border-r border-gray-700 overflow-y-auto"
        // Style to hide scrollbar
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Style tag to import the Inter font */}
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          /* For WebKit browsers (Chrome, Safari) */
          aside::-webkit-scrollbar {
            display: none;
          }
        `}} />
        
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img 
            src="/Profile_img2.jpg"
            alt="Sandeep Kumar"
            className="rounded-full h-32 w-32 object-cover border-4 border-indigo-400 shadow-xl"
          />
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-indigo-400">Sandeep Kumar</h1>
        <p className="text-sm mb-8 text-gray-400">
          An Administrative Professional with 11+ years of experience in Public Transport and Public Logistics.
        </p>
        
        {/* Navigation Tabs */}
        <div className="flex mb-4 space-x-2">
          <button
            onClick={() => { setSelectedTab('portfolio'); setSelectedProject(null); }}
            className={`flex-1 p-3 rounded-xl transition-all duration-300 ease-in-out font-semibold ${
              selectedTab === 'portfolio' ? 'bg-indigo-600 shadow-lg text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => { setSelectedTab('resume'); setSelectedProject(null); }}
            className={`flex-1 p-3 rounded-xl transition-all duration-300 ease-in-out font-semibold ${
              selectedTab === 'resume' ? 'bg-indigo-600 shadow-lg text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Resume
          </button>
        </div>

        {/* Conditional rendering of sidebar content based on selected tab */}
        {selectedTab === 'portfolio' && (
          <motion.ul 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project) => (
              <motion.li
                key={project.id}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  selectedProject?.id === project.id ? 'bg-indigo-600 shadow-lg' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => handleProjectSelect(project)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Collapsible Project Heading */}
                <div 
                  onClick={(e) => { e.stopPropagation(); toggleProjectExpansion(project.id); }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h2 className={`text-xl font-semibold mb-1 ${selectedProject?.id === project.id ? 'text-white' : 'text-gray-200'}`}>{project.title}</h2>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform duration-300 ${expandedProjects.includes(project.id) ? 'transform rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </div>

                {/* Collapsible Description */}
                <AnimatePresence>
                  {expandedProjects.includes(project.id) && (
                    <motion.div
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={descriptionVariants}
                      className="overflow-hidden"
                    >
                      <p className={`text-sm pt-2 ${selectedProject?.id === project.id ? 'text-indigo-200' : 'text-gray-400'}`}>
                        {project.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>
        )}
        
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden relative">
        {selectedTab === 'portfolio' && (
          <motion.div
            key="portfolio-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            {selectedProject ? (
              <>
                {/* Display the live website in an iframe */}
                <iframe
                  src={selectedProject.url}
                  title={selectedProject.title}
                  className="w-full h-full rounded-2xl shadow-2xl border-4 border-gray-700 bg-white"
                />
                {/* Close button for the preview */}
                <button
                  onClick={handleClosePreview}
                  className="absolute top-6 right-6 p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white shadow-xl focus:outline-none"
                  aria-label="Close Project Preview"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              /* Placeholder message when no project is selected */
              <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9.75 19.5L12 19.5V17H9.75Z M12.75 17L12.75 19.5L15 19.5V17H12.75Z M17.25 4.5L17.25 15.75L4.5 15.75V4.5L17.25 4.5Z M17.25 4.5L19.5 4.5V18C19.5 19.2426 18.2426 20.25 17 20.25H4.5C3.25736 20.25 2.25 19.2426 2.25 18V4.5C2.25 3.25736 3.25736 2.25 4.5 2.25H17C18.2426 2.25 19.25 3.25736 19.25 4.5V4.5H17.25Z M4.5 18L17.25 18L17.25 18H4.5Z M4.5 18L4.5 4.5L4.5 18Z M17.25 4.5L4.5 4.5L17.25 4.5Z" />
                </svg>
                <h2 className="text-3xl font-bold mb-2">Select a Project to Preview</h2>
                <p className="text-md text-gray-400">
                  Your live websites will appear here.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {selectedTab === 'resume' && (
          <motion.div
            key="resume-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full p-8 bg-gray-800 rounded-2xl shadow-xl overflow-y-auto"
          >
            <h1 className="text-4xl font-bold mb-8 text-indigo-400">Sandeep Kumar</h1>
            <p className="text-lg text-gray-400 mb-6">
              An Administrative Professional specialized in Administration & Transport management for Public Transport- Under State Government Since 2014. Proficient in handling multiple tasks and projects simultaneously in challenging environments.
            </p>

            {/* General Resume Content */}
            {resumeContent.map((section, index) => (
              <motion.div 
                key={index} 
                className="mb-8 p-6 rounded-lg bg-gray-700 shadow-xl"
                initial="hidden"
                animate="visible"
                variants={resumeVariants}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-white mb-4 border-b-2 border-indigo-400 pb-2">
                  {section.title}
                </h2>
                <ul className="list-none space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex} 
                      className="text-gray-300 flex items-start"
                      variants={itemVariants}
                      transition={{ delay: (index * 0.1) + (itemIndex * 0.05) + 0.5, duration: 0.3 }}
                    >
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Job Profile as Interactive Tabs */}
            <motion.div 
              className="mb-8 p-6 rounded-lg bg-gray-700 shadow-xl"
              initial="hidden"
              animate="visible"
              variants={resumeVariants}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-4 border-b-2 border-indigo-400 pb-2">
                Work Experience
              </h2>
              {/* Job Profile Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {jobProfileTabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setSelectedJobProfileTab(tab)}
                    className={`p-3 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                      selectedJobProfileTab?.id === tab.id ? 'bg-indigo-500 text-white shadow-md' : 'bg-gray-800 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.title}
                  </motion.button>
                ))}
              </div>
              {/* Job Profile Content */}
              {selectedJobProfileTab && (
                <motion.div
                  key={selectedJobProfileTab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-gray-800 text-gray-200"
                >
                  <p>{selectedJobProfileTab.content}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
