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
├── .gitignore
├── index.html          # Index page
├── package-lock.json
├── package.json
└── README.md           # Official documentation
```

## Tech Stack Used

- HTML5
- CSS3 boosted with TailwindCSS
- JavaScript with Alpine JS

## Instruction

1. Run this command to enable TailwindCSS.

```bash
npx @tailwindcss/cli -i ./assets/css/global.css -o ./dist/css/output.css --watch
```

2. Do not commit directly onto the main branch.

3. Any issue, please contact me directly.


## Git Documentation

This repository also contains Git documentation to help you guys understand how Git works and how to work with other team members effeciently.

## Disclaimer

This repository is created by @mhdhaikalll purely for group assignment and related task
