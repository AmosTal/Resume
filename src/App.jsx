import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, Suspense } from 'react';
import Background3D from './components/Background3D';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [activeTab, setActiveTab] = useState('experience');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-text overflow-hidden">
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <ParticleBackground />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      <div className="relative max-w-4xl mx-auto py-16 px-4 z-10">
        {/* Header Section */}
        <motion.header 
          className="text-center mb-16 glass-card p-8 backdrop-blur-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              backgroundSize: '200% auto',
            }}
          >
            Amos Tal
          </motion.h1>
          <div className="text-secondary space-y-2">
            <motion.p 
              className="hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              0503883016
            </motion.p>
            <motion.p 
              className="hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Amostal10@gmail.com
            </motion.p>
            <motion.p 
              className="hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Ramat Gan, Israel
            </motion.p>
          </div>
        </motion.header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12 space-x-4">
          {['experience', 'skills', 'education', 'military'].map((tab) => (
            <motion.button
              key={tab}
              className={`px-6 py-3 rounded-xl backdrop-blur-sm ${
                activeTab === tab 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'glass-effect text-text hover:bg-surface-light'
              }`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Content Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeTab === 'experience' && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-8">Experience</h2>
                  <div className="space-y-6">
                  {[
                    {
                      title: "Production Manager",
                      company: "Unity, Ironsource",
                      period: "10/2023 - 06/2024",
                      duties: [
                        "Facilitated team communication and collaboration",
                        "Collaborated with product owners, stakeholders, and users to ensure requirements were met while resolving conflicts and removing blockers",
                        "Delivered successful product demos to executives",
                        "Conducted post product launch evaluation to identify successful software features and find ways to improve them"
                      ]
                    },
                    {
                      title: "Performance Manager",
                      company: "Unity, Ironsource",
                      period: "03/2022 - 10/2023",
                      duties: [
                        "Driving the planning, execution, and delivery of key product development initiatives, aligning with strategic business goals and revenue growth",
                        "Effectively communicated with internal and external stakeholders, providing regular updates on project progress and addressing any emerging issues or concerns"
                      ]
                    },
                    {
                      title: "Software Developer",
                      company: "Israel Aerospace Industries - MLM",
                      period: "01/2020 - 03/2022",
                      duties: [
                        "Collaborated with R&D teams and system engineers to develop and implement software features across various projects",
                        "Designed and delivered custom APIs and integration solutions, demonstrating strong capabilities in managing third-party vendors and aligning project requirements"
                      ]
                    }
                  ].map((job, index) => (
                    <motion.div 
                      key={index}
                      className="glass-card p-6 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
                          {job.company && (
                            <p className="text-lg text-accent">{job.company}</p>
                          )}
                        </div>
                        <p className="text-lg text-secondary">{job.period}</p>
                      </div>
                      <ul className="list-disc list-inside space-y-2 text-lg text-text/80">
                        {job.duties.map((duty, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                          >
                            {duty}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-8">Skills</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      'Project management',
                      'Risk management',
                      'Market and user research',
                      'Product fit',
                      'Jira, Salesforce',
                      'C#, Python, Java, SQL',
                      'OOP, Design Patterns, Data Structures'
                    ].map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="glass-card p-4 cursor-pointer backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(99, 102, 241, 0.2)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-8">Education</h2>
                  <div className="space-y-6">
                    {[
                      {
                        degree: "B.Sc. Computer Science",
                        school: "The Academic College of Tel Aviv Yafo",
                        period: "2017 - 2020"
                      },
                      {
                        degree: "Full Academic Matriculation Certificate",
                        school: "Mosinzon, HodHasharon",
                        details: "Physics, Chemistry and Math",
                        period: "2009 - 2012"
                      }
                    ].map((edu, index) => (
                      <motion.div
                        key={index}
                        className="glass-card p-6 backdrop-blur-sm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <h3 className="text-xl font-semibold text-primary">{edu.degree}</h3>
                        <p className="text-accent">{edu.school}</p>
                        {edu.details && (
                          <p className="text-secondary">{edu.details}</p>
                        )}
                        <p className="text-secondary">{edu.period}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'military' && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-8">Military Service</h2>
                  <motion.div
                    className="glass-card p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-semibold text-primary">Battalion Medic in the Armored Corps</h3>
                    <p className="text-text/80 mt-2">Medical Unit Commander of 8 soldiers and Emergency Event Manager</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
