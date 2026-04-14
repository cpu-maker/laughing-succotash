// ===== TIME =====
setInterval(() => {
  document.getElementById("time").textContent =
    new Date().toLocaleTimeString();
}, 1000);

// ===== STATS =====
setInterval(() => {
  const cpu = Math.floor(Math.random() * 60) + 20;

  let ram = "--";
  if (performance.memory) {
    ram = Math.round(
      (performance.memory.usedJSHeapSize /
       performance.memory.jsHeapSizeLimit) * 100
    );
  }

  document.getElementById("cpu").textContent = `CPU: ${cpu}%`;
  document.getElementById("ram").textContent = `RAM: ${ram}%`;
}, 1000);

// ===== FILE SYSTEM =====
const fs = {
  "/": ["home", "etc", "usr"],
  "/home": ["user"],
  "/home/user": ["documents", "downloads", "notes.txt"],
  "/home/user/documents": ["project.txt"],
  "/home/user/downloads": [],
  "/etc": ["config.cfg"],
  "/usr": ["bin"]
};

let currentDir = "/home/user";
let username = "user";

// ===== TERMINAL =====
const input = document.getElementById("input");
const output = document.getElementById("output");

function prompt() {
  return `${username}@myos:${currentDir.replace("/home/user","~")}$`;
}

function print(text) {
  output.innerHTML += text + "<br>";
}

function listDir(dir) {
  return fs[dir] ? fs[dir].join("  ") : "No such directory";
}

function changeDir(path) {
  if (path === "..") {
    if (currentDir !== "/") {
      currentDir = currentDir.substring(0, currentDir.lastIndexOf("/")) || "/";
    }
  } else {
    let newPath = path.startsWith("/") ? path : currentDir + "/" + path;
    newPath = newPath.replace(/\/+/g, "/");

    if (fs[newPath]) {
      currentDir = newPath;
    } else {
      print("cd: no such file or directory");
    }
  }
}

// ===== COMMAND HANDLER =====
function handleCommand(cmd) {
  const parts = cmd.split(" ");
  const base = parts[0];

  switch(base) {

    case "help":
      print("Commands: ls, cd, pwd, clear, echo, apt, whoami");
      break;

    case "ls":
      print(listDir(currentDir));
      break;

    case "pwd":
      print(currentDir);
      break;

    case "cd":
      changeDir(parts[1] || "/home/user");
      break;

    case "whoami":
      print(username);
      break;

    case "echo":
      print(parts.slice(1).join(" "));
      break;

    case "clear":
      output.innerHTML = "";
      return;

    case "apt":
      handleApt(parts.slice(1));
      break;

    default:
      print(`${base}: command not found`);
  }
}

// ===== APT SIMULATION =====
function handleApt(args) {
  const cmd = args[0];

  if (cmd === "update") {
    print("Fetching package lists...");
    setTimeout(() => print("Done."), 800);
  }

  else if (cmd === "upgrade") {
    print("Upgrading packages...");
    setTimeout(() => print("System upgraded."), 1000);
  }

  else if (cmd === "install") {
    const pkg = args[1];
    if (!pkg) {
      print("apt: specify a package");
      return;
    }

    print(`Installing ${pkg}...`);
    setTimeout(() => {
      print(`${pkg} installed successfully.`);
    }, 1000);
  }

  else {
    print("apt: invalid command");
  }
}

// ===== INPUT =====
input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const cmd = input.value;

    print(`${prompt()} ${cmd}`);
    handleCommand(cmd);

    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});

// initial prompt
print("Welcome to MyOS (Debian-like)");
print("Type 'help' to begin.");
