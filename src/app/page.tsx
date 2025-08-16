"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

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
    title: 'Work Experience',
    content: [
      'Oct’14 to till date (DIMTS Delhi Integrated Multi-Modal Transit System (Joint Venture of Delhi Government))',
      'Designation: Manager-Operation Road Transport',
      'Staffing: 1500+',
      'Vehicle Managed: 1150+',
      'Core Manpower: 200',
      'Driver & Conductor Strength: 4200',
      'Industry: Public Transportation/ People Logistics & Supply Chain',
      'Job Profile: Ensuring timely In-shedding/Out-shedding of buses, Mileage adherence, Minimizing Breakdown, Asset Management, Handling public grievances, Government Statutory compliance, Meeting with Government Officials, Ensure Inventory of spare parts, Internal & External ISO & Government Audits, Training of Depot Staff & Drivers, Ensuring Staff engagement programs, Maintaining & ensuring present ability of buses, Ensuring Monthly payment of Bills, Strict control on Depot Budget, Ensure Cleanliness, Maintenance, and Safety & Security of the administrative/operational area, Ensure Parking management, Proper checking of depot canteen, Implement and manage the billing module, Finalizing the Daily fleet summary, Issuing show cause notices, Preparation of reconciliation for arbitration cases, Maintenance of Database operations, Preparing Vehicle Out-shedding details, Tracking idle vehicle reports, Incident/accident management and reporting, Preparing operational data of Schedule, Actual & Missed KM, Preparing Schedule and actual Out-shedding Projection, Preparing bus-wise Infraction and curtailment data, Reconciliation of daily missed trips, Preparing Route & Day-wise performance, Real-time route monitoring, Real-time escalation to the bus operator and conductor agency, Training of fresh candidates for operations and MIS reports.',
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

export default function App() {
  // State to track the currently selected tab: 'portfolio' or 'resume'
  const [selectedTab, setSelectedTab] = useState<'portfolio' | 'resume'>('portfolio');

  // State to track the currently selected project (only for the portfolio tab)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Handle the click event when a user selects a project
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setSelectedTab('portfolio');
  };

  // Handle the close button to exit the live preview
  const handleClosePreview = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar for navigation */}
      <aside className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-8 bg-gray-800 border-r border-gray-700 overflow-y-auto">
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
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700 ${
                  selectedProject?.id === project.id ? 'bg-indigo-600 shadow-lg' : 'bg-gray-700'
                }`}
                onClick={() => handleProjectSelect(project)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h2 className="text-xl font-semibold mb-1">{project.title}</h2>
                <p className={`text-sm ${selectedProject?.id === project.id ? 'text-indigo-200' : 'text-gray-400'}`}>
                  {project.description}
                </p>
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

            {resumeContent.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4 border-b-2 border-indigo-400 pb-2">
                  {section.title}
                </h2>
                <ul className="list-none space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
