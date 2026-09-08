import "./styles.css";

const app = document.querySelector("#app");

const steps = [
  {
    title: "Install Node.js",
    detail: "Download the LTS version from nodejs.org. npm is installed together with Node.js."
  },
  {
    title: "Open the Folder",
    detail: "Extract the Google Drive ZIP file, then open lab_03.02_ON_YOUR_OWN in VS Code or PowerShell."
  },
  {
    title: "Install Packages",
    detail: "Run npm install once. This downloads Vite, Tailwind CSS, PostCSS, and Autoprefixer."
  },
  {
    title: "Run and Submit",
    detail: "Run npm run dev, open the local URL, then complete the GitHub branch and commit workflow."
  }
];

const commands = [
  "node -v",
  "npm -v",
  "npm install",
  "npm run dev",
  "npm run build"
];

const gitCommands = [
  "git init",
  "git status",
  "git add lab_03.02_ON_YOUR_OWN",
  'git commit -m \"Add Lab 03.02 Vite and Tailwind static app\"',
  "git branch -M main",
  "git remote add origin https://github.com/USERNAME/REPOSITORY.git",
  "git push -u origin main"
];

const checklist = [
  "Node.js LTS installed",
  "npm version displays in the terminal",
  "Project dependencies installed with npm install",
  "Vite server runs with npm run dev",
  "Production build passes with npm run build",
  "GitHub repository contains the lab folder"
];

app.innerHTML = `
  <main class="min-h-screen">
    <section class="border-b border-zinc-200 bg-white">
      <div class="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-center lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase text-teal-700">CC416 Application Development</p>
          <h1 class="mt-3 max-w-3xl text-4xl font-bold text-zinc-950 md:text-5xl">
            Lab 03.02: Setup, Vite, Tailwind, and GitHub Workflow
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-7 text-zinc-700">
            A static professional-style web app for practicing first-time project setup, modern frontend tooling,
            folder-based Git commits, branches, pushes, and merges.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <span class="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">Node.js</span>
            <span class="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800 ring-1 ring-sky-200">npm</span>
            <span class="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800 ring-1 ring-teal-200">Vite</span>
            <span class="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-800 ring-1 ring-cyan-200">Tailwind CSS</span>
            <span class="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-800 ring-1 ring-zinc-200">GitHub</span>
          </div>
        </div>
        <div class="rounded-lg border border-zinc-200 bg-zinc-950 p-5 shadow-sm">
          <div class="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <span class="h-3 w-3 rounded-full bg-red-400"></span>
            <span class="h-3 w-3 rounded-full bg-amber-400"></span>
            <span class="h-3 w-3 rounded-full bg-emerald-400"></span>
            <span class="ml-2 text-xs text-zinc-400">terminal</span>
          </div>
          <pre class="mt-4 overflow-x-auto text-sm leading-7 text-zinc-100"><code>npm install
npm run dev
node -v
npm -v
git status
git add lab_03.02_ON_YOUR_OWN
git commit -m "Complete Lab 03.02"</code></pre>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <div class="grid gap-4 md:grid-cols-4">
        ${steps.map((step, index) => `
          <article class="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <div class="flex h-10 w-10 items-center justify-center rounded-md bg-teal-600 text-sm font-bold text-white">
              ${index + 1}
            </div>
            <h2 class="mt-4 text-lg font-semibold text-zinc-950">${step.title}</h2>
            <p class="mt-2 text-sm leading-6 text-zinc-600">${step.detail}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="border-y border-zinc-200 bg-white">
      <div class="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase text-sky-700">First-time setup</p>
          <h2 class="mt-3 text-3xl font-bold text-zinc-950">Run the project after downloading it from Google Drive</h2>
          <p class="mt-4 text-sm leading-6 text-zinc-700">
            Students only need to install Node.js once on their computer. After that, each Vite project can be prepared
            by opening the folder and running npm install.
          </p>
        </div>
        <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
          <ol class="space-y-3">
            ${commands.map((command) => `
              <li class="rounded-md bg-white px-4 py-3 font-mono text-sm text-zinc-800 ring-1 ring-zinc-200">${command}</li>
            `).join("")}
          </ol>
        </div>
      </div>
    </section>

    <section class="border-y border-zinc-200 bg-white">
      <div class="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase text-cyan-700">Folder commit practice</p>
          <h2 class="mt-3 text-3xl font-bold text-zinc-950">Commit only the selected lab folder</h2>
          <p class="mt-4 text-sm leading-6 text-zinc-700">
            This lab belongs inside a larger chapter folder. Students should learn how to stage only the work required
            for the current activity instead of accidentally committing unrelated labs.
          </p>
        </div>
        <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
          <ol class="space-y-3">
            ${gitCommands.map((command) => `
              <li class="rounded-md bg-white px-4 py-3 font-mono text-sm text-zinc-800 ring-1 ring-zinc-200">${command}</li>
            `).join("")}
          </ol>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <div class="grid gap-6 md:grid-cols-3">
        <div>
          <h2 class="text-2xl font-bold text-zinc-950">Iteration 1</h2>
          <p class="mt-2 text-sm leading-6 text-zinc-600">Change text, colors, or spacing. Commit the first improvement on a feature branch.</p>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-zinc-950">Iteration 2</h2>
          <p class="mt-2 text-sm leading-6 text-zinc-600">Add a new section or card. Push the branch so GitHub stores the update online.</p>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-zinc-950">Merge</h2>
          <p class="mt-2 text-sm leading-6 text-zinc-600">Merge the branch into main after checking the app with npm run dev or npm run build.</p>
        </div>
      </div>
    </section>

    <section class="border-t border-zinc-200 bg-zinc-950">
      <div class="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <p class="text-sm font-semibold uppercase text-cyan-300">Submission checklist</p>
        <h2 class="mt-3 text-3xl font-bold text-white">Before sending your GitHub link</h2>
        <div class="mt-6 grid gap-3 md:grid-cols-2">
          ${checklist.map((item) => `
            <div class="flex items-center gap-3 rounded-md bg-white/5 px-4 py-3 ring-1 ring-white/10">
              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-sm font-bold text-zinc-950">✓</span>
              <span class="text-sm text-zinc-100">${item}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  </main>
`;
