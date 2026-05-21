# devOS v2.4 - Interactive Portfolio

An interactive, dual-mode developer portfolio built with React, Vite, and Tailwind CSS. devOS acts as a virtual operating system, allowing users to explore my projects, work history, and skills through either a programmer-focused terminal interface or a modern, glassmorphic visual UI.

## 🚀 Features

- **Dual-Mode UI:** Seamlessly switch between a hacker-style CLI terminal and a sleek, non-programmer "Glass Lab" visual interface.
- **Virtual File System:** Custom-built mock file system (`VIRTUAL_FS`) that handles directory navigation (`cd`), file reading (`run`), and directory listing (`ls`).
- **Terminal Capabilities:** Supports standard CLI commands, tab-completion, dynamic command history, and auto-scrolling.
- **Dynamic Media Viewer:** Built-in image gallery for project screenshots with keyboard navigation and fullscreen modal support.
- **Responsive Design:** Fully mobile-optimized with a sliding drawer sidebar and fluid layouts using Tailwind CSS.
- **Interactive UI Elements:** Custom animations, Matrix-style scanline overlays, and responsive native HTML5 behaviors.

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4, Custom CSS Animations
- **Icons:** Lucide React
- **Deployment:** Vercel / Hostinger (Ready)

## 📦 Installation & Setup

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/vvagraphics/devos.git
   cd devos
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   _The app will be available at `http://localhost:5173`_

4. **Build for production:**
   \`\`\`bash
   npm run build
   \`\`\`

## 💻 Available Terminal Commands

- \`help\` - Display the user manual and list of commands.
- \`ls\` - List all files and directories in the current location.
- \`cd [dir]\` - Change directory. Use \`cd ..\` to go up a level.
- \`run [file]\` - Read and execute file contents.
- \`pwd\` - Print the working directory.
- \`clear\` - Wipe terminal history.
- \`gui\` - Switch to the visual, non-programmer interface.

## 👤 Author

**Stefan Anderson**

- Portfolio: [mr3anderson.pro](https://mr3anderson.pro)
- Email: vvagraphics@gmail.com
