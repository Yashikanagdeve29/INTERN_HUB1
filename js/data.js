/**
 * InternHub - Comprehensive Sample Internship Dataset
 * All records represent realistic, educational demo opportunities
 * spanning the 8 required domains.
 */

const internshipsData = [
  {
    id: 'intern-01',
    title: 'Frontend Web Development Intern',
    company: 'Nexus Interactive',
    companyInitials: 'NI',
    companyColor: '#4F46E5',
    domain: 'Web Development',
    location: 'San Francisco, CA',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '$1,500 / month',
    stipendAmount: 1500,
    description: 'Work alongside senior frontend engineers building responsive, accessible web applications using modern JavaScript, CSS architecture, and reusable component libraries.',
    skills: ['JavaScript (ES6+)', 'HTML5 & CSS3', 'React', 'Responsive Design', 'Git & GitHub'],
    postedDate: '2026-04-10',
    applyUrl: 'https://example.com/careers/frontend-intern',
    isSampleListing: true,
    responsibilities: [
      'Implement accessible, WCAG-compliant UI components from Figma design specifications.',
      'Refactor existing page templates for optimal mobile responsiveness and Core Web Vitals performance.',
      'Participate in daily agile stand-ups, sprint planning, and collaborative peer code reviews.',
      'Write modular, self-documenting code with comprehensive unit test coverage.'
    ],
    qualifications: [
      'Currently pursuing or recent graduate in Computer Science, Software Engineering, or equivalent practical experience.',
      'Proficiency in semantic HTML, modern CSS layouts (Flexbox/Grid), and vanilla JavaScript.',
      'Familiarity with version control workflows using Git.',
      'Strong eye for visual precision, spacing, typography, and UX ergonomics.'
    ],
    perks: ['1-on-1 Senior Mentorship', 'Flexible Working Hours', '$500 Learning Stipend', 'Certificate of Completion']
  },
  {
    id: 'intern-02',
    title: 'Data Science & Analytics Intern',
    company: 'QuantVantage Analytics',
    companyInitials: 'QV',
    companyColor: '#0EA5E9',
    domain: 'Data Science',
    location: 'New York, NY',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '$2,000 / month',
    stipendAmount: 2000,
    description: 'Analyze large-scale customer datasets, develop automated data cleaning pipelines, and generate exploratory data visualizations that inform executive strategy.',
    skills: ['Python', 'Pandas', 'SQL', 'Data Visualization', 'Scikit-Learn'],
    postedDate: '2026-04-08',
    applyUrl: 'https://example.com/careers/data-science-intern',
    isSampleListing: true,
    responsibilities: [
      'Extract and transform relational database records using SQL queries and Python ETL scripts.',
      'Conduct exploratory data analysis (EDA) to uncover trends, anomalies, and customer churn drivers.',
      'Construct interactive visual dashboards using Matplotlib, Seaborn, and business intelligence tools.',
      'Document findings and present analytical summaries to cross-functional stakeholders.'
    ],
    qualifications: [
      'Foundational knowledge of Python programming, statistical modeling, and hypothesis testing.',
      'Experience writing SQL queries with multi-table joins and aggregation.',
      'Curiosity for uncovering actionable insights from messy real-world datasets.',
      'Clear verbal and written communication skills.'
    ],
    perks: ['Hybrid Office in Manhattan', 'Team Hackathons', 'Full Tech Equipment Provided', 'Return Offer Potential']
  },
  {
    id: 'intern-03',
    title: 'Generative AI & LLM Applications Intern',
    company: 'CognitiveCore Labs',
    companyInitials: 'CC',
    companyColor: '#8B5CF6',
    domain: 'Artificial Intelligence',
    location: 'Seattle, WA',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '$2,400 / month',
    stipendAmount: 2400,
    description: 'Experiment with cutting-edge Large Language Models (LLMs), design retrieval-augmented generation (RAG) pipelines, and evaluate prompt optimization strategies.',
    skills: ['Python', 'PyTorch', 'Prompt Engineering', 'LangChain', 'Vector Databases'],
    postedDate: '2026-04-11',
    applyUrl: 'https://example.com/careers/ai-intern',
    isSampleListing: true,
    responsibilities: [
      'Prototype generative AI workflow assistants and agentic evaluation benchmarks.',
      'Integrate vector embeddings and similarity search using vector databases for contextual RAG pipelines.',
      'Benchmark hallucination rates and safety guardrails across diverse model checkpoints.',
      'Contribute to open-source developer tooling and technical documentation.'
    ],
    qualifications: [
      'Solid command of Python and foundational understanding of deep neural network architectures.',
      'Hands-on experience calling LLM APIs or fine-tuning transformer models.',
      'Passion for responsible, safe, and transparent AI engineering.',
      'Demonstrated academic or personal projects in AI/ML.'
    ],
    perks: ['Cloud GPU Compute Budget', 'Weekly Research Reading Groups', 'Remote Co-working Stipend', 'Mentorship']
  },
  {
    id: 'intern-04',
    title: 'Applied Machine Learning Intern',
    company: 'Acuity Vision Systems',
    companyInitials: 'AV',
    companyColor: '#10B981',
    domain: 'Machine Learning',
    location: 'Austin, TX',
    workMode: 'On-site',
    duration: '6 Months',
    stipend: '$1,800 / month',
    stipendAmount: 1800,
    description: 'Assist in training, evaluating, and deploying computer vision and predictive classification models for real-time edge processing and sensor anomaly detection.',
    skills: ['Python', 'TensorFlow', 'Computer Vision', 'Data Preprocessing', 'Docker'],
    postedDate: '2026-04-06',
    applyUrl: '',
    isSampleListing: true,
    responsibilities: [
      'Label, augment, and curate image and sensor datasets for supervised training runs.',
      'Train convolutional neural networks and evaluate metrics including precision, recall, and F1-score.',
      'Optimize neural network weights for inference quantization on lightweight edge hardware.',
      'Collaborate with hardware and embedded systems engineers.'
    ],
    qualifications: [
      'Strong mathematical background in linear algebra, multivariable calculus, and probability.',
      'Proficiency in Python and standard ML libraries (NumPy, Scikit-Learn, TensorFlow/Keras).',
      'Comfort working in Linux terminal environments and containerized development setups.',
      'Eager to learn production ML engineering workflows.'
    ],
    perks: ['On-site Austin Campus Gym & Cafeteria', 'Relocation Assistance', 'Hardware Lab Access', 'Mentorship']
  },
  {
    id: 'intern-05',
    title: 'UI/UX & Product Design Intern',
    company: 'PixelCraft Studio',
    companyInitials: 'PC',
    companyColor: '#EC4899',
    domain: 'UI/UX Design',
    location: 'Chicago, IL',
    workMode: 'Hybrid',
    duration: '3 Months',
    stipend: '$1,400 / month',
    stipendAmount: 1400,
    description: 'Create user flow wireframes, interactive high-fidelity prototypes, and contribute to an evolving enterprise design system focused on universal accessibility.',
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    postedDate: '2026-04-09',
    applyUrl: 'https://example.com/careers/uiux-intern',
    isSampleListing: true,
    responsibilities: [
      'Transform user problem statements into intuitive wireframes and interactive prototypes in Figma.',
      'Maintain component variants, auto-layout tokens, and documentation in our design system library.',
      'Conduct usability tests, synthesize user feedback, and iterate on interface usability pain points.',
      'Coordinate closely with frontend developers to ensure design fidelity during implementation.'
    ],
    qualifications: [
      'Portfolio demonstrating user-centered design process, wireframes, and polished visual UI.',
      'Proficiency in Figma (Auto-layout, Components, Interactive Variants).',
      'Understanding of WCAG accessibility guidelines, contrast ratios, and typography hierarchies.',
      'Empathy for end users and enthusiasm for iterative problem solving.'
    ],
    perks: ['Figma Professional License', 'Design Books & Courses Stipend', 'Mentorship from Staff Designer', 'Hybrid Perks']
  },
  {
    id: 'intern-06',
    title: 'Cybersecurity Analyst Intern',
    company: 'Sentinel Shield Cyber',
    companyInitials: 'SS',
    companyColor: '#F59E0B',
    domain: 'Cybersecurity',
    location: 'Washington, DC',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '$1,900 / month',
    stipendAmount: 1900,
    description: 'Monitor Security Information and Event Management (SIEM) consoles, perform vulnerability scanning, and assist in incident response and compliance readiness audits.',
    skills: ['Network Security', 'Linux', 'Vulnerability Assessment', 'SIEM Tools', 'Wireshark'],
    postedDate: '2026-04-04',
    applyUrl: '',
    isSampleListing: true,
    responsibilities: [
      'Triage and investigate real-time security alerts triggered across corporate network endpoints.',
      'Perform scheduled vulnerability scans and assist in prioritizing remediation patches with IT teams.',
      'Analyze network traffic captures using Wireshark to identify suspicious protocol behavior.',
      'Draft security awareness bulletins and educate employees on anti-phishing hygiene.'
    ],
    qualifications: [
      'Coursework or certifications in Information Security (Security+, Network+, or CEH in progress).',
      'Solid grasp of TCP/IP networking protocols, firewalls, and operating system security.',
      'Familiarity with Linux bash scripting and security log analysis.',
      'High integrity, discretion, and methodical analytical reasoning.'
    ],
    perks: ['Security+ Certification Exam Voucher Paid', 'Hands-on Range Lab Training', 'Mentorship Program', 'Paid Transit']
  },
  {
    id: 'intern-07',
    title: 'Cloud Infrastructure & DevOps Intern',
    company: 'StratusWave Cloud',
    companyInitials: 'SW',
    companyColor: '#06B6D4',
    domain: 'Cloud Computing',
    location: 'Boston, MA',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '$1,750 / month',
    stipendAmount: 1750,
    description: 'Assist in automating cloud deployments, crafting Infrastructure as Code (Terraform) configurations, and building automated CI/CD pipelines in containerized environments.',
    skills: ['AWS / GCP', 'Docker', 'Terraform', 'CI/CD Pipelines', 'Bash Scripting'],
    postedDate: '2026-04-07',
    applyUrl: 'https://example.com/careers/cloud-devops-intern',
    isSampleListing: true,
    responsibilities: [
      'Write modular Infrastructure-as-Code scripts using Terraform for provisioning cloud resources.',
      'Containerize microservice applications using Docker and optimize image build times.',
      'Maintain GitHub Actions workflows for continuous integration and automated testing.',
      'Monitor cloud resource utilization, error rates, and assist in setting up alerting dashboards.'
    ],
    qualifications: [
      'Familiarity with cloud platforms (AWS, Google Cloud, or Azure foundational concepts).',
      'Basic knowledge of containerization concepts, Dockerfiles, and container networking.',
      'Experience with version control and scripting languages (Bash, Python, or Go).',
      'Excitement for modern site reliability engineering and DevOps philosophies.'
    ],
    perks: ['AWS Cloud Practitioner Exam Voucher', 'Home Office Stipend', 'Flexible Schedule', 'Collaborative Team']
  },
  {
    id: 'intern-08',
    title: 'Growth & Digital Marketing Intern',
    company: 'HyperScale Brandworks',
    companyInitials: 'HB',
    companyColor: '#EF4444',
    domain: 'Digital Marketing',
    location: 'Los Angeles, CA',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '$1,200 / month',
    stipendAmount: 1200,
    description: 'Execute data-driven organic SEO campaigns, draft engaging technical content, and measure conversion funnels using web analytics to drive inbound user acquisition.',
    skills: ['Search Engine Optimization (SEO)', 'Content Marketing', 'Google Analytics', 'Copywriting', 'Email Automation'],
    postedDate: '2026-04-05',
    applyUrl: 'https://example.com/careers/digital-marketing-intern',
    isSampleListing: true,
    responsibilities: [
      'Conduct keyword research and content gap analysis to optimize technical blog posts for search rank.',
      'Track website traffic KPIs, bounce rates, and lead conversion funnels in Google Analytics.',
      'Manage newsletter drip sequences and A/B test email subject lines to boost engagement.',
      'Collaborate with design and product teams on promotional landing page copy.'
    ],
    qualifications: [
      'Strong writing ability with keen attention to voice, grammar, and persuasive storytelling.',
      'Familiarity with on-page SEO best practices and content management systems.',
      'Data-literate with an interest in marketing analytics and customer psychology.',
      'Self-starter with organized project management skills.'
    ],
    perks: ['Flexible 20 hrs/week schedule', 'Marketing Software Suite Access', 'Portfolio Case Studies', 'Letter of Recommendation']
  },
  {
    id: 'intern-09',
    title: 'Full Stack Web Engineering Intern',
    company: 'DevFlow Technologies',
    companyInitials: 'DF',
    companyColor: '#3B82F6',
    domain: 'Web Development',
    location: 'Raleigh, NC',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '$1,650 / month',
    stipendAmount: 1650,
    description: 'Contribute to both server-side REST APIs and modern client interfaces. Build end-to-end features connecting PostgreSQL databases to dynamic web interfaces.',
    skills: ['Node.js', 'Express', 'React', 'PostgreSQL', 'TypeScript'],
    postedDate: '2026-04-03',
    applyUrl: 'https://example.com/careers/fullstack-intern',
    isSampleListing: true,
    responsibilities: [
      'Develop robust REST API endpoints in Node.js and Express with comprehensive validation.',
      'Write database migration schemas and optimized SQL queries in PostgreSQL.',
      'Build responsive client UI views and integrate asynchronous state management.',
      'Implement authentication middleware and secure session management.'
    ],
    qualifications: [
      'Hands-on experience with JavaScript/TypeScript across both frontend and backend environments.',
      'Understanding of relational database modeling and CRUD operations.',
      'Knowledge of RESTful API conventions, HTTP methods, and status codes.',
      'Collaborative mindset and proactive communication style.'
    ],
    perks: ['Modern Tech Stack', 'Catered Lunches on Hybrid Days', '1-on-1 Engineering Lead Mentoring', 'Full Return Offer Track']
  },
  {
    id: 'intern-10',
    title: 'Big Data & Pipeline Engineering Intern',
    company: 'OmniStream Data',
    companyInitials: 'OD',
    companyColor: '#14B8A6',
    domain: 'Data Science',
    location: 'Denver, CO',
    workMode: 'On-site',
    duration: '4 Months',
    stipend: '$1,950 / month',
    stipendAmount: 1950,
    description: 'Work with streaming ingestion pipelines, distributed Spark clusters, and data warehouse architectures to support high-throughput analytics processing.',
    skills: ['Apache Spark', 'Python', 'SQL', 'Data Warehousing', 'Kafka Basics'],
    postedDate: '2026-04-02',
    applyUrl: '',
    isSampleListing: true,
    responsibilities: [
      'Build batch and micro-batch data pipelines using Apache Spark and Python.',
      'Assist in optimizing query execution plans across Snowflake and BigQuery data warehouses.',
      'Implement data quality validation checks to detect anomalous or null record spikes.',
      'Monitor pipeline runtimes and alert on DAG failures.'
    ],
    qualifications: [
      'Solid foundation in algorithms, data structures, and distributed systems fundamentals.',
      'Proficiency in Python or Java/Scala, plus advanced SQL.',
      'Familiarity with data storage formats (Parquet, Avro, JSON).',
      'Demonstrated enthusiasm for big data challenges.'
    ],
    perks: ['Ski Pass Allowance', 'On-site Denver Office', 'Top-tier Workstation Hardware', 'Executive Q&A Sessions']
  },
  {
    id: 'intern-11',
    title: 'Natural Language Processing (NLP) Intern',
    company: 'Linguistic AI Labs',
    companyInitials: 'LA',
    companyColor: '#6366F1',
    domain: 'Machine Learning',
    location: 'San Jose, CA',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '$2,200 / month',
    stipendAmount: 2200,
    description: 'Research sentiment analysis, semantic tokenization, multilingual embeddings, and transformer model distillation for high-efficiency mobile inference.',
    skills: ['Python', 'Hugging Face', 'Transformers', 'NLP', 'PyTorch'],
    postedDate: '2026-03-31',
    applyUrl: 'https://example.com/careers/nlp-intern',
    isSampleListing: true,
    responsibilities: [
      'Fine-tune pre-trained Transformer models (BERT, RoBERTa, T5) on proprietary domain text corpora.',
      'Evaluate model perplexity, inference latency, and multilingual translation quality.',
      'Construct automated benchmark test suites for named entity recognition (NER).',
      'Publish internal engineering whitepapers summarizing experimental findings.'
    ],
    qualifications: [
      'Academic background or independent study in Computational Linguistics or Deep Learning.',
      'Experience with Hugging Face Transformers and PyTorch.',
      'Strong grasp of text preprocessing, tokenization algorithms, and attention mechanisms.',
      'Curiosity and rigorous scientific methodology.'
    ],
    perks: ['Research Publication Co-authorship Opportunity', 'Remote Flexibility', 'Generous Stipend', 'Mentorship']
  },
  {
    id: 'intern-12',
    title: 'Accessibility & Design Systems Intern',
    company: 'Universal Inclusive Design',
    companyInitials: 'UI',
    companyColor: '#A855F7',
    domain: 'UI/UX Design',
    location: 'Atlanta, GA',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '$1,350 / month',
    stipendAmount: 1350,
    description: 'Audit digital interfaces against WCAG 2.2 AA criteria, formulate accessibility tokens, and conduct user testing sessions with assistive technology users.',
    skills: ['WCAG 2.2 Guidelines', 'Screen Readers (NVDA/VoiceOver)', 'Figma', 'Accessible Color Systems', 'Semantic HTML'],
    postedDate: '2026-03-29',
    applyUrl: '',
    isSampleListing: true,
    responsibilities: [
      'Conduct keyboard-only navigation tests and screen reader evaluations across web apps.',
      'Document accessibility specifications, focus indicators, and touch target standards in Figma.',
      'Partner with product designers to establish accessible color palettes and typographic scales.',
      'Prepare accessibility remediation guides for engineering squads.'
    ],
    qualifications: [
      'Passionate advocacy for digital inclusion and accessible web standards.',
      'Familiarity with WCAG 2.1 / 2.2 success criteria (contrast, keyboard focus, ARIA semantics).',
      'Experience using screen readers (VoiceOver, NVDA, or JAWS).',
      'Clear documentation and communication skills.'
    ],
    perks: ['Inclusive Design Certification Support', 'Flexible Hours', 'Dedicated Mentorship', 'Letter of Recommendation']
  },
  {
    id: 'intern-13',
    title: 'Penetration Testing & AppSec Intern',
    company: 'RedTeam Operations',
    companyInitials: 'RO',
    companyColor: '#DC2626',
    domain: 'Cybersecurity',
    location: 'Dallas, TX',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '$2,100 / month',
    stipendAmount: 2100,
    description: 'Assist in simulating ethical cyberattacks, discovering OWASP Top 10 web vulnerabilities, and helping engineering teams harden their codebase against exploitation.',
    skills: ['OWASP Top 10', 'Burp Suite', 'Web Security', 'Python Scripting', 'Ethical Hacking'],
    postedDate: '2026-03-27',
    applyUrl: 'https://example.com/careers/appsec-intern',
    isSampleListing: true,
    responsibilities: [
      'Perform guided web application security assessments using Burp Suite and manual inspection.',
      'Identify vulnerabilities including Cross-Site Scripting (XSS), SQLi, and broken access control.',
      'Write clear, reproducible proof-of-concept vulnerability disclosures.',
      'Guide developers on secure coding patterns and defensive input sanitization.'
    ],
    qualifications: [
      'Knowledge of web protocols, cookies, CORS, CSP headers, and common web attack vectors.',
      'Experience participating in CTF (Capture The Flag) competitions or platforms like TryHackMe/HackTheBox.',
      'Basic scripting proficiency in Python or Bash for testing automation.',
      'Strong ethical compass and commitment to responsible disclosure.'
    ],
    perks: ['CTF Team Sponsorship', 'Burp Suite Pro License', 'Dallas Office Perks', 'Senior Pentester Mentor']
  },
  {
    id: 'intern-14',
    title: 'Cloud Security & Governance Intern',
    company: 'Aether Cloud Defense',
    companyInitials: 'AC',
    companyColor: '#0284C7',
    domain: 'Cloud Computing',
    location: 'Portland, OR',
    workMode: 'Remote',
    duration: '4 Months',
    stipend: '$1,850 / month',
    stipendAmount: 1850,
    description: 'Implement automated cloud security compliance checks, audit IAM permissions, and safeguard multi-cloud infrastructure against misconfiguration risks.',
    skills: ['AWS IAM', 'Cloud Security Posture (CSPM)', 'Python', 'CloudTrail & CloudWatch', 'Terraform'],
    postedDate: '2026-03-25',
    applyUrl: '',
    isSampleListing: true,
    responsibilities: [
      'Audit least-privilege IAM policies, role delegations, and API key lifecycles.',
      'Automate detection of publicly exposed storage buckets and security group rule violations.',
      'Aggregate audit log events from CloudTrail and Security Hub into centralized dashboards.',
      'Create automated remediation scripts using AWS Lambda and Python.'
    ],
    qualifications: [
      'Foundational understanding of cloud security architecture and IAM concepts.',
      'Experience writing Python scripts for API interaction (boto3 library).',
      'Knowledge of zero-trust network principles.',
      'Analytical mindset and methodical attention to security details.'
    ],
    perks: ['Remote Anywhere in US/Canada', 'Security Conference Pass', 'Stipend for Ergonomic Desk', 'Full Mentorship']
  },
  {
    id: 'intern-15',
    title: 'Content Strategy & Social Media Intern',
    company: 'Catalyst Media Collective',
    companyInitials: 'CM',
    companyColor: '#D97706',
    domain: 'Digital Marketing',
    location: 'Miami, FL',
    workMode: 'Hybrid',
    duration: '3 Months',
    stipend: '$1,100 / month',
    stipendAmount: 1100,
    description: 'Develop social media editorial calendars, script short-form educational videos, and analyze audience engagement metrics across LinkedIn, YouTube, and X.',
    skills: ['Social Media Analytics', 'Content Calendar', 'Copywriting', 'Canva / Adobe Suite', 'Community Management'],
    postedDate: '2026-03-24',
    applyUrl: 'https://example.com/careers/social-media-intern',
    isSampleListing: true,
    responsibilities: [
      'Write compelling captions, carousels, and thought-leadership threads on emerging tech trends.',
      'Track weekly engagement rates, follower growth, and click-through rates across platforms.',
      'Moderate community discussions, answer user questions, and cultivate active online dialogue.',
      'Collaborate with graphic designers on on-brand visual collateral.'
    ],
    qualifications: [
      'Active social media presence or demonstrated experience managing brand accounts.',
      'Creative copywriting skills with ability to explain complex tech concepts engagingly.',
      'Visual taste and familiarity with basic design tools (Canva, Figma, or Adobe Photoshop).',
      'Positive, energetic, and collaborative personality.'
    ],
    perks: ['Vibrant Miami Beach Office Space', 'Free Snacks & Specialty Coffee', 'Creator Equipment Kit', 'Mentorship']
  },
  {
    id: 'intern-16',
    title: 'Computer Vision & Deep Learning Intern',
    company: 'NeuroVision Systems',
    companyInitials: 'NV',
    companyColor: '#7C3AED',
    domain: 'Artificial Intelligence',
    location: 'Pittsburgh, PA',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '$2,300 / month',
    stipendAmount: 2300,
    description: 'Research object detection, instance segmentation, and depth estimation models applied to autonomous navigation and industrial robotic inspection.',
    skills: ['PyTorch', 'OpenCV', 'YOLO / Vision Transformers', 'Python', 'Object Tracking'],
    postedDate: '2026-03-22',
    applyUrl: 'https://example.com/careers/cv-intern',
    isSampleListing: true,
    responsibilities: [
      'Train and validate real-time object detection models using PyTorch and OpenCV.',
      'Optimize dataset annotation pipelines and synthetic data generation techniques.',
      'Evaluate model latency across target GPU architectures using TensorRT.',
      'Document benchmark experiments and participate in laboratory demonstrations.'
    ],
    qualifications: [
      'Coursework or research in Computer Vision, Image Processing, and Deep Learning.',
      'Proficiency in Python, OpenCV, and deep learning frameworks (PyTorch preferred).',
      'Understanding of CNNs, Vision Transformers, and bounding-box loss functions.',
      'Eagerness to solve challenging real-world perception problems.'
    ],
    perks: ['Robotics Lab Access', 'Competitive Monthly Stipend', 'High-end Multi-GPU Rig', 'Co-op Credit Eligible']
  }
];

// Attach to window object for straightforward direct browser opening without bundlers
if (typeof window !== 'undefined') {
  window.INTERNSHIPS_DATA = internshipsData;
}

// Module export compatibility for any Node/testing environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = internshipsData;
}
