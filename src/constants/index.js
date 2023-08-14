import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    infiheal,
    unicode,
    iitp,
    synapse,
    antariksh,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
    nlp,
    ros,
    django,
    python,
    ml,
    xtract,
    unscript23,
    healo,
    yummatch,
    shortathon,
    verifyu,
    workconnect,
    tubeboost,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Data Science / Machine Learning",
      icon: mobile,
    },
    {
      title: "Artificial Intelligence & NLP",
      icon: backend,
    },
    {
      title: "Full Stack Web Development",
      icon: web,
    },
    {
      title: "Robot Operating Systems",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "ML",
      icon: ml,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Django",
      icon: django,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "nlp",
      icon: nlp,
    },
    {
      name: "python",
      icon: python,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "ros",
      icon: ros,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "Research Intern",
      company_name: "IIT Patna",
      icon: iitp,
      iconBg: "#383E56",
      date: "May 2020 - Present",
      points: [
        "Writing a Research Paper on Fraud Detection in Ethereum transactions using Graph Neural Networks.",
        "Working with Graph Convolution Networks, Temporal Directed Graphs, Data Analysis, Feature Engineering and more.",
      ],
    },
    {
      title: "Coding Team Member",
      company_name: "DJS Antariksh",
      icon: antariksh,
      iconBg: "#383E56",
      date: "May 2022 - Present",
      points: [
        "Worked on Rover Integration using Arduino & ROS on Ubuntu (Linux), worked with Gazebo, Rviz, built & connected React GUI Pages. Currently working on Autonomous Functioning of the Rover with AI, ROS and OpenCV.",
        "3rd Position in International Rover Design Challenge (IRDC) 2022, 8th in International Rover Challenge (IRC) 2023 and Qualified for European Rover Challenge (ERC) (Onsite and Remote) 2023.",

      ],
    },
    {
      title: "Machine Learning Head",
      company_name: "Synapse",
      icon: synapse,
      iconBg: "#E6DEDD",
      date: "Sep 2022 - Present",
      points: [
        "Will be designing and conducting training sessions on ML concepts, CV techniques, and NLP algorithms for mentees and assisting them with personalized guidance and mentoring for their Research Papers.",
        "Created various mini-projects, organized events, took seminars and also helped contacting sponsors.",
        "Wrote a Research Paper on Sentence Restructuring with User-Controlled Difficulty using NLP.",
      ],
    },
    {
      title: "Artificial Intelligence Intern",
      company_name: "Infiheal",
      icon: infiheal,
      iconBg: "#E6DEDD",
      date: "Jun 2023 - Present",
      points: [
        "Created models for a Mental Health Chatbot using Microsoft Azure, Large Language Models (LLM’s), LangChains, Haystack, Prompt Engineering, HuggingFace Transformer models, Web scraped data & tested them with FastAPI",
        "Deployed models on Amazon Web Services (AWS) via Linux using services like Docker, Github, ECR and ECS.",
      ],
    },
    {
      title: "Full Stack Developer (Django)",
      company_name: "DJ Unicode",
      icon: unicode,
      iconBg: "#E6DEDD",
      date: "Oct 2022 - Aug 2023",
      points: [
        "Made various mini-projects & currently working on an Internship Portal as a final Group Project.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial: "An Inter-College Datathon where we applied significant Machine Learning Algorithms to Data Science datasets while competing with 200 shortlisted students to win the Event.",
      name: "Winner of X-tract 2022",
      image: xtract,
    },
    {
      testimonial: "Ranked in Top 6 in a National Level Hackathon (Project: WorkConnect) where we created a novel approach on seamless communication between clients and workers.",
      name: "Top 6 at Unscript Rookies Hackathon 2k23",
      image: unscript23,
    },
  ];
  
  const projects = [
    {
      name: "Healo",
      description:
        "Created a Mental Health Chatbot using Neural Networks in Deep Learning and NLP. Transformers using BERT were used to provide sentiment analysis to predict the mental health risk level of the user.",
      tags: [
        {
          name: "nlp",
          color: "blue-text-gradient",
        },
        {
          name: "machinelearning",
          color: "green-text-gradient",
        },
        {
          name: "transformers",
          color: "pink-text-gradient",
        },
      ],
      image: healo,
      source_code_link: "https://github.com/Chaitya0623/Healo",
    },
    {
      name: "YumMatch",
      description:
        "Formulated a Food Recommendation System which recommends food combos with the help of Association Rule using Apriori Algorithm. It also shows the most popular combos based on value counts.",
      tags: [
        {
          name: "datascience",
          color: "blue-text-gradient",
        },
        {
          name: "apriori",
          color: "green-text-gradient",
        },
        {
          name: "machinelearning",
          color: "pink-text-gradient",
        },
      ],
      image: yummatch,
      source_code_link: "https://chaitya0623-yummatch-app-840g8s.streamlit.app/",
    },
    {
      name: "TubeBoost",
      description:
        "Created an ML model for Youtube Optimization, where I worked on getting Optimal Upload Time for a channel and also predict the Top-10 upcoming content creators.",
      tags: [
        {
          name: "ml",
          color: "blue-text-gradient",
        },
        {
          name: "datascience",
          color: "green-text-gradient",
        },
        {
          name: "streamlit",
          color: "pink-text-gradient",
        },
      ],
      image: tubeboost,
      source_code_link: "https://innomer-streamlitdeployment-app-d362at.streamlit.app/",
    },
    {
      name: "WorkConnect",
      description:
        "Frontend Developer (React) for a D2C website where workers could bid and accept orders from clients and negotiate for the same.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "green-text-gradient",
        },
        {
          name: "marketing",
          color: "pink-text-gradient",
        },
      ],
      image: workconnect,
      source_code_link: "https://devfolio.co/projects/workconnect-7ac9",
    },
    {
      name: "Short-a-Thon",
      description:
        "Frontend Developer (React) for a Hackathon Organizing Website and also created an ML model for automating Resume Shortlisting using NLP.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "machinelearning",
          color: "green-text-gradient",
        },
        {
          name: "django",
          color: "pink-text-gradient",
        },
      ],
      image: shortathon,
      source_code_link: "https://github.com/Chaitya0623/Hackniche_Console.io",
    },
    {
      name: "VerifyU",
      description:
        "Full Stack Developer (React, Django) for a Document Verification website where I also worked on an ML model to check the credibility of the document using CNN, OCR and Ecryption using QR code..",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "django",
          color: "green-text-gradient",
        },
        {
          name: "opencv",
          color: "pink-text-gradient",
        },
      ],
      image: verifyu,
      source_code_link: "https://devfolio.co/projects/verifyu-aea2",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };