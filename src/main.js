import "./styles.css";

const app = document.querySelector("#app");

let currentPage = 1;
let totalPages = 1;

// Render Main Dashboard Layout
app.innerHTML = `
  <main class="min-h-screen bg-slate-50 text-slate-900 pb-12">
    <!-- Header -->
    <header class="bg-blue-600 text-white shadow">
      <div class="mx-auto max-w-6xl px-6 py-6">
        <h1 class="text-3xl font-bold">User Management Dashboard</h1>
        <p class="text-blue-100 mt-1 text-sm">Lab 07 - Cloud Database Integration & Serverless API</p>
      </div>
    </header>

    <div class="mx-auto max-w-6xl px-6 mt-8 grid gap-8 md:grid-cols-[1fr_2fr]">
      
      <!-- Create User Section -->
      <section class="bg-white p-6 rounded-lg border border-blue-100 shadow-sm h-fit">
        <h2 class="text-xl font-semibold text-blue-900 mb-4">Create New User</h2>
        <form id="userForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input type="text" id="name" required class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. Perry Sta. Ana" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input type="email" id="email" required class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. perry@example.com" />
          </div>
          <button type="submit" class="w-full rounded-md bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Add User
          </button>
        </form>
      </section>

      <!-- Users Table Section -->
      <section class="bg-white p-6 rounded-lg border border-blue-100 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-blue-900">Registered Users</h2>
            <button id="refreshBtn" class="text-sm font-medium text-blue-600 hover:text-blue-800">
              Refresh List
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-blue-50 text-blue-900 border-b border-blue-100">
                <tr>
                  <th class="p-3 font-semibold">ID</th>
                  <th class="p-3 font-semibold">Name</th>
                  <th class="p-3 font-semibold">Email</th>
                  <th class="p-3 font-semibold">Joined Date</th>
                </tr>
              </thead>
              <tbody id="tableBody" class="divide-y divide-slate-100">
                <!-- Data or Skeletons injected here -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <button id="prevBtn" disabled class="rounded border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 disabled:opacity-40 hover:bg-blue-50 hover:text-blue-600">
            Previous
          </button>
          <span id="pageInfo" class="text-sm text-slate-600 font-medium">Page 1 of 1</span>
          <button id="nextBtn" disabled class="rounded border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 disabled:opacity-40 hover:bg-blue-50 hover:text-blue-600">
            Next
          </button>
        </div>
      </section>

    </div>
  </main>
`;

// Helper: Show Loading Skeletons
function showSkeletons() {
  const tableBody = document.querySelector("#tableBody");
  tableBody.innerHTML = Array(5)
    .fill(0)
    .map(
      () => `
      <tr class="animate-pulse">
        <td class="p-3"><div class="h-4 w-6 bg-blue-100 rounded"></div></td>
        <td class="p-3"><div class="h-4 w-32 bg-blue-100 rounded"></div></td>
        <td class="p-3"><div class="h-4 w-48 bg-blue-100 rounded"></div></td>
        <td class="p-3"><div class="h-4 w-24 bg-blue-100 rounded"></div></td>
      </tr>
    `
    )
    .join("");
}

// Fetch Users from API Endpoint
async function fetchUsers(page = 1) {
  showSkeletons();
  try {
    const res = await fetch(`/api/users?page=${page}&limit=5`);
    if (!res.ok) throw new Error("Failed to load user records.");
    
    const data = await res.json();
    currentPage = data.currentPage;
    totalPages = data.totalPages;

    renderTable(data.users);
    updatePagination();
  } catch (err) {
    document.querySelector("#tableBody").innerHTML = `
      <tr>
        <td colspan="4" class="p-4 text-center text-red-500 font-medium">${err.message}</td>
      </tr>
    `;
  }
}

// Render Users Data Table
function renderTable(users) {
  const tableBody = document.querySelector("#tableBody");
  if (!users || users.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="p-4 text-center text-slate-400">No user records found.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = users
    .map(
      (u) => `
      <tr class="hover:bg-blue-50/50 transition">
        <td class="p-3 text-slate-500 font-mono text-xs">#${u.id}</td>
        <td class="p-3 font-medium text-slate-800">${u.name}</td>
        <td class="p-3 text-slate-600">${u.email}</td>
        <td class="p-3 text-slate-400 text-xs">${new Date(u.created_at).toLocaleDateString()}</td>
      </tr>
    `
    )
    .join("");
}

// Update Pagination Buttons
function updatePagination() {
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  const pageInfo = document.querySelector("#pageInfo");

  pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;
}

// Event Listeners
document.querySelector("#userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();

  // Alert for Raw User Confirmation
  const isConfirmed = window.confirm(
    `Are you sure you want to register this new user?\n\nName: ${name}\nEmail: ${email}`
  );

  if (!isConfirmed) return;

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create user.");
    }

    window.alert("User registered successfully!");
    document.querySelector("#userForm").reset();
    fetchUsers(1);
  } catch (err) {
    window.alert(`Error: ${err.message}`);
  }
});

document.querySelector("#prevBtn").addEventListener("click", () => {
  if (currentPage > 1) fetchUsers(currentPage - 1);
});

document.querySelector("#nextBtn").addEventListener("click", () => {
  if (currentPage < totalPages) fetchUsers(currentPage + 1);
});

document.querySelector("#refreshBtn").addEventListener("click", () => {
  fetchUsers(currentPage);
});

// Initial Load
fetchUsers(1);