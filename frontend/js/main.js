const API_URL = "http://localhost:5000/api";
let token = localStorage.getItem("token");

if (window.location.pathname.includes("dashboard.html") && !token) {
  window.location.href = "login.html";
}

const authHeaders = () => ({
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const registerBtn = e.target.querySelector("button");
  registerBtn.disabled = true;

  const payload = {
    name: document.getElementById("name")?.value.trim(),
    email: document.getElementById("email")?.value.trim(),
    password: document.getElementById("password")?.value.trim()
  };

  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  registerBtn.disabled = false;

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.message || "Registration failed!");
  }
});

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    email: document.getElementById("email")?.value.trim(),
    password: document.getElementById("password")?.value.trim()
  };

  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.message || "Invalid credentials!");
  }
});

if (document.getElementById("foldersList")) {
  loadFolders();
  loadFiles();
}

document.getElementById("folderForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("folderName").value.trim();
  if (!name) return alert("Folder name required!");

  await fetch(`${API_URL}/folders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name })
  });

  document.getElementById("folderName").value = "";
  loadFolders();
  loadFiles();
});

async function loadFolders(parent = "") {
  const res = await fetch(`${API_URL}/folders?parent=${parent}`, { headers: authHeaders() });
  const folders = await res.json();

  const ul = document.getElementById("foldersList");
  const select = document.getElementById("folderSelect");
  if (!ul || !select) return;

  ul.innerHTML = "";
  select.innerHTML = `<option value="">Select Folder</option>`;

  folders.forEach(f => {
    const li = document.createElement("li");
    li.innerHTML = `<span style="cursor:pointer;" onclick="openFolder('${f._id}')">${f.name}</span>`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => deleteFolder(f._id);
    li.appendChild(delBtn);
    ul.appendChild(li);

    const option = document.createElement("option");
    option.value = f._id;
    option.textContent = f.name;
    select.appendChild(option);
  });
}

async function deleteFolder(id) {
  await fetch(`${API_URL}/folders/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });
  loadFolders();
  loadFiles();
}

async function openFolder(id) {
  loadFolders(id);
  loadFiles(id);
}

document.getElementById("fileForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Please select a file!");

  const folder = document.getElementById("folderSelect").value;
  if (!folder) return alert("Select folder first!");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  await fetch(`${API_URL}/files`, {
    method: "POST",
    headers: authHeaders(),
    body: formData
  });

  document.getElementById("fileInput").value = "";
  loadFiles(folder);
});

async function loadFiles(folder = "") {
  const res = await fetch(`${API_URL}/files?folder=${folder}`, { headers: authHeaders() });
  const files = await res.json();
  const ul = document.getElementById("filesList");
  if (!ul) return;
  ul.innerHTML = "";

  files.forEach(f => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="http://localhost:5000${f.url}" target="_blank">${f.name}</a>`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => deleteFile(f._id);
    li.appendChild(delBtn);
    ul.appendChild(li);
  });
}

async function deleteFile(id) {
  await fetch(`${API_URL}/files/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });
  loadFiles();
}
