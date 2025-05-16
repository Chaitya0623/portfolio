import {
    infiheal,
    unicode,
    iitp,
    synapse,
    antariksh,
    simppl,
    xtract,
    irc23,
    irc24,
    ercr23,
    isdc24,
    retiral, 
    avrio,
    aaai,
    springer,
    ieee,
    mu,
    erc23o,
    erc24,
    karate,
    nationalconference,
    elsevier,
    columbia,
    github_logo,
    mcdonalds,
    mental_health,
    ethereum,
    aiagent,
    finance,
    audienceanalytics
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "blogs",
      title: "Blogs",
    },
    {
      id: "resume",
      title: "Resume",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  const educations = [
    {
      name: "Masters of Science in Data Science",
      description: "Aug 2025 - Dec 2026",
      image: columbia,
    },
    {
      name: "Bachelor of Technology in Computer Engineering",
      description: "Dec 2021 - May 2025",
      image: mu,
    },
  ];
  
  const internships = [
    {
      name: "Founding AI Engineer",
      description: "Aug 2023 - May 2025",
      image: simppl,
    },
    {
      name: "Data Science Intern",
      description: "Jun 2024 - Jul 2024",
      image: avrio,
    },
    {
      name: "Research Intern",
      description: "May 2023 - Nov 2024",
      image: iitp,
    },
    {
      name: "Artificial Intelligence Intern",
      description: "Jun 2023 - Sep 2024",
      image: infiheal,
    },
  ];

  const competitions = [
    {
      description: "Sep 2024",
      name: "11th in European Rover Challenge 2024, Krakow, Poland",
      image: erc24,
      source_code_link: 'https://drive.google.com/file/d/1VvNS0gHNt06U3JT0h625zmNIB_wM1AtE/view?usp=sharing'
    },
    {
      description: "Jan 2024",
      name: "3rd in International Rover Challenge 2024, Coimbatore, India",
      image: irc24,
      source_code_link: 'https://drive.google.com/file/d/18rtZfjURxV4I95nVfLhkRLE8Q28VhWqk/view?usp=sharing'
    },
    {
      description: "Jan 2024",
      name: "2nd in International Space Drone Challenge 2024, Coimbatore, India",
      image: isdc24,
      source_code_link: 'https://drive.google.com/file/d/1lcH92XxoE5IbHKgsqiJxA80tAx9vNUtM/view?usp=sharing'
    },
    {
      description: "Sep 2023",
      name: "2nd in European Rover Challenge 2023 (Remote)",
      image: ercr23,
      source_code_link: 'https://drive.google.com/file/d/1I5u-hSH6rCUEUV3OIfHr3g30G2LXsoEO/view?usp=sharing'
    },
    {
      description: "Sep 2023",
      name: "10th in European Rover Challenge 2023 (Onsite)",
      image: erc23o,
      source_code_link: 'https://drive.google.com/file/d/18rtZfjURxV4I95nVfLhkRLE8Q28VhWqk/view?usp=sharing'
    },
    {
      description: "Jan 2023",
      name: "8th in International Rover Challenge 2024, Bangalore, India",
      image: irc23,
      source_code_link: 'https://drive.google.com/file/d/1qnUZ087fVU60YNw_nbVyLplaaZ0lWTlf/view?usp=sharing'
    },
    {
      description: "Nov 2022",
      name: "Winner of X-tract 2022",
      image: xtract,
      source_code_link: 'https://drive.google.com/file/d/1ETWASIe5M1jjnyCeKaR-nWeQ2eBgXvj7/view?usp=sharing'
    },
  ];
  
  const projects = [
    {
      name: "Audience Analytics Product (Mozilla and Google Grants)",
      description: "Developed the MVP for an AI-powered Newsroom analytics platform to boost engagement for 20K+ users",
      image: audienceanalytics,
    },
    {
      name: "AI Agent for Social Media Trend Analysis (UNICEF Incubated)",
      description: "Analyzed 120K+ posts across multiple platforms to identify emerging trends",
      image: aiagent,
    },
    {
      name: "RAG based Mental Health Chatbot",
      description: "Developed a RAG chatbot to provide reliable, context-aware mental health assistance",
      image: mental_health,
    },
    {
      name: "GenAI-Powered Financial Advisory Platform",
      description: "Created a personalized savings insights engine with fine-tuned GPT model",
      image: finance,
      source_code_link: "https://github.com/Chaitya0623/TechTitans_TIAA",
    },
    {
      name: "Fraud Detection in Ethereum Transactions",
      description: "Classified fraudulent nodes on 250K+ transactions based on behavioral patterns",
      image: ethereum,
    },
    {
      name: "Energy Optimization Across McDonald's Outlets",
      description: "Engineered data pipelines to track appliance level consumption and reduce energy waste",
      image: mcdonalds,
    },
  ];
  
  const publications = [
    {
      name: "Can Social Media Platforms Transcend Political Labels? An Analysis of Neutral Conservations on Truth Social",
      description:
        "International AAAI Conference on Web and Social Media 2024",
      image: aaai,
      source_code_link: "https://workshop-proceedings.icwsm.org/abstract.php?id=2024_17",
    },
    {
      name: "How do Government Decisions Influence Financial Markets? A Causal Approach",
      description:
        "Submitted in Knowledge Based Systems",
      image: elsevier,
    },
    {
      name: "Cyberbullying or just Sarcasm? Unmasking Coordinated Networks on Reddit",
      description:
        "National Conference on Advanced Computer Science and Information Technology 2024",
      image: nationalconference,
      source_code_link: "https://ijercse.com/article/1%20November%202024%20IJERCSE.pdf",
    },
    {
      name: "Sentence Restructuring with User-Controlled Difficulty using NLP",
      description:
        "International Conference on Computing Communication and Networking Technologies 2023",
      image: ieee,
      source_code_link: "https://ieeexplore.ieee.org/document/10307165",
    },
    {
      name: "Infectious Disease Forecasting in India using LLM’s and Deep Learning",
      description:
        "National Conference on Bigdata Analysis 2024",
      image: nationalconference,
      source_code_link: "https://propulsiontechjournal.com/index.php/journal/article/view/8845",
    },
  ];
  const personal_blogs = [
    // {
    //   name: "The Story Behind My Columbia Admit",
    //   description:
    //     "Coming Soon",
    //   image: columbia,
    // },
    {
      name: "How my International Mars Rover Team Shaped Me",
      description:
        "Coming Soon",
      image: antariksh,
    },
  ];
  const technical_blogs = [
    {
      name: "Tech Guides",
      description:
        "My Personal Notes",
      image: github_logo,
      source_code_link: "https://github.com/Chaitya0623/Documentation/wiki",
    },
  ];

  export { internships, educations, projects, publications, competitions, personal_blogs, technical_blogs };