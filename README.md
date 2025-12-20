# Group Project Repository Guidance

This repository contains the self made HTML template and documentation to help group members work collaboratively with each other.

---

## This is a guidance on using this HTML template

Strictly used within this group assignment

```bash
# Project Folder Structure
project-root/
├── assets/             # Static assets
│   ├── css/
│   │   └── global.css  # Tailwind input file and global configuration
│   ├── images/
│   │   ├── icons/      # SVG, Favicons
│   │   └── photos/     # Photos assets
│   └── js/             # JS utility
├── components/         # Reusable HTML components (Header, Footer)
├── dist/               # Compiled assets
│   └── css/
│       └── output.css  # Tailwind output file
├── node_modules/
├── pages/              # HTML pages
├── public/             # Public assets
├── .gitignore          # Ignore certain folder
├── Git-Guide.md        # Git documentation
├── index.html          # Index page
├── package-lock.json
├── package.json        # Dependencies
├── README.md           # Official documentation
└── tailwind.config.js  # Tailwind Configuration File
```

## Tech Stack Used

- HTML5
- CSS3 boosted with TailwindCSS
- JavaScript with Alpine JS

## Instruction

1. Clone this repository

    ```bash
    git clone https://github.com/mhdhaikalll/ITT588-Group-Project.git
    ```

2. Read Git-Guide.md for a full guide on using Git

3. Run both of this commands to download dependencies enable TailwindCSS.

    ```bash
    npm install
    npx @tailwindcss/cli -i ./assets/css/global.css -o ./dist/css/output.css --watch
    ```

4. Do not commit directly onto the main branch.

5. Any issue, please contact me directly.

## Issue No.1

Please add this onto each of new HTML file everytime you guys need to create a page or components
```html
<link href="../dist/css/output.css" rel="stylesheet">
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.15.2/dist/cdn.min.js"></script>
```

This is to enable both TailwindCSS and Alpine.js

## Git Documentation

This repository also contains Git documentation to help you guys understand how Git works and how to work with other team members effeciently.

## Disclaimer

This repository is created by @mhdhaikalll purely for group assignment and related task
