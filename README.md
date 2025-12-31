# Group Project Repository Guidance

This repository contains the self made HTML template and documentation to help group members work collaboratively with each other.

---

## This is a guidance on using this HTML template

>[NOTE!]
>Strictly used within this group assignment

```bash
# Project Folder Structure
project-root/
├── assets/                             # Static assets
│   ├── css/
│   │   └── global.css                  # Tailwind input file and DaisyUI global configuration
│   ├── images/
│       ├── icons/                      # SVG, Favicons
│       └── photos/                     # Photos assets
├── components/                         # Reusable HTML & JS components (Header, Footer)
│   └── template-component.html         # Template used to create a component
├── dist/                               # Compiled assets
│   └── css/
│       └── output.css                  # Tailwind output file
├── node_modules/                       # Dependencies modules
├── pages/                              # HTML pages
│   └── template.html                   # Template used to create a page
├── public/                             # Public assets
├── .gitignore                          # Ignore certain folder on commit
├── Git-Guide.md                        # Git documentation
├── index.html                          # Index page
├── package-lock.json
├── package.json                        # Dependencies
├── README.md                           # Official documentation
```

## Tech Stack Used

- HTML5
- CSS3
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [JavaScript with Alpine JS](https://alpinejs.dev/)

## Instruction

1. Clone this repository

    ```bash
    git clone https://github.com/mhdhaikalll/ITT588-Group-Project.git
    ```

2. Read Git-Guide.md for a full guide on using Git

3. Run this commands to download the dependencies for enabling TailwindCSS.

    ```bash
    npm install
    ```

4. Run this command to open local development server

    ```bash
    npm run dev
    ```

5. Open the HTML file on http://localhost:3000 

6. Do not commit directly onto the main branch.
    >[WARNING!]
    >Please don't commit directly onto the main branch. Do a push request and make sure it does not have any merge conflict issue

7. Any issue, please contact me directly.

## Issue No.1

Please add this onto each of new HTML file everytime you guys need to create a page or components

```html
<!-- <link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css" /> -->
<link href="../dist/css/output.css" rel="stylesheet">
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.15.2/dist/cdn.min.js"></script>
```

This is to enable all the dependencies using CDN

OR

Just copy and paste the template.html inside /pages and then rename it onto your desire namefile.

## How Do I Use A Component / Modular HTML?

In order to use a component inside a page, use this line of code:

```html
<div x-data x-html="(await (await fetch('./components/<name>.html')).text())"></div>
```

Replace "name" with your desired component.

## Git Documentation

This repository also contains Git documentation to help you guys understand how Git works and how to work with other team members effeciently.

## Disclaimer

This repository is created by @mhdhaikalll purely for group assignment and related task
