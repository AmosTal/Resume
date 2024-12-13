import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, Suspense, useCallback } from 'react';
import Background3D from './components/Background3D';
import ParticleBackground from './components/ParticleBackground';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FaBriefcase, FaGraduationCap, FaMedal, FaTools } from 'react-icons/fa';

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

  const JobCard = ({ job, index }) => {
    const particlesInit = useCallback(async engine => {
      await loadFull(engine);
    }, []);

    const particlesOptions = {
      particles: {
        number: { value: 15, density: { enable: true, value_area: 800 } },
        color: { value: "#6366f1" },
        opacity: { value: 0.1 },
        size: { value: 3 },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          out_mode: "out"
        }
      }
    };

    return (
      <motion.div 
        className="glass-card p-6 backdrop-blur-sm"
        style={{ width: 'fit-content' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <motion.div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <FaBriefcase className="text-primary text-2xl" />
              </motion.div>
              <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
            </motion.div>
            {job.company && (
              <p className="text-lg text-accent">{job.company}</p>
            )}
          </div>
          <p className="text-lg text-secondary ml-8">{job.period}</p>
        </div>

        {/* Skills Tag Cloud */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.4 }}
        >
          {job.skills?.map((skill, i) => (
            <motion.span
              key={i}
              className="px-2 py-1 rounded-full text-sm bg-primary/10 text-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 0.2)" }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

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
    );
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
        <div className="flex justify-center space-x-6 mb-12">
          {['experience', 'skills', 'education'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'text-primary hover:bg-primary/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
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
                      skills: [
                        "Project Management",
                        "Team Leadership",
                        "Product Strategy",
                        "Agile",
                        "Stakeholder Management",
                        "Product Development"
                      ],
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
                      skills: [
                        "Performance Optimization",
                        "Data Analysis",
                        "Strategic Planning",
                        "Risk Management",
                        "Process Improvement"
                      ],
                      duties: [
                        "Driving the planning, execution, and delivery of key product development initiatives, aligning with strategic business goals and revenue growth",
                        "Effectively communicated with internal and external stakeholders, providing regular updates on project progress and addressing any emerging issues or concerns"
                      ]
                    },
                    {
                      title: "Software Developer",
                      company: "Israel Aerospace Industries - MLM",
                      period: "01/2020 - 03/2022",
                      skills: [
                        "Software Development",
                        "API Design",
                        "System Integration",
                        "Technical Leadership",
                        "Problem Solving"
                      ],
                      duties: [
                        "Collaborated with R&D teams and system engineers to develop and implement software features across various projects",
                        "Designed and delivered custom APIs and integration solutions, demonstrating strong capabilities in managing third-party vendors and aligning project requirements"
                      ]
                    }
                  ].map((job, index) => (
                    <JobCard key={index} job={job} index={index} />
                  ))}
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-8">Skills</h2>
                  <motion.div
                    className="glass-card p-6 backdrop-blur-sm"
                    style={{ width: 'fit-content' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-2 mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <FaTools className="text-primary text-2xl" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-primary">Professional Skills</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-accent mb-3">Management</h4>
                        <ul className="list-disc list-inside space-y-2 text-lg text-text/80">
                          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Project Management</motion.li>
                          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Risk Management</motion.li>
                          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Team Leadership</motion.li>
                          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Stakeholder Management</motion.li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-accent mb-3">Technical</h4>
                        <ul className="list-disc list-inside space-y-2 text-lg text-text/80">
                          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>C#, Python, Java, SQL</motion.li>
                          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>OOP & Design Patterns</motion.li>
                          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Data Structures</motion.li>
                          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>System Architecture</motion.li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'education' && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-8">Education & Military Service</h2>
                  <div className="space-y-6">
                    {[
                      {
                        type: "education",
                        degree: "B.Sc. Computer Science",
                        school: "The Academic College of Tel Aviv Yafo",
                        period: "2017 - 2020",
                        achievements: [
                          "Excellence in Software Engineering",
                          "Advanced Algorithms & Data Structures",
                          "Computer Networks & Security"
                        ]
                      },
                      {
                        type: "military",
                        degree: "Battalion Medic in the Armored Corps",
                        details: "Medical Unit Commander of 8 soldiers and Emergency Event Manager",
                        period: "2012 - 2015"
                      },
                      {
                        type: "education",
                        degree: "Full Academic Matriculation Certificate",
                        school: "Mosinzon, HodHasharon",
                        details: "Physics, Chemistry and Math",
                        period: "2009 - 2012",
                        achievements: [
                          "Advanced Mathematics",
                          "Physics & Chemistry Focus",
                          "Academic Excellence"
                        ]
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="glass-card p-6 backdrop-blur-sm"
                        style={{ width: 'fit-content' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <motion.div className="flex items-center gap-2">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2 + 0.3 }}
                              >
                                {item.type === 'education' ? 
                                  <FaGraduationCap className="text-primary text-2xl" /> :
                                  <FaMedal className="text-primary text-2xl" />
                                }
                              </motion.div>
                              <h3 className="text-xl font-semibold text-primary">{item.degree}</h3>
                            </motion.div>
                            {item.school && (
                              <p className="text-lg text-accent">{item.school}</p>
                            )}
                            {item.details && (
                              <p className="text-lg text-secondary">{item.details}</p>
                            )}
                          </div>
                          <p className="text-lg text-secondary ml-8">{item.period}</p>
                        </div>
                        {item.achievements && (
                          <ul className="list-disc list-inside space-y-2 text-lg text-text/80">
                            {item.achievements.map((achievement, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + i * 0.05 }}
                              >
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ))}
                  </div>
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
