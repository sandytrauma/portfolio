"use client"

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

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
    url: 'https://open-law-forum.netlify.app/DocAnalyzer'
  },
  {
    id: 2,
    title: 'Supply-Chain-Web-Design',
    description: 'A simple, minimalist website for supply-chain and logistics of automotive parts and base oil',
    url: 'https://synergy-solutions-ltd.netlify.app/pages/supply-chain'
  },
  {
    id: 3,
    title: 'School-Management-Web-Design',
    description: 'An interactive web application that provides interface to manage school activities, strength, teachers, economics etc..',
    url: 'https://test-manage-assist.netlify.app/dashboard/admin'
  },
  {
    id: 4,
    title: 'Sigma-Sale and E-Commerce platform',
    description: 'A sleek modern E-Commerce platform with light & dark Mode',
    url: 'https://sigma-sale.vercel.app/'
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
  const [selectedTab, setSelectedTab] = useState<'portfolio' | 'resume' | 'contact'>('portfolio');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedJobProfileTab, setSelectedJobProfileTab] = useState<JobProfileTab | null>(jobProfileTabs[0]);
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  // Ref to the form element
  const form = useRef<HTMLFormElement>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const toggleProjectExpansion = (id: number) => {
    setExpandedProjects(prev =>
      prev.includes(id) ? prev.filter(projectId => projectId !== id) : [...prev, id]
    );
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setSelectedTab('portfolio');
  };

  const handleClosePreview = () => {
    setSelectedProject(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are not set correctly.");
      setSubmitStatus('error');
      return;
    }

    emailjs.sendForm(
      serviceId,
      templateId,
      form.current!,
      publicKey
    )
    .then((result: { text: any; }) => {
      console.log('Email sent successfully!', result.text);
      setSubmitStatus('success');
      form.current?.reset();
    })
    .catch((error: { text: any; }) => {
      console.error('Failed to send email:', error.text);
      setSubmitStatus('error');
    });
  };

  // Framer Motion variants
  const resumeVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
  const itemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };
  const descriptionVariants = { collapsed: { height: 0, opacity: 0, transition: { duration: 0.3 } }, expanded: { height: "auto", opacity: 1, transition: { duration: 0.3 } } };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Sidebar for navigation */}
      <aside
        className="w-full h-full lg:[50vh] sm:h-screen md:w-1/3 lg:w-1/4 p-4 md:p-8 bg-gray-800 border-b md:border-b-0 md:border-r border-gray-700 overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          aside::-webkit-scrollbar {
            display: none;
          }
        `}} />

        <div className="flex justify-center mb-6">
          <img
            src="/Profile_img2.jpg"
            alt="Sandeep Kumar"
            className="rounded-full h-32 w-32 object-cover border-4 border-indigo-400 shadow-lg"
          />
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-indigo-400 text-center">Sandeep Kumar</h1>
        <p className="text-sm mb-4 text-gray-400 text-center">
          An Administrative Professional with 11+ years of experience in Public Transport and Public Logistics.
        </p>

        {/* Email Section */}
        <div className="flex items-center justify-center space-x-2 mb-8 text-gray-400">
          <Mail className="h-5 w-5 text-indigo-400" />
          <a
            href="mailto:sksandeep443@gmail.com"
            className="hover:underline transition-colors hover:text-indigo-400"
          >
            sksandeep443@gmail.com
          </a>
        </div>

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
          {/* New Contact Tab */}
          <button
            onClick={() => { setSelectedTab('contact'); setSelectedProject(null); }}
            className={`flex-1 p-3 rounded-xl transition-all duration-300 ease-in-out font-semibold ${
              selectedTab === 'contact' ? 'bg-indigo-600 shadow-lg text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Contact
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
                <div
                  onClick={(e) => { e.stopPropagation(); toggleProjectExpansion(project.id); }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h2 className={`text-xl font-semibold mb-1 ${selectedProject?.id === project.id ? 'text-white' : 'text-gray-200'}`}>{project.title}</h2>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform duration-300 hover:text-indigo-200 ${expandedProjects.includes(project.id) ? 'transform rotate-180' : ''}`}
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
      <main className="flex-1 w-full h-screen lg:h-screen md:w-2/3 lg:w-3/4 flex flex-col p-4 md:p-8 overflow-hidden relative h-full">
        <AnimatePresence mode="wait">
          {selectedTab === 'portfolio' && (
            <motion.div
              key="portfolio-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            >
              {selectedProject ? (
                // Responsive iframe wrapper
                <div className="relative w-full overflow-hidden rounded-2xl shadow-lg border-4 border-gray-700 bg-white" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={selectedProject.url}
                    title={selectedProject.title}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 0 }}
                  />
                  <button
                    onClick={handleClosePreview}
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white shadow-lg focus:outline-none"
                    aria-label="Close Project Preview"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
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
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full p-8 bg-gray-800 rounded-2xl shadow-lg overflow-y-auto"
            >
              <h1 className="text-4xl font-bold mb-8 text-indigo-400">Sandeep Kumar</h1>
              <p className="text-lg text-gray-400 mb-6">
                An Administrative Professional specialized in Administration & Transport management for Public Transport- Under State Government Since 2014. Proficient in handling multiple tasks and projects simultaneously in challenging environments.
              </p>

              {/* General Resume Content */}
              {resumeContent.map((section, index) => (
                <motion.div
                  key={index}
                  className="mb-8 p-6 rounded-xl bg-gray-700 shadow-lg"
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
                className="mb-8 p-6 rounded-xl bg-gray-700 shadow-lg"
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
                      className={`p-3 rounded-xl font-medium transition-all duration-300 ease-in-out text-sm ${
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

          {/* New Contact Form Section */}
          {selectedTab === 'contact' && (
            <motion.div
              key="contact-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full p-8 bg-gray-800 rounded-2xl shadow-lg flex flex-col"
            >
              <h2 className="text-3xl font-bold mb-6 text-indigo-400">
                Get in Touch
              </h2>
              <p className="text-gray-400 mb-6">
                I'd love to hear from you. Fill out the form below to send me a message.
              </p>

              {/* Conditional render based on submit status */}
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center h-full text-center text-green-400"
                  >
                    <CheckCircle className="h-24 w-24 mb-4" />
                    <h3 className="text-2xl font-semibold">Message Sent!</h3>
                    <p className="text-md text-gray-400 mt-2">I will get back to you as soon as possible.</p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center h-full text-center text-red-400"
                  >
                    <XCircle className="h-24 w-24 mb-4" />
                    <h3 className="text-2xl font-semibold">Message Failed!</h3>
                    <p className="text-md text-gray-400 mt-2">Please try again later or contact me directly via email.</p>
                  </motion.div>
                )}
                {submitStatus !== 'success' && submitStatus !== 'error' && (
                  <motion.form
                    key="form"
                    ref={form}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label htmlFor="user_name" className="block text-gray-300 font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="user_email" className="block text-gray-300 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="user_email"
                        name="user_email"
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitStatus === 'sending'}
                      className={`w-full p-3 rounded-xl font-semibold transition-colors duration-300 ${
                        submitStatus === 'sending'
                          ? 'bg-indigo-700 text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
                      }`}
                    >
                      {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}