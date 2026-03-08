// ------------------- Users -------------------
let users = JSON.parse(localStorage.getItem('users') || '{}');
let currentUser = null;

// ------------------- Elements -------------------
const loginFrame = document.getElementById('login-frame');
const registerFrame = document.getElementById('register-frame');
const mainArea = document.getElementById('main-area');
const sidebar = document.getElementById('sidebar');
const playerNick = document.getElementById('player-nick');

// Buttons
const loginBtn = document.getElementById('login-btn');
const loginToggle = document.getElementById('login-toggle');
const regToggle = document.getElementById('reg-toggle');
const showRegisterBtn = document.getElementById('show-register');
const regCreateBtn = document.getElementById('reg-create-btn');
const regCancelBtn = document.getElementById('reg-cancel-btn');

const btnMain = document.getElementById('btn-main');
const btnSettings = document.getElementById('btn-settings');
const btnAccount = document.getElementById('btn-account');
const btnLogout = document.getElementById('btn-logout');

// Inputs
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const regUsername = document.getElementById('reg-username');
const regPassword = document.getElementById('reg-password');

// ------------------- Functions -------------------
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function togglePassword(input, btn) {
    if(input.type === "password") {
        input.type = "text";
        btn.textContent = "Hide";
    } else {
        input.type = "password";
        btn.textContent = "Show";
    }
}

// ------------------- Login/Register -------------------
loginToggle.addEventListener('click', () => togglePassword(loginPassword, loginToggle));
regToggle.addEventListener('click', () => togglePassword(regPassword, regToggle));

showRegisterBtn.addEventListener('click', () => {
    loginFrame.classList.add('hidden');
    registerFrame.classList.remove('hidden');
});

regCancelBtn.addEventListener('click', () => {
    registerFrame.classList.add('hidden');
    loginFrame.classList.remove('hidden');
});

loginBtn.addEventListener('click', () => {
    const username = loginUsername.value;
    const password = loginPassword.value;
    if(users[username] && users[username].password === password) {
        currentUser = username;
        users[currentUser].lastLogin = new Date().toLocaleString();
        saveUsers();
        playerNick.textContent = users[currentUser].nickname;
        loginFrame.classList.add('hidden');
        sidebar.classList.remove('hidden');
        showMainMenu();
    } else {
        alert("Invalid login or password!");
    }
});

regCreateBtn.addEventListener('click', () => {
    const username = regUsername.value;
    const password = regPassword.value;
    if(!username || !password) { alert("Fill all fields!"); return; }
    if(users[username]) { alert("User already exists!"); return; }
    users[username] = { password, nickname: username, created: new Date().toLocaleString(), lastLogin: new Date().toLocaleString() };
    currentUser = username;
    saveUsers();
    playerNick.textContent = username;
    registerFrame.classList.add('hidden');
    sidebar.classList.remove('hidden');
    showMainMenu();
});

// ------------------- Sidebar -------------------
btnMain.addEventListener('click', showMainMenu);
btnSettings.addEventListener('click', showSettings);
btnAccount.addEventListener('click', showAccountInfo);
btnLogout.addEventListener('click', logout);

// ------------------- Screens -------------------
function showMainMenu() {
    mainArea.innerHTML = `<h2>Main Menu — ${users[currentUser].nickname}</h2>`;
}

function showSettings() {
    mainArea.innerHTML = `
        <h2>Settings</h2>
        <p>New Nick:</p>
        <input id="new-nick">
        <button id="change-nick">Change Nick</button>
    `;
    document.getElementById('change-nick').addEventListener('click', () => {
        const newNick = document.getElementById('new-nick').value;
        if(newNick) {
            users[currentUser].nickname = newNick;
            saveUsers();
            playerNick.textContent = newNick;
            showSettings();
            alert("Nick changed!");
        }
    });
}

function showAccountInfo() {
    const info = users[currentUser];
    mainArea.innerHTML = `
        <h2>Account Info</h2>
        <p>Nick: ${info.nickname}</p>
        <p>Created: ${info.created}</p>
        <p>Last login: ${info.lastLogin}</p>
    `;
}

function logout() {
    currentUser = null;
    sidebar.classList.add('hidden');
    loginFrame.classList.remove('hidden');
    mainArea.innerHTML = '';
}