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
    columbia_ibm,
    github_logo,
    mcdonalds,
    mental_health,
    ethereum,
    aiagent,
    finance,
    audienceanalytics,
    spotify,
    snowflake,
    jpmc,
    kvcache
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
      name: "Machine Learning Center of Excellence, Summer Associate",
      company: "JPMorganChase",
      location: "New York, NY",
      description: "Jun 2026 - Aug 2026",
      image: jpmc,
      points: [
        "Post-trained LLMs via SFT (QLoRA) to build a unified framework to extract structured trading information from 1.5M+ daily conversations across 9 financial asset classes, achieving 96–107% of asset-specific model performance.",
        "Demonstrated cross-asset knowledge transfer, achieving 82% event detection on domains without training annotations.",
        "Benchmarked open-source LLM scaling, quantifying a 3.4-point F1 gain from 8B to 24B models at 4× GPU requirements.",
        "Explored Dynamic LoRA routing/merging, enabling domain-specific updates, cutting compute 80% over full retraining.",
      ],
    },
    {
      name: "Founding AI Engineer",
      company: "SimPPL",
      location: "New York, NY",
      description: "Aug 2023 - May 2025",
      image: simppl,
      points: [
        "Spearheaded a team of 4 to launch an AI-powered disinformation detection tool for 9 social media platforms, with grants from Mozilla and Google (exploreCSR), helping New York Public Radio boost engagement for 20K+ users.",
        "Deployed a full-stack production system with Next.js, Flask APIs, PostgreSQL and Redis data layers, containerized with Docker and served via Nginx on AWS, processing 1M+ user interactions to drive real-time content recommendations.",
        "Engineered an AI Agent using LangGraph to analyze 120k+ social media posts for our UNICEF-incubated tech venture.",
        "Enabled journalists in Bangladesh to identify accounts responsible for coordinated harassment of minorities; investigations using the platform contributed to Meta removing accounts with 100M+ views.",
      ],
    },
    {
      name: "Data Science Intern",
      company: "Avrio Energy",
      location: "Berlin, Germany",
      description: "Jun 2024 - Jul 2024",
      image: avrio,
      points: [
        "Optimized energy usage across 70+ McDonald’s outlets in 22 countries by engineering a data pipeline to track appliance level consumption and visualize real-time insights via Power BI, reducing operational costs by 15%.",
        "Automated real-time fault detection with Airflow alerts and a 92% accurate XGBoost model, cutting energy waste by 21%.",
      ],
    },
    {
      name: "Research Intern",
      company: "Indian Institute of Technology Patna",
      location: "Patna, India",
      description: "May 2023 - Nov 2023",
      image: iitp,
      points: [
        "Designed a fraud detection system on 250k+ Ethereum transactions using Graph Neural Networks (Temporal GATs) and Directed Random Walks to classify fraudulent nodes based on behavioral patterns, achieving 85% accuracy.",
      ],
    },
    {
      name: "Artificial Intelligence Intern",
      company: "Infiheal",
      location: "Mumbai, India",
      description: "Jun 2023 - Sep 2023",
      image: infiheal,
      points: [
        "Engineered a RAG-based mental health chatbot with LangChain & Haystack, fine-tuned LLaMA on 500k+ user chat transcripts to handle sensitive user queries, reducing hallucinations and increasing user retention by 12%.",
        "Deployed scalable ML architecture on AWS with Terraform & Docker, reducing manual setup time by 5+ hrs/week.",
      ],
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
    // {
    //   description: "Nov 2022",
    //   name: "Winner of X-tract 2022",
    //   image: xtract,
    //   source_code_link: 'https://drive.google.com/file/d/1ETWASIe5M1jjnyCeKaR-nWeQ2eBgXvj7/view?usp=sharing'
    // },
  ];
  
  const projects = [
    {
      name: "Audience Analytics Platform (Mozilla and Google Grants)",
      description: "Developed the MVP for an AI-powered Newsroom analytics platform to boost engagement for 20K+ users • 2025",
      image: audienceanalytics,
      source_code_link: '/projects/audience-analytics'
    },
    {
      name: "AI Agent for Social Media Trend Analysis (UNICEF Incubated)",
      description: "Analyzed 120K+ posts across multiple platforms to identify emerging trends • 2025",
      image: aiagent,
      source_code_link: '/projects/ai-agent'
    },
    {
      name: "RAG based Mental Health Chatbot",
      description: "Developed a RAG chatbot to provide reliable, context-aware mental health assistance • 2023",
      image: mental_health,
      source_code_link: '/projects/mental-health-chatbot'
    },
    {
      name: "Fraud Detection in Ethereum Transactions",
      description: "Classified fraudulent nodes on 250K+ transactions based on behavioral patterns • 2023",
      image: ethereum,
      source_code_link: '/projects/ethereum-fraud-detection'
    },
    {
      name: "Energy Optimization Across McDonald's Outlets",
      description: "Engineered data pipelines to track appliance level consumption and reduce energy waste • 2024",
      image: mcdonalds,
      source_code_link: '/projects/energy-optimization'
    },
    {
      name: "Auto Refining Smart Contract Generator",
      description: "A self improving agent ecosystem that generates, verifies, and refines Solidity contracts from natural language • 2025",
      image: columbia_ibm,
      source_code_link: "https://github.com/AgenticsFintekColumbia/smart-contracts"
    },
        {
      name: "Beyond Averages: Heterogeneity in Cloud Capacity Planning",
      description:
        "Feb 1, 2026 • 18 min read",
      image: snowflake,
      source_code_link: '/blogs/snowflake-workload-heterogeneity'
    },
    {
      name: "Dynamic KV Cache Compression for Reasoning",
      description: "Learned when to compress LLM KV caches during reasoning, improving accuracy from 26% to 32% • 2025",
      image: kvcache,
      source_code_link: "https://drive.google.com/file/d/1Wy1kQ9dgo7NFs-B14mSu8Rc3IiKyf2C2/view?usp=sharing"
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
    {
      name: "Lessons from Leading an International Mars Rover Team",
      description:
        "Jul 31, 2025 • 19 min read",
      image: antariksh,
      source_code_link: '/blogs/djs-antariksh'
    },
    {
      name: "The Story Behind My Columbia Admit",
      description:
        "May 30, 2025 • 17 min read",
      image: columbia,
      source_code_link: '/blogs/columbia-admit'
    },
  ];

  export { internships, educations, projects, publications, competitions, personal_blogs };