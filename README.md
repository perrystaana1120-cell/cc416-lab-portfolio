# Lab 03.02 On Your Own

This is a static Vite and Tailwind CSS web app for practicing project setup, professional frontend tooling, and GitHub workflow.

## Start Here

If you received this folder from a Google Drive link, read this first:

- `TUTORIAL_SETUP_INSTALLATION.md` - install Node.js, npm, VS Code, Git, and run the project

After the project runs on your computer, continue with:

- `TUTORIAL_GITHUB_GIT.md` - GitHub account, repository, commit, branch, push, and merge tutorial

## Run the Project

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build the Project

```bash
npm run build
```

The production files will be generated in the `dist` folder.

## Main Files

- `index.html` - the static HTML entry point
- `src/main.js` - renders the page content
- `src/styles.css` - imports Tailwind CSS layers
- `tailwind.config.js` - tells Tailwind which files to scan
- `TUTORIAL_SETUP_INSTALLATION.md` - first-time installation and project setup tutorial
- `TUTORIAL_GITHUB_GIT.md` - complete GitHub and Git workflow tutorial

## Teacher Distribution Note

When sharing this folder through Google Drive, students can download the folder, extract it, open it in VS Code, then run:

```bash
npm install
npm run dev
```

They do not need to install Vite globally because Vite is already listed in `package.json`.
