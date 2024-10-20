import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'
import { profile } from '../assets'

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[150px] w-full">
      <motion.div
      variants={fadeIn("right","spring",0.5*index,0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
        <div 
        options={{
          max:45,
          scale:1,
          speed:450
        }} className='bg-tertiary rounded-[20px] py-5 px-5 min-h-[130px] flex justify-evenly items-center flex-col'>
          {/* <img src={icon} alt={title} className='wi16 h-16 object-contain'/> */}
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <h2 className={`${styles.sectionHeadText} text-center mt-[-350px] sm:mt-[-50px]`}>
        About Me
      </h2>
    </motion.div>

    <div class="sm:flex items-center justify-center"> 

    <div class="sm:w-1/3 mt-5 sm:mt-0 mb-5 sm:mb-0 flex justify-center items-center">  
      <img src={profile} alt="Your Photo" class="rounded-full w-70 h-70 object-cover shadow-inner border-blue-900 border-4 glow" />
    </div>

    <div class="w-full md:w-2/3 sm:ml-10 flex flex-col items-start">
    <motion.p variants={fadeIn("","",0.1,0.1)}
    className='mt-2 text-secondary text-[17px] leading-[30px] text-center'>
      I am Chaitya Shah, a 4th Year Computer Engineering Undergraduate from 
      Dwarkadas J. Sanghvi College of Engineering, Mumbai. Currently, I am leveraging my skills
      as a Research Engineer at SimPPL.
    </motion.p>

    <motion.p variants={fadeIn("","",0.1,0.1)}
    className='mt-2 text-secondary text-[17px] leading-[30px] text-center'>
      My early decision to pursue data science has allowed me to explore diverse fields; from healthcare to social sciences, energy, and robotics. 
      As the Coding Head of DJS Antariksh, our college’s Martian Rover team, I’ve proudly represented India in international competitions, 
      securing multiple podium finishes. I also serve as a Machine Learning Head at Synapse, our AI/ML committee, where I mentor juniors and 
      help them with research publications. My primary interests lie in understanding human behavior through data, exploring causal relationships,
       and applying machine learning to solve real-world problems.
    </motion.p>
    </div>
    </div>

    <motion.p variants={fadeIn("","",0.1,0.1)}
    className='mt-4 text-secondary text-[17px] leading-[30px] text-center'>
      <span className='font-bold'>Languages and Tools:</span> C, C++, Python, JavaScript, R, MATLAB, Git, Figma, Robot Operating Systems, Arduino,
       LaTeX.
    </motion.p>

    <motion.p variants={fadeIn("","",0.1,0.1)}
    className='mt-2 text-secondary text-[17px] leading-[30px] text-center'>
      <span className='font-bold'>DLibraries & Frameworks:</span> Numpy, Pandas, Seaborn, Matplotlib, Scikit-Learn, Keras, TensorFlow, 
      PyTorch, OpenCV, BeautifulSoup, NLTK, SQLAlchemy, Prometheus, HTML, CSS, React.js, Three.js, Next.js, Django Rest Framework, Flask, 
      FastAPI, Streamlit.
    </motion.p>

    <motion.p variants={fadeIn("","",0.1,0.1)}
    className='mt-2 text-secondary text-[17px] leading-[30px] text-center'>
      <span className='font-bold'>Databases, Analytics & Cloud:</span> MySQL, PostgreSQL, Looker Studio, Google Analytics, PowerBi, BigQuery, GCP, AWS, Docker,
       Linux.
    </motion.p>

    {/* <div className='mt-10 flex flex-wrap gap-10 justify-center align-center'>
      {services.map((service,index) => (
        <ServiceCard key={service.title} index={index} {...service}/>
      ))}
    </div> */}
    </>
  )
}

export default SectionWrapper(About, 'about')