/* ==========================================================================
   IMPORTS
   ========================================================================== */
import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal, Monitor, User, Folder, Menu, Globe, Cpu,
  ChevronLeft, ChevronRight, FileText, Image as ImageIcon,
  ExternalLink, Briefcase, X, Maximize2, ShieldAlert, Activity,
  ChevronUp, ArrowLeft, Download, Sparkles
} from 'lucide-react';

/* ==========================================================================
   VIRTUAL FILE SYSTEM DATA
   ========================================================================== */
const VIRTUAL_FS = {
  '/': { type: 'dir', children: ['about', 'projects', 'available_for.txt'], parent: null, label: 'ROOT_SYSTEM', visualLabel: 'Home' },
  '/about': { type: 'dir', children: ['bio.txt', 'experience.txt', 'skills.txt', 'interests.txt'], parent: '/', label: 'USER_PROFILE' },
  '/about/bio.txt': {
    type: 'file',
    label: 'PROFILE',
    ascii: String.raw`
[ USER PROFILE ]
   _______
  /       \
 |  O   O  |
 |    ^    |
  \  ___  /
   \_____/`,
    content: "USER PROFILE: Stefan Anderson\nROLE: Full-Stack Engineer & UI/UX Specialist\nLOCATION: Florida\n\nI architect web applications where pixel-perfect design meets high-performance logic. With over 4 years of experience in visual strategy and a transition into full-stack engineering, I specialize in building AI-integrated systems that reduce development cycles by up to 40%. My focus is on creating intuitive frontends backed by secure, hardened APIs and distributed architectures.",
    parent: '/about',
    logs: ["Bypassing kernel security...", "Intercepting personal data packets...", "Compiling Bio... DONE."]
  },
  '/about/experience.txt': {
    type: 'file',
    label: 'HISTORY',
    ascii: String.raw`
[ WORK HISTORY ]
        _
     _ | |
  _ | || |
 | || || |
 |_||_||_|`,
    content: "EXPERIENCE: [DEPLOYMENT_LOGS]\n\nFULL-STACK CONSULTANCY: (2025 – PRESENT)\nAI ARCH: Developed an application portfolio using LLMs to process natural language into structured JSON.\nOPTIMIZATION: Reduced initial development cycles by 40% through AI-assisted prototyping.\nSEC OPS: Managed site lifecycles (Vercel/Hostinger) with API hardening and GitGuardian monitoring.\n\nTECHNICAL MEDIA PRODUCTION: (2023 – PRESENT)\nCONTENT: Produced 15+ technical tutorials and industry walkthroughs.\nANALYTICS: Achieved peak performance of 40,000+ views through engagement metric analysis.\nAUTOMATION: Optimized video pipelines using specialized encoding tools.\n\nJAVA ENGINEERING REVATURE: (2023)\nSTACK: Engineered social media CRUD applications using Spring Boot and React.\nSCALE: Architected real-time feeds supporting 100+ concurrent users.\nREST API: Designed Flight Tracker APIs with JPA/Hibernate for data persistence.\n\nFULL-STACK JS PC PROFESSOR: (2022)\nE COMMERCE: Built React/Node.js capstone with Stripe API integration.\nSECURITY: Implemented JWT authentication for session integrity and data protection.\n\nCLIENT RELATIONS OFFICE DEPOT: (2023 – 2025)\nSOLUTIONS: Translated complex technical needs into actionable print and tech solutions.\nINTEGRITY: Operated POS and inventory systems to ensure transaction accuracy.",
    parent: '/about',
    logs: ["Scanning corporate archives...", "Decrypting employment records...", "Experience map ready."]
  },
  '/about/skills.txt': {
    type: 'file',
    label: 'TOOLBOX',
    ascii: String.raw`
[ TECH_STACK ]
  _______
 |_______|
 |_______|
 |_______|
 |_______|`,
    content:"LANGUAGES: JavaScript/TypeScript, Java (OOP), Python, SQL, HTML5/CSS3.\n\nFRONTEND: React, Next.js, Angular, Tailwind CSS, UI/UX Design (Figma/Adobe Suite).\n\nBACKEND: Spring Boot, Node.js, Express, RESTful APIs, JWT Auth, MySQL/MongoDB.\n\nAI & CLOUD: Gemini/OpenAI API, Vector Search, AWS (EC2/S3), Docker, Git/GitHub .\n\nSTANDARDS: Agile/Scrum, OWASP Security, WCAG Accessibility, CI/CD.",
    parent: '/about',
    logs: ["Scanning compiler versions...", "Mapping skill matrix... DONE."]
  },
  '/about/interests.txt': {
    type: 'file',
    label: 'PERSONAL',
    ascii: String.raw`
[ PERSONAL_LOG ]
    _  _  _
   / \/ \/ \
  |         |
   \       /
    \_   _/
      \_/`,
    content: "LINGUISTICS:\nActively studying multiple non-native languages to explore how different syntactical structures influence logic and problem-solving.\n\nHARDWARE:\nEnthusiast of custom hardware optimization; experienced in cross-platform environments (Windows/macOS) and specialized input-device ergonomics.\n\nDIGITAL MEDIA:\nDeveloped a niche content platform, scaling a single project to 40k+ views through engagement analytics and community management.\n\nSTRATEGIC ATHLETICS:\nCompetitive background in team-based sports, focusing on tactical coordination, leadership, and high-pressure decision-making.\n\nACTIVE PURSUITS:\nMaintaining a high-discipline daily regimen for physical and mental conditioning. Currently exploring cross-cultural media, creative movement, and auditory arts.",
    parent: '/about',
    logs: ["Accessing neural links...", "Filtering non-essential data...", "Interests loaded."]
  },
  '/projects': { type: 'dir', children: [
    'reson',
    'gift-genie',
    'vvagraphics',
    'crcleaning',
    'war-room',
    'deep-index'
  ], parent: '/', label: 'PROJ_REPOS', visualLabel: 'Projects' },

  '/projects/gift-genie': { type: 'dir', children: ['readme.md'], parent: '/projects', label: 'GIFT_GENIE' },
  '/projects/gift-genie/readme.md': {
    type: 'file',
    label: 'README.md',
    isProject: true,
    url: 'https://gift-genie-phi.vercel.app/',
    screenshots: [
      { src: 'http://mr3anderson.pro/assets/images/proj1/gift-genie1.jpg', title: "Gift Genie Dashboard", desc: "Command center with neon violet accents." },
      { src: 'http://mr3anderson.pro/assets/images/proj1/gift-genie2.jpg', title: "Location Based", desc: "AI agent to help you check out local areas" },
      { src: 'http://mr3anderson.pro/assets/images/proj1/gift-genie3.jpg', title: "Gift Genie", desc: "Ai Driven gift curator." }
    ],
    ascii: String.raw`+
  ____ ___ _____ _____    ____ _____ _   _ ___ _____
 / ___|_ _|  ___|_   _|  / ___| ____| \ | |_ _| ____|
| |  _ | || |_    | |   | |  _|  _| |  \| || ||  _|
| |_| || ||  _|   | |   | |_| | |___| |\  || || |___
 \____|___|_|     |_|    \____|_____|_| \_|___|_____|`,
    content: `> GIFT GENIE v1.0.4
---------------------------------
STATUS: Active Deployment
TECH: React, Gemini API, Cyberpunk UI

[SYNOPSIS]
A comprehensive React-based utility designed to take the stress out of gift-giving.Leverages dual AI features to store recipient profiles and generate personalized gift recommendations based on past preferences and interests.`,
    parent: '/projects/gift-genie'
  },

  '/projects/reson': { type: 'dir', children: ['readme.md'], parent: '/projects', label: 'RESON' },
  '/projects/reson/readme.md': {
    type: 'file',
    label: 'README.md',
    isProject: true,
    url: 'https://reson-kappa.vercel.app/',
    screenshots: [
      { src: 'http://mr3anderson.pro/assets/images/proj2/reson1.jpg', title: "RESON Home", desc: "Showing hero video backed by content" },
      { src: 'http://mr3anderson.pro/assets/images/proj2/reson2.jpg', title: "RESON Music PLayer", desc: "Intelligent AI Vibe Check, enhance page with colors and builds playlist based on vibe" },
      { src: 'http://mr3anderson.pro/assets/images/proj2/reson3.jpg', title: "RESON Dashboard", desc: "Detailed breakdown your profile and sales" }
    ],
    ascii: String.raw`
 ____  _____  ____   ___   _   _
|  _ \| ____|/ ___| / _ \ | \ | |
| |_) |  _|  \___ \| | | ||  \| |
|  _ <| |___  ___) | |_| || |\  |
|_| \_\_____||____/ \___/ |_| \_|
        ( 𝄞   |◎|   ♬ )`,
    content: `> RESON
---------------------------------
STATUS: Industrial Mesh Active
TECH: Angular, Gold/Obsidian UI, WebSockets

[SYNOPSIS]
A hybrid Angular platform that bridges the gap between high-end musical instrument e-commerce and immersive music streaming.
Includes an intelligent "Vibe Engine" that accepts natural language prompts to generate custom playlists, dynamic UI themes, and curated imagery that shifts the app's aesthetic in real-time to match the user's mood.`,
    parent: '/projects/aegis-edge-monitor'
  },

  '/projects/crcleaning': { type: 'dir', children: ['readme.md'], parent: '/projects', label: 'CRCLEANING' },
  '/projects/crcleaning/readme.md': {
    type: 'file',
    label: 'README.md',
    isProject: true,
    url: 'https://crcleaning.services/',
    screenshots: [
      { src: 'http://mr3anderson.pro/assets/images/proj3/crcleaning1.jpg', title: "CRCLEANING English", desc: "Zero-knowledge proof generation for age verification." },
      { src: 'http://mr3anderson.pro/assets/images/proj3/crcleaning2.jpg', title: "CRCLEANING Español", desc: "Versión en español de nuestra página web" },
      { src: 'http://mr3anderson.pro/assets/images/proj3/crcleaning3.jpg', title: "Request An Estimate", desc: "Estimate Calculator and contact." }
    ],
    ascii: String.raw`
  ____  ____    ____
 / ___||  _ \  / ___|
| |    | |_) || |
| |___ |  _ < | |___
 \____||_| \_\ \____|
( Professional Cleaning )`,
    content: `> CRCLEANING
---------------------------------
STATUS: CLEANING IN ROGRESS
TECH: ADOBE SUITE, WORDPRESS

[SYNOPSIS]
A professional service hub built on WordPress for a cleaning enterprise, focused on lead generation and customer transparency.Features a custom-built cost calculator that allows potential clients to get instant price quotes for specific services, such as event-based or deep cleaning.`,
    parent: '/projects/crcleaning'
  },

  '/projects/vvagraphics': { type: 'dir', children: ['readme.md'], parent: '/projects', label: 'VVAGRAPHICS' },
  '/projects/vvagraphics/readme.md': {
    type: 'file',
    label: 'README.md',
    isProject: true,
    url: 'https://vvagraphics.com',
    screenshots: [
      { src: 'http://mr3anderson.pro/assets/images/proj4/vva1.jpg', title: "VVA Portfolio", desc: "Landing page showcasing design methodology and UI/UX case studies." },
      { src: 'http://mr3anderson.pro/assets/images/proj4/vva2.jpg', title: "Design System", desc: "Detailed breakdown of the brand identity, typography, and color systems." },
      { src: 'http://mr3anderson.pro/assets/images/proj4/vva3.jpg', title: "Interactive UI", desc: "Showcasing web application prototypes and interactive motion design." }
    ],
    ascii: String.raw`
 __     __ __     __  __        ____  ____      __     ____  _   _ ___  ____   ___ 
 \ \   / / \ \   / / /  \      / ___||  _ \    /  \   |  _ \| | | |_ _|/ ___|/ ___|
  \ \ / /   \ \ / / / /_ \    | |  _ | |_) |  / /_ \  | |_) | |_| || || |    \___ \
   \ V /     \ V / / ____ \   | |_| ||  _ <  / ____ \ |  __/|  _  || || |___  ___) |
    \_/       \_/ /_/    \_\   \____||_| \_\/_/    \_\|_|   |_| |_|___|\____||____/   
    ( Visual Design | UI/UX | Web Development )`,
    content: `> VVAGRAPHICS
---------------------------------
STATUS: Design Systems Active
TECH: Figma, React, Framer Motion, Adobe Suite

[SYNOPSIS]
A high-fidelity design hub and digital portfolio for VVAGRAPHICS. This project serves as a showcase for custom UI/UX design, brand architecture, and interactive web applications. It leverages motion-heavy interfaces and modern design systems to communicate visual storytelling and technical proficiency in web development.`,
    parent: '/projects/vvagraphics'
  },

  '/projects/war-room': { type: 'dir', children: ['readme.md'], parent: '/projects', label: 'WAR-ROOM' },
  '/projects/war-room/readme.md': {
    type: 'file',
    label: 'README.md',
    isProject: true,
    url: 'https://war-room-nine-iota.vercel.app/',
    screenshots: [
      { src: 'http://mr3anderson.pro/assets/images/proj5/screen1.jpg', title: "The Butterfly Kanban", desc: "Interactive task board showing cascading dependency physics." },
      { src: 'http://mr3anderson.pro/assets/images/proj5/screen2.jpg', title: "Elastic Wires", desc: "Native Canvas rendering elastic strings between linked dependencies." }
    ],
    ascii: String.raw`
__        __   _      ____    
\ \      / /  / \    |  _ \   
 \ \ /\ / /  / _ \   | |_) |  
  \ V  V /  / ___ \  |  _ <   
   \_/\_/  /_/   \_\ |_| \_\ RM
       ( Butterfly Effect Kanban )`,
    content: `> WAR ROOM
---------------------------------
STATUS: OPERATIONAL
TECH: HTML5 Drag & Drop API, HTML5 Canvas, JavaScript/TypeScript

[SYNOPSIS]
A specialized Kanban system designed to handle complex DOM manipulation and conditional UI flow. Rather than relying on heavy drag-and-drop frameworks, it is engineered natively using HTML5 draggable attributes and event handlers. 

Features a unique "Butterfly Effect" dependency engine—linking tasks together creates elastic visual connections drawn on a custom Canvas overlay. Moving a parent task back into a blocked state triggers a live physical cascade, causing dependent cards to bounce, shake, and automatically recalculate their risk profile.`,
    parent: '/projects/war-room'
  },

  '/projects/deep-index': { type: 'dir', children: ['readme.md'], parent: '/projects', label: 'DEEP-INDEX' },
  '/projects/deep-index/readme.md': {
    type: 'file',
    label: 'README.md',
    isProject: true,
    url: 'https://deep-index-five.vercel.app/',
    screenshots: [
      { src: 'http://mr3anderson.pro/assets/images/proj6/screen1.jpg', title: "Matrix Engine", desc: "Custom SVG trend lines plotting output against environmental data." },
      { src: 'http://mr3anderson.pro/assets/images/proj6/screen2.jpg', title: "Time Machine Slider", desc: "Interactive history UI updating theme colors dynamically via Signals." }
    ],
    ascii: String.raw`
       \   |   /
    \  _____  /
  --  |  _  \  ____  ____  ____  --
--    | | | | | ___|| ___||  _ \   --
  --  | |_| | | _|  | _|  | |_) | --
    / |____/  |____||____||  __/  \
       /   |   \  INDEX   |_|`,
    content: `> DEEP INDEX
---------------------------------
STATUS: LIVE MONITORS ACTIVE
TECH: Angular, Supabase, Angular Signals, Native SVG Geometry, GitHub API

[SYNOPSIS]
A predictive system analytics dashboard that monitors a developer's real-time digital footprint. By correlating public version control data against environmental variables like current weather conditions, day of the week, and geomagnetic storms, the app maps out an experimental "Developer Productivity Index." 

Built entirely with zero heavy charting dependencies, it handles advanced data aggregations and renders intricate trend charts using pure, native SVG paths bound to typed state structures. Includes an interactive "Time Machine" timeline slider that dynamically alters the global dashboard UI—shifting from rainy, dark aesthetics during low-output logs to neon-gold glows during peak performance streaks.`,
    parent: '/projects/deep-index'
  },

  '/available_for.txt': {
    type: 'file',
    label: 'AVAILABLE_FOR',
    ascii: String.raw`
[ PROJECT_LOAD ]
 _______________
| [●] AVAILABLE |
| [ ] FULL      |
|_______________|`,
    content: `AVAILABILITY STATUS: [Fullstack | UI/UX roles]

1. FULL-TIME ENGINEERING:
Seeking Full-Stack or Frontend Developer roles.
Core Stack: React, Java (Spring Boot), Node.js, and TypeScript.
Dedicated to building scalable, production-ready interfaces.

2. UI/UX & DESIGN-TO-CODE:
Available for specialized Frontend/UI engineering roles.
Bridging the gap between high-fidelity prototypes and hardened code.
Focus on WCAG accessibility, system performance, and visual strategy.

3. INDEPENDENT CONTRACTING:
Available for short-term projects or staff augmentation.
Specialized in MVP development and AI-workflow integration.
Flexible delivery timelines (Remote / Distributed Node).

Contact: vvagraphics@gmail.com\nPortfolio: mr3anderson.pro\nGithub: github.com/vvagraphics`,
    parent: '/',
    logs: ["Pinging communication satellites...", "Opening secure hiring portal...", "Data ready."]
  }
};

/* ==========================================================================
   CONSTANTS
   ========================================================================== */
const HELP_TEXT = `
AVAILABLE COMMANDS:
-------------------
ls          : List all files and directories in current location.
cd [dir]    : Change directory example 'cd projects' | 'cd ..' to go back.
run [proj]  : Read file contents. example 'run reson'.
clear       : Wipe terminal history.
gui         : Toggle to visual interface.
pwd         : Print working directory.
help        : Display this manual.

INTERACTION TIPS:
-----------------
Navigation on the left sidebar updates both views.
Typing 'run' on a directory will auto-load its README.
TAB Completion is supported for paths and files.
`;

const ASCII_HEADER = String.raw`
       _                 ____     _____
      | |               / __ \   / ____|
    __| | ___ __   __  | |  | | (___
   / _' |/ _ \\ \ / /  | |  | | \___ \
  | (_| |  __/ \ V /   | |__| |____) |
   \__,_|\___|  \_/     \____/|_____/

PORTFOLIO OPERATING SYSTEM v2.4.0
`;

/* ==========================================================================
   UTILITIES & COMPONENTS
   ========================================================================== */
const MatrixRain = ({ onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const baseFontSize = 16;
    const columns = canvas.width / baseFontSize;
    
    const rainDrops = Array.from({ length: columns }).fill(0);
    const streamSpeeds = Array.from({ length: columns }).map(() => Math.random() * 1.0 + 0.4);

    let flashTick = 0;

    const draw = () => {
      flashTick += 0.05; 
      const backgroundAlpha = 0.04 + Math.sin(flashTick) * 0.02;
      const redFlashIntensity = Math.floor(10 + Math.sin(flashTick) * 8);

      ctx.fillStyle = `rgba(${redFlashIntensity}, 0, 0, ${backgroundAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        const currentSize = baseFontSize * (streamSpeeds[i] * 1.1);
        ctx.font = `bold ${currentSize}px monospace`;

        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#ef4444';
        } else {
          ctx.shadowBlur = 0; 
          
          if (streamSpeeds[i] > 1.1) {
            ctx.fillStyle = '#ff0033'; 
          } else if (streamSpeeds[i] > 0.7) {
            ctx.fillStyle = '#b91c1c';
          } else {
            ctx.fillStyle = '#450a0a';
          }
        }

        ctx.fillText(text, i * baseFontSize, rainDrops[i] * baseFontSize);
        
        if (rainDrops[i] * baseFontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
          streamSpeeds[i] = Math.random() * 1.0 + 0.4;
        }
        
        rainDrops[i] += streamSpeeds[i];
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-black cursor-pointer" onClick={onClose}>
      <canvas ref={canvasRef} className="block" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center select-none">
        <div className="bg-black/80 backdrop-blur-sm border border-red-500/30 px-6 py-4 rounded-xl max-w-md shadow-[0_0_50px_rgba(220,38,38,0.15)] animate-pulse">
          <p className="text-red-500 font-mono text-sm md:text-base tracking-[0.2em] font-black uppercase mb-1">
            CONSTRUCT OVERLOADED
          </p>
          <p className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
            Click anywhere to purge cache links
          </p>
        </div>
      </div>
    </div>
  );
};

const formatDisplayName = (str, isTerminal) => {
  if (!str) return '';
  if (isTerminal) return str; 

  let formatted = str.replace(/\.[^/.]+$/, "");
  formatted = formatted.replace(/[-_]/g, ' ');

  return formatted.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

/* ==========================================================================
   MAIN APP COMPONENT
   ========================================================================== */
const App = () => {
  
  // --- STATE ---
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [currentDir, setCurrentDir] = useState('/');
  const [viewedFile, setViewedFile] = useState(null);
  const [history, setHistory] = useState([
    { type: 'output', content: ASCII_HEADER },
    { type: 'output', content: 'SYSTEM BOOTING... DONE.' },
    { type: 'output', content: 'Type "help" for a list of available commands.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState(null);
  const [selectedImageState, setSelectedImageState] = useState(null);
  const [shakeSidebar, setShakeSidebar] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const [showPillChoice, setShowPillChoice] = useState(false);
  const [showWakeUp, setShowWakeUp] = useState(false);

  // --- REFS ---
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // --- EFFECTS ---
  useEffect(() => {
    if (isTerminalMode && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTerminalMode]);

  useEffect(() => {
    if (!isTerminalMode && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentDir, viewedFile, pendingPrompt, isTerminalMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImageState) return;
      if (e.key === 'ArrowRight') navigateImage(1);
      if (e.key === 'ArrowLeft') navigateImage(-1);
      if (e.key === 'Escape') setSelectedImageState(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageState]);

  // --- HANDLERS ---
  const handleScroll = (e) => {
    if (e.target.scrollTop > 300) setShowScrollTop(true);
    else setShowScrollTop(false);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runProcessingSequence = async (path, isFile = false) => {
    if (!isFile) return;
    setIsProcessing(true);
    setViewedFile(path);
    const node = VIRTUAL_FS[path];

    if (!node) {
      setHistory(prev => [...prev, { type: 'output', content: `ERROR: Path ${path} not found.` }]);
      setIsProcessing(false);
      return;
    }

    const logs = node.logs || ["Accessing sectors...", "DONE."];
    setHistory(prev => [...prev, { type: 'input', content: `[SYSTEM INIT] ACCESSING ${path.toUpperCase()}...` }]);

    for (const log of logs) {
      await sleep(100);
      setHistory(prev => [...prev, { type: 'output', content: log }]);
    }

    if (node.isProject && isTerminalMode) {
      setHistory(prev => [
        ...prev,
        { type: 'prompt_link', content: "\n[!!!] LIVE WEBSITE DETECTED\n", url: node.url },
        { type: 'prompt', content: "OPEN LIVE WEBSITE IN NEW TAB? [y/n]" }
      ]);
      setPendingPrompt({ type: 'full_exp', path });
    } else {
      await finishLoading(path);
    }
    setIsProcessing(false);
  };

  const finishLoading = async (path) => {
    const node = VIRTUAL_FS[path];
    await sleep(150);
    if (node.ascii) setHistory(prev => [...prev, { type: 'output', content: node.ascii }]);
    setHistory(prev => [...prev, { type: 'output', content: node.content }]);
    if (node.isProject && node.screenshots) {
      setHistory(prev => [...prev, { type: 'output', content: "\n[SYSTEM: INITIALIZING MEDIA DECODER...]" }]);
      await sleep(300);
      setHistory(prev => [...prev, { type: 'media', screenshots: node.screenshots, projectPath: path }]);
    }
  };

  const navigateImage = (direction) => {
    if (!selectedImageState) return;
    const project = VIRTUAL_FS[selectedImageState.projectPath];
    const total = project.screenshots.length;
    let nextIndex = selectedImageState.index + direction;
    if (nextIndex >= total) nextIndex = 0;
    if (nextIndex < 0) nextIndex = total - 1;
    setSelectedImageState({ ...selectedImageState, index: nextIndex });
  };

  const handlePromptResponse = async (responseValue) => {
    const response = responseValue.trim().toLowerCase();
    const node = VIRTUAL_FS[pendingPrompt.path];
    const path = pendingPrompt.path;
    setHistory(prev => [...prev, { type: 'input', content: responseValue }]);

    if (response === 'y' || response === 'yes') {
      setPendingPrompt(null);
      setHistory(prev => [...prev, { type: 'output', content: 'REDIRECTING TO LIVE WEBSITE...' }]);
      window.open(node.url, '_blank');
      setIsProcessing(true);
      await finishLoading(path);
      setIsProcessing(false);
    } else if (response === 'n' || response === 'no') {
      setPendingPrompt(null);
      setHistory(prev => [...prev, { type: 'output', content: 'LOADING LOCAL SCREENSHOTS...' }]);
      setIsProcessing(true);
      await finishLoading(path);
      setIsProcessing(false);
    } else {
      playErrorSound();
      setHistory(prev => [
        ...prev,
        { type: 'output', content: `[SYSTEM] INVALID CHOICE: "${responseValue}"` },
      { type: 'prompt', content: "PLEASE TYPE 'Y' FOR YES OR 'N' FOR NO." }
      ]);
    }
  };

  const processCommand = async (rawInput) => {
    if (isProcessing) return;
    if (pendingPrompt) {
      await handlePromptResponse(rawInput);
      return;
    }

    const input = rawInput.trim();
    if (!input) return;
    const [cmd, ...args] = input.split(/\s+/);
    const arg = args.join(' ');

    setHistory(prev => [...prev, { type: 'input', content: `guest@portfolio:${currentDir}$ ${input}` }]);

    switch (cmd.toLowerCase()) {
      case 'matrix':
      case 'wakeup':
      case 'neo':
      case 'mranderson':
      case 'mr3anderson':
        setShowMatrixRain(true);
        setHistory(prev => [...prev, { type: 'output', content: 'SYSTEM BREACHED. THE CONSTRUCT IS LOADING...' }]);
        break;
      case 'help':
        setHistory(prev => [...prev, { type: 'output', content: HELP_TEXT }]);
        break;
      case 'ls':
        setHistory(prev => [...prev, { type: 'output', content: VIRTUAL_FS[currentDir].children.join('  ') }]);
        break;
      case 'pwd':
        setHistory(prev => [...prev, { type: 'output', content: currentDir }]);
        break;
      case 'clear':
        setHistory([
        { type: 'output', content: ASCII_HEADER },
        { type: 'output', content: 'SYSTEM REBOOTING... DONE.' },
        { type: 'output', content: 'Type "help" for a list of available commands.' }
      ]);
        // ([{ type: 'output', content: ASCII_HEADER }, { type: 'output', content: 'SESSION REFRESHED.' }]);
        break;
      case 'gui':
        setIsTerminalMode(false);
        setPendingPrompt(null); 
        break;
      case 'cd':
        if (!arg || arg === '~') {
          setCurrentDir('/');
          setViewedFile(null);
        } else if (arg === '..' || arg === '../') {
          const parent = VIRTUAL_FS[currentDir].parent || '/';
          setCurrentDir(parent);
          setViewedFile(null);
        } else {
          let target = arg.startsWith('/') ? arg : (currentDir === '/' ? `/${arg}` : `${currentDir}/${arg}`);
          if (target.endsWith('/') && target.length > 1) target = target.slice(0, -1);

          if (VIRTUAL_FS[target] && VIRTUAL_FS[target].type === 'dir') {
            setCurrentDir(target);
            setViewedFile(null);
            if (target.startsWith('/projects/') && target !== '/projects') {
              const readme = `${target}/readme.md`;
              if (VIRTUAL_FS[readme]) await runProcessingSequence(readme, true);
            }
          } else {
            setHistory(prev => [...prev, { type: 'output', content: `cd: no such directory: ${arg}` }]);
          }
        }
        break;
      case 'run':
        let file = arg.startsWith('/') ? arg : (currentDir === '/' ? `/${arg}` : `${currentDir}/${arg}`);
        if (VIRTUAL_FS[file]?.type === 'dir') {
          const readme = `${file}/readme.md`;
          if (VIRTUAL_FS[readme]) file = readme;
        }
        if (VIRTUAL_FS[file]?.type === 'file') {
          await runProcessingSequence(file, true);
        } else {
          setHistory(prev => [...prev, { type: 'output', content: `run: ${arg}: No such file` }]);
        }
        break;
      default:
        setHistory(prev => [...prev, { type: 'output', content: `command not found: ${cmd}` }]);
    }
  };

  const handleTabCompletion = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const parts = inputValue.split(/\s+/);
      if (parts.length < 2) return;
      const partialArg = parts[parts.length - 1];
      const currentDirObj = VIRTUAL_FS[currentDir];
      if (!currentDirObj || !currentDirObj.children) return;

      const matches = currentDirObj.children.filter(child => child.startsWith(partialArg));
      if (matches.length === 1) {
        const newParts = [...parts];
        newParts[newParts.length - 1] = matches[0];
        setInputValue(newParts.join(' '));
      } else if (matches.length > 1) {
        setHistory(prev => [
          ...prev,
          { type: 'input', content: `guest@portfolio:${currentDir}$ ${inputValue}` },
          { type: 'output', content: matches.join('  ') }
        ]);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) navigateImage(1);
    else if (distance < -50) navigateImage(-1);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const playErrorSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      // Ignored
    }
  };

  const handleSidebarClick = async (path) => {
    if (isProcessing) return;

    if (pendingPrompt) {
      playErrorSound();
      if ("vibrate" in navigator) navigator.vibrate([50, 30, 50]);
      setShakeSidebar(true);
      setTimeout(() => setShakeSidebar(false), 500);
      setHistory(prev => [...prev, {
        type: 'output',
        content: <span className="text-red-500 whitespace-pre-wrap">{`\n[!] ACTION LOCKED: SYSTEM AWAITING RESPONSE.\n[?] TYPE 'Y' OR 'N' IN TERMINAL TO PROCEED.`}</span>
      }]);
      return;
    }

    if (path === '/') {
      setCurrentDir('/');
      setViewedFile(null);
      setIsMenuOpen(false);
      setHistory([]);
      await sleep(100);
      setHistory([
        { type: 'output', content: ASCII_HEADER },
        { type: 'output', content: 'SYSTEM REBOOTING... DONE.' },
        { type: 'output', content: 'Type "help" for a list of available commands.' }
      ]);
      return;
    }

    const node = VIRTUAL_FS[path];
    if (node?.type === 'dir') {
      setCurrentDir(path);
      setViewedFile(null);
      if (path.startsWith('/projects/') && path !== '/projects') {
        processCommand(`run ${path}`);
      }
      setIsMenuOpen(false);
    } else if (node?.type === 'file') {
      setCurrentDir(node.parent || '/');
      processCommand(`run ${path}`);
      setIsMenuOpen(false);
    }
  };

  const renderSubItems = (parentPath) => {
    const node = VIRTUAL_FS[parentPath];
    const isExpanded = currentDir.startsWith(parentPath);
    if (!node || !isExpanded) return null;

    return (
      <div className={`ml-9 flex flex-col gap-1 mt-1 border-l pl-4 ${isTerminalMode ? 'border-green-900/40' : 'border-slate-200'}`}>
        {node.children.map(childName => {
          const childPath = parentPath === '/' ? `/${childName}` : `${parentPath}/${childName}`;
          const isDir = VIRTUAL_FS[childPath]?.type === 'dir';
          const isActive = (viewedFile === childPath) || (currentDir === childPath && isDir);
          return (
            <button key={childPath} onClick={() => handleSidebarClick(childPath)} className={`text-xs text-left py-1 flex items-center gap-2 transition-colors cursor-pointer ${isActive ?
              (isTerminalMode ? 'text-green-400 font-bold' : 'text-teal-600 font-bold') : (isTerminalMode ? 'text-zinc-600 hover:text-green-500' : 'text-slate-400 hover:text-slate-700')}`}>
              {isDir ? <Folder size={12} /> : <FileText size={12} />}
              {formatDisplayName(childName, isTerminalMode)}
            </button>
          );
        })}
      </div>
    );
  };

  // --- RENDER VARIABLES ---
  const visualNode = viewedFile ? { ...VIRTUAL_FS[viewedFile], path: viewedFile } : null;
  const activeDirectory = VIRTUAL_FS[currentDir];
  const currentProject = selectedImageState ? VIRTUAL_FS[selectedImageState.projectPath] : null;
  const currentImage = currentProject ? currentProject.screenshots[selectedImageState.index] : null;

  return (
    <div className={`h-[100dvh] flex flex-col md:flex-row font-mono transition-colors duration-500 ${isTerminalMode ? 'bg-[#0a0a0a] text-green-500' : 'bg-slate-50 text-slate-800'}`}>

      {/* --- MOBILE TOP BAR --- */}
      <div className={`md:hidden flex items-center justify-between p-4 border-b z-[70] shrink-0 ${isTerminalMode ? 'bg-terminal-dark border-green-900/20' : 'bg-white/80 backdrop-blur-xl border-slate-200'}`}>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSidebarClick('/')}>
          <Cpu size={20} className={isTerminalMode ? 'text-green-500' : 'text-teal-600'} />
          <span className="font-bold tracking-tighter">devOS v2.4</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setIsTerminalMode(!isTerminalMode); setPendingPrompt(null); }} className={`px-6 py-3 w-full max-w-[280px] text-xs sm:text-sm text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg bg-red-950/20 text-red-500 hover:bg-red-500 border border-red-500 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${isTerminalMode ?
            'border-green-500/30 text-green-500 hover:bg-green-500 hover:text-black' : 'border-indigo-600/30 text-indigo-400 hover:bg-indigo-600 hover:text-black'}`}>
            {isTerminalMode ? 'Non-Programmer View' : 'Programmer Terminal'}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-md cursor-pointer ${isTerminalMode ? 'text-green-500 hover:bg-green-500/10' : 'text-slate-600 hover:bg-slate-100'}`}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-[60] w-72 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} ${shakeSidebar ?
        'animate-shake-sidebar' : ''} p-6 flex flex-col gap-6 border-r ${isTerminalMode ? 'bg-[#0d0d0d] border-green-900/10' : 'bg-white/80 backdrop-blur-2xl border-slate-200 shadow-[10px_0_40px_rgba(0,0,0,0.03)]'}`}>
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleSidebarClick('/')}>
          <div className={`p-2 rounded-lg transition-colors group-hover:bg-[#fabd2f]/20 ${isTerminalMode ? 'bg-green-950/40 text-green-500 border border-green-500/20 group-hover:bg-green-900/60' : 'bg-teal-50 text-teal-600 border border-teal-100 group-hover:bg-teal-100'}`}>
            <Cpu size={24} />
          </div>
          <h1 className={`text-xl font-bold tracking-tighter transition-colors group-hover:opacity-80 ${isTerminalMode ? 'text-green-500' : 'text-slate-800'}`}>devOS v2.4</h1>
        </div>

        <nav className="flex flex-col gap-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
          <button onClick={() => handleSidebarClick('/')} className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-left text-sm cursor-pointer shrink-0 ${currentDir === '/' && !viewedFile ?
            (isTerminalMode ? 'bg-green-500/10 text-green-400 font-bold' : 'bg-teal-50 text-teal-700 font-bold') : (isTerminalMode ? 'text-zinc-600 hover:text-green-500' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')}`}>
            <Monitor size={18} /> {isTerminalMode ? 'Root (/)' : 'Home'}
          </button>

          <div className="flex flex-col shrink-0">
            <button onClick={() => handleSidebarClick('/about')} className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-left text-sm cursor-pointer ${currentDir.startsWith('/about') ?
              (isTerminalMode ? 'bg-green-500/10 text-green-400 font-bold' : 'bg-teal-50 text-teal-700 font-bold') : (isTerminalMode ? 'text-zinc-600 hover:text-green-500' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')}`}>
              <User size={18} /> About
            </button>
            {renderSubItems('/about')}
          </div>

          <div className="flex flex-col shrink-0">
            <button onClick={() => handleSidebarClick('/projects')} className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-left text-sm cursor-pointer ${currentDir.startsWith('/projects') ?
              (isTerminalMode ? 'bg-green-500/10 text-green-400 font-bold' : 'bg-teal-50 text-teal-700 font-bold') : (isTerminalMode ? 'text-zinc-600 hover:text-green-500' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')}`}>
              <Folder size={18} /> Projects
            </button>
            {renderSubItems('/projects')}
          </div>

          <button onClick={() => handleSidebarClick('/available_for.txt')} className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-left text-sm cursor-pointer shrink-0 ${viewedFile === '/available_for.txt' ?
            (isTerminalMode ? 'bg-green-500/10 text-green-400 font-bold' : 'bg-teal-50 text-teal-700 font-bold') : (isTerminalMode ? 'text-zinc-600 hover:text-green-500' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')}`}>
            <Briefcase size={18} /> Available For
          </button>
        </nav>

        <div className={`mt-auto p-4 rounded-xl border transition-all duration-300 shrink-0 ${pendingPrompt ? 'bg-red-500/10 border-red-500/50 animate-pulse' : (isTerminalMode ? 'bg-green-500/5 border-green-500/10' : 'bg-white border-slate-200 shadow-sm')}`}>
          <div className="flex items-center gap-2 mb-2">
            <Activity size={14} className={pendingPrompt ? 'text-red-500' : (isTerminalMode ? 'text-green-500' : 'text-teal-500')} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${pendingPrompt ? 'text-red-500' : (isTerminalMode ? 'text-zinc-500' : 'text-slate-500')}`}>System Status</span>
          </div>
          {pendingPrompt ? (
            <div className="space-y-2">
              <p className="text-xs font-black text-red-500 leading-tight flex items-center gap-1 uppercase"><ShieldAlert size={12} /> Live Link Action Needed</p>
              <p className="text-[9px] leading-relaxed uppercase text-red-400/80">Check main console for prompt.</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className={`text-[10px] font-bold ${isTerminalMode ? 'text-green-400' : 'text-teal-600'}`}>NETWORK READY</p>
              <p className={`text-[9px] uppercase tracking-tighter ${isTerminalMode ? 'text-zinc-500' : 'text-slate-400'}`}>Latency: 24ms | Encrypted</p>
            </div>
          )}
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className={`flex-1 relative flex flex-col min-h-0 overflow-hidden ${isTerminalMode ? 'bg-black font-mono' : 'bg-transparent font-sans'}`}>

        <div className="absolute top-4 right-4 z-50 hidden md:block">
          <button onClick={() => { setIsTerminalMode(!isTerminalMode); setPendingPrompt(null); }} className="px-6 py-3 rounded-lg font-black uppercase tracking-widest text-xs sm:text-sm flex items-center gap-2 shadow-xl border transition-all duration-300 bg-red-950/20 text-red-500 border-red-500/50 backdrop-blur-md hover:bg-red-600/50 hover:-translate-y-1 cursor-pointer">
            {isTerminalMode ? <Globe size={16} /> : <Terminal size={16} />}
            {isTerminalMode ? 'Non-Programmer View' : 'Programmer Terminal'}
          </button>
        </div>

        {isTerminalMode && (
          <>
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-2 mix-blend-screen">
              <img 
                src="https://mr3anderson.pro/assets/images/The%20Construct/mranderson.svg" 
                alt="Mr. Anderson" 
                className="w-[60%] md:w-[40%] h-auto object-contain blur-[2px]" 
              />
            </div>
            
            <div className="absolute inset-0 pointer-events-none z-40 opacity-[0.03]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-scanlines" />
            </div>
          </>
        )}

        {!isTerminalMode && (
          <>
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-40 z-0" />
              <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-teal-100/40 blur-[120px] animate-pulse z-0" />
              <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-sky-100/40 blur-[120px] z-0" />
              <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-[120px] z-0" />
            </div>

            <div className="absolute bottom-0 right-0 z-50 p-4 md:p-12 flex items-end justify-end pointer-events-none">
              <img 
                src="https://mr3anderson.pro/assets/images/The%20Construct/whiterabbit.svg" 
                alt="White Rabbit" 
                onClick={() => setShowPillChoice(true)}
                className="w-32 max-h-[10vh] md:w-50 md:max-h-none h-auto object-contain pointer-events-auto cursor-pointer hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all duration-300" 
              />
            </div>
          </>
        )}

        <div className="flex-1 p-4 md:p-8 relative overflow-hidden z-10" onClick={() => isTerminalMode && inputRef.current?.focus()}>
          <div ref={scrollRef} onScroll={handleScroll} className={`h-full w-full overflow-y-auto custom-scrollbar transition-all duration-500 ${!isTerminalMode ? 'px-2 pb-20' : ''}`}>

            {!isTerminalMode && (currentDir !== '/' || viewedFile) && (
              <button onClick={(e) => {
                e.stopPropagation();
                if (currentDir.startsWith('/projects/') && currentDir !== '/projects') {
                  handleSidebarClick('/projects');
                } else if (viewedFile) {
                  handleSidebarClick(currentDir);
                } else {
                  handleSidebarClick(VIRTUAL_FS[currentDir]?.parent || '/');
                }
              }} className="md:hidden flex items-center gap-2 text-slate-700 mb-6 font-bold bg-white w-fit px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
                <ArrowLeft size={16} /> Back
              </button>
            )}

            {isTerminalMode ? (
              <div className="flex flex-col gap-2 pb-20">
                {history.map((line, idx) => (
                  <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-300">
                    {line.type === 'input' && <div className="text-green-400 font-bold mt-4 shrink-0 break-all">{line.content}</div>}
                    {line.type === 'output' && <div className="whitespace-pre-wrap font-mono text-[10px] sm:text-xs md:text-sm leading-relaxed text-green-400/80">{line.content}</div>}
                    {line.type === 'prompt_link' && <div className="text-red-500 font-bold mt-2">{line.content}<a href={line.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white inline-flex items-center gap-1">{line.url} <ExternalLink size={14} /></a></div>}
                    {line.type === 'prompt' && <div className="text-red-500 animate-pulse font-black py-1 uppercase tracking-tighter">{line.content}</div>}
                    {line.type === 'media' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6 p-6 bg-green-500/5 rounded-xl border border-green-500/10 shadow-2xl">
                        {line.screenshots.map((ss, sIdx) => (
                          <div key={ss.title} className="group relative cursor-pointer overflow-hidden rounded-lg border border-green-900/30 hover:border-green-400 transition-all shadow-lg" onClick={() => setSelectedImageState({ projectPath: line.projectPath, index: sIdx })}>
                            <img src={ss.src} alt={ss.title} className="w-full aspect-video object-cover opacity-60 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
                              <p className="font-bold text-sm text-green-400 flex items-center gap-2"><Maximize2 size={12} /> {ss.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {!isProcessing && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4">
                    <div className="flex items-center gap-2 max-w-full font-mono">
                      <span className="text-green-500 font-bold shrink-0">guest@portfolio:</span>
                      <span className="text-green-300 break-all font-medium">~{currentDir}</span>
                      <span className="text-green-300 font-bold">$</span>
                    </div>
                    <input ref={inputRef} autoFocus className="flex-1 bg-transparent border-none outline-none text-green-400 caret-green-500 min-w-[150px] font-mono" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
                      if (e.key === 'Enter') { processCommand(inputValue); setInputValue(''); } else { handleTabCompletion(e); }
                    }} autoComplete="off" spellCheck="false" />
                  </div>
                )}
                {isProcessing && <div className="animate-pulse text-green-600 font-bold mt-4">SYNCHRONIZING DATA...</div>}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-10 ">
                {visualNode ? (
                  <section className="space-y-8">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8">
                      <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500 flex items-center gap-3 tracking-tight break-words">
                        {visualNode.isProject ? <Folder className="text-teal-500 shrink-0" size={36} /> : <Sparkles className="text-teal-500 shrink-0" size={36} />}
                        {formatDisplayName(visualNode.visualLabel || visualNode.label || visualNode.path?.split('/').pop(), false)}
                      </h2>
                      <span className="text-[10px] hidden absolute top-20 right-4 sm:block font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">{visualNode.path}</span>
                    </div>

                    {isProcessing ? (
                      <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin"></div>
                        <p className="font-bold text-teal-600 animate-pulse tracking-widest uppercase text-sm">Loading Content...</p>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="bg-white/70 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border border-white text-slate-700 whitespace-pre-wrap text-[12px] sm:text-sm md:text-base lg:text-lg leading-relaxed break-words shadow-xl shadow-slate-200/50 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 opacity-50" />

                          {visualNode.ascii && (
                            <div className="font-mono text-[10px] sm:text-xs md:text-sm text-teal-600/80 mb-6 whitespace-pre overflow-x-auto leading-[1.2] opacity-90">
                              {visualNode.ascii}
                            </div>
                          )}

                          {visualNode.content}

                          {visualNode.path === '/available_for.txt' && (
                            <div className="mt-10 pt-8 border-t border-slate-100">
                              <a
                                href="https://mr3anderson.pro/assets/Stefan_Anderson_Developer.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-xl hover:text-teal-600 hover:border-teal-400 transition-colors shadow-lg shadow-slate-200/40 border border-slate-200 cursor-pointer"
                              >
                                <Download size={20} /> Download Resume PDF
                              </a>
                            </div>
                          )}
                        </div>

                        {visualNode.isProject && visualNode.screenshots && (
                          <div className="mt-16 space-y-8">
                            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                              <ImageIcon size={24} className="text-teal-500" /> Visual Assets
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {visualNode.screenshots.map((ss, sIdx) => (
                                <div key={ss.title} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md cursor-pointer hover:shadow-xl hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 group relative" onClick={() => setSelectedImageState({ projectPath: visualNode.path, index: sIdx })}>
                                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                                    <img src={ss.src} alt={ss.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                      <div className="bg-white p-4 rounded-full shadow-lg text-teal-600 transform scale-75 group-hover:scale-100 transition-transform">
                                        <Maximize2 size={24} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-6">
                                    <p className="font-bold text-slate-800 text-lg tracking-tight">{ss.title}</p>
                                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">{ss.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="pt-12 flex justify-center">
                              <button onClick={() => window.open(visualNode.url, '_blank')} className="inline-flex items-center gap-3 px-10 py-5 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all font-bold tracking-wide shadow-xl shadow-teal-600/20 hover:-translate-y-1 cursor-pointer">
                                Open Live Project <ExternalLink size={20} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                ) : (
                  <div className="flex flex-col animate-in fade-in duration-500">
                    <div className="border-b border-slate-200 pb-4 mb-6 md:pb-8 md:mb-12">
                      <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 tracking-tighter break-words">
                        {formatDisplayName(activeDirectory?.visualLabel || activeDirectory?.label || 'System Directory', false)}
                      </h2>
                      <p className="text-slate-400 font-medium text-sm mt-3 tracking-widest uppercase break-all">Path: {currentDir}</p>
                    </div>

                    <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center space-y-6 md:space-y-10 bg-white/15 backdrop-blur-3xl rounded-[2rem] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] text-slate-800">
                      <div className="w-16 h-16 md:w-32 md:h-32 bg-white rounded-full shadow-sm flex items-center justify-center text-teal-500 border border-slate-100">
                        {currentDir === '/' ? <Monitor size={56} strokeWidth={1.5} /> : currentDir.includes('about') ? <User size={56} strokeWidth={1.5} /> : <Folder size={56} strokeWidth={1.5} />}
                      </div>

                      {currentDir === '/' ? (
                        <div className="space-y-4 px-4 sm:px-6 max-w-2xl text-center">
                          <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Welcome to devOS</h3>
                          <p className="text-teal-600 font-bold text-lg md:text-xl">Stefan Anderson • Full-Stack & UI/UX Engineer</p>
                          <p className="text-slate-500 md:text-lg leading-relaxed mt-4">
                            You've accessed my interactive portfolio. Explore the system to learn more about my experience, skills, and featured projects. Select a directory below to begin.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4 px-6 max-w-md">
                          <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Select a Category</h3>
                          <p className="text-slate-500 md:text-lg leading-relaxed">Choose an item below to view its contents and explore the directory.</p>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-2 sm:px-6 w-full">
                        {activeDirectory?.children.map(child => {
                          const isAvailableFor = child === 'available_for.txt';
                          
                          return (
                            <button 
                              key={child} 
                              onClick={() => handleSidebarClick(currentDir === '/' ? `/${child}` : `${currentDir}/${child}`)} 
                              className={`
                                cursor-pointer px-4 sm:px-6 py-2 transition-all duration-300 font-medium rounded-lg text-sm flex-1 sm:flex-none min-w-[120px] max-w-[200px] text-center
                                backdrop-blur-[2px] border shadow-sm
                                ${isAvailableFor 
                                  ? 'bg-teal-500/10 border-teal-500/40 text-teal-700 hover:bg-teal-500/20 hover:border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.15)]' 
                                  : 'bg-white/5 border-white/40 text-slate-600 hover:bg-white/20 hover:border-white/80 hover:text-slate-900'}
                              `}
                            >
                              {formatDisplayName(child, false)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {!isTerminalMode && showScrollTop && (
            <button onClick={scrollToTop} className="absolute bottom-8 right-8 p-4 bg-white text-teal-600 rounded-full shadow-2xl z-50 hover:bg-teal-50 border border-slate-100 transition-all hover:-translate-y-2 animate-in zoom-in cursor-pointer" aria-label="Scroll to top">
              <ChevronUp size={24} strokeWidth={3} />
            </button>
          )}
        </div>
      </main>

      {/* --- MODALS --- */}
      {selectedImageState && currentImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedImageState(null)} onTouchStart={(e) => touchStartX.current = e.targetTouches[0].clientX} onTouchMove={(e) => {
          touchEndX.current = e.targetTouches[0].clientX;
          if (Math.abs(touchStartX.current - touchEndX.current) > 10) { if (e.cancelable) e.preventDefault(); }
        }} onTouchEnd={handleTouchEnd}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white p-3 z-[110] cursor-pointer" onClick={() => setSelectedImageState(null)}><X size={32} /></button>
          <div className="relative w-full max-w-6xl px-2 flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {currentProject.screenshots.length > 1 && (
              <>
                <div className="absolute left-0 inset-y-0 w-1/4 z-20 cursor-pointer md:hidden" onClick={() => navigateImage(-1)} />
                <div className="absolute right-0 inset-y-0 w-1/4 z-20 cursor-pointer md:hidden" onClick={() => navigateImage(1)} />
                <button className="absolute left-4 z-30 text-white/50 hover:text-white transition-all p-4 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-sm cursor-pointer" onClick={() => navigateImage(-1)}><ChevronLeft size={48} /></button>
                <button className="absolute right-4 z-30 text-white/50 hover:text-white transition-all p-4 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-sm cursor-pointer" onClick={() => navigateImage(1)}><ChevronRight size={48} /></button>
              </>
            )}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full">
              <img key={currentImage.src} src={currentImage.src} className="w-full h-auto max-h-[85vh] object-contain animate-in zoom-in-95 duration-300" alt={currentImage.title} />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                <div className="flex justify-between items-end gap-6">
                  <div className="min-w-0">
                    <h3 className="text-xl md:text-4xl font-black text-white truncate tracking-tight mb-2">{currentImage.title}</h3>
                    <p className="text-white/70 text-sm md:text-lg line-clamp-3 leading-relaxed">{currentImage.desc}</p>
                  </div>
                  <div className="shrink-0 text-white font-bold bg-white/10 px-4 py-2 rounded-lg text-xs md:text-base backdrop-blur-md border border-white/20">
                    {selectedImageState.index + 1} / {currentProject.screenshots.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMatrixRain && <MatrixRain onClose={() => setShowMatrixRain(false)} />}

      {showPillChoice && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-150 font-mono">
          <h2 className="text-white text-3xl md:text-5xl mb-16 font-bold tracking-[0.2em] text-center">
            Make your choice.
          </h2>
          <div className="flex gap-12 md:gap-32 items-center justify-center">
            <button
              onClick={() => { setShowPillChoice(false); setShowWakeUp(true); }}
              className="group relative hover:scale-105 transition-transform duration-200 focus:outline-none cursor-pointer"
            >
              <img 
                src="https://mr3anderson.pro/assets/images/The%20Construct/leftred.svg" 
                alt="Red Pill" 
                className="w-220 md:w-200 h-auto" 
              />
            </button>

            <button
              onClick={() => setShowPillChoice(false)}
              className="group relative hover:scale-105 transition-transform duration-200 focus:outline-none cursor-pointer"
            >
              <img 
                src="https://mr3anderson.pro/assets/images/The%20Construct/rightblue.svg" 
                alt="Blue Pill" 
                className="w-220 md:w-200 h-auto" 
              />
            </button>
          </div>
        </div>
      )}

      {showWakeUp && (
        <div 
          className="fixed inset-0 z-[300] bg-[#020202] flex flex-col items-center justify-center cursor-pointer select-none animate-in fade-in duration-700"
          onClick={() => setShowWakeUp(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-25 mix-blend-screen pointer-events-none">
            <img 
              src="https://mr3anderson.pro/assets/images/The%20Construct/eye.gif" 
              alt="Watching" 
              className="w-[85%] max-w-md md:max-w-xl h-auto object-contain grayscale scale-110"
            />
          </div>

          <div className="space-y-4 text-center max-w-xl select-none">
            <h2 className="text-green-500 font-mono text-4xl md:text-7xl tracking-[0.2em] font-black uppercase drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-pulse">
              Wake up...
            </h2>
            <p className="text-red-600/80 text-xs md:text-sm tracking-[0.2em] uppercase font-black animate-bounce delay-500">
              [!] The Matrix is watching you.
            </p>
          </div>

          <p className="absolute bottom-6 font-mono text-zinc-600 text-[10px] md:text-xs uppercase tracking-normal tracking-widest uppercase pointer-events-none">
            They are tracking your node. Click anywhere to sever link.
          </p>
        </div>
      )}

      <style>{`
        @keyframes scanlines { from { background-position: 0 0; } to { background-position: 0 40px; } }
        .animate-scanlines { animation: scanlines 10s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .bg-black.custom-scrollbar::-webkit-scrollbar-thumb { background: #333; }
        @keyframes shake-sidebar {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake-sidebar {
          animation: shake-sidebar 0.4s cubic-bezier(.36,.07,.19,.97) both;
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;