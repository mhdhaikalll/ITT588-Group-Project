# Group Project Repository Guidance

---

## This is a guidance on using this HTML template

Disclaimer! Only used for educational purposes.

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
- JavaScript with JQuery

## Folder

## Instruction

```bash
npx @tailwindcss/cli -i ./assets/css/global.css -o ./dist/css/output.css --watch
```
