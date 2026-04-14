// ===== CLOCK =====
setInterval(() => {
  document.getElementById("taskTime").textContent =
    new Date().toLocaleTimeString();
}, 1000);

// ===== WINDOW SYSTEM =====
function openApp(app) {
  document.getElementById(app + "Window").classList.remove("hidden");
}

function closeApp(app) {
  document.getElementById(app + "Window").classList.add("hidden");
}

// DRAGGING
let dragObj = null;
let offsetX = 0;
let offsetY = 0;

function dragStart(e, win) {
  dragObj = win;
  offsetX = e.clientX - win.offsetLeft;
  offsetY = e.clientY - win.offsetTop;

  document.onmousemove = dragMove;
  document.onmouseup = dragEnd;
}

function dragMove(e) {
  if (!dragObj) return;
  dragObj.style.left = (e.clientX - offsetX) + "px";
  dragObj.style.top = (e.clientY - offsetY) + "px";
}

function dragEnd() {
  dragObj = null;
  document.onmousemove = null;
}

// ===== TERMINAL SYSTEM (same Debian vibe) =====
const input = document.getElementById("input");
const output = document.getElementById("output");

const fs = {
  "/": ["home"],
  "/home": ["user"],
  "/home/user": ["docs", "file.txt"],
  "/home/user/docs": ["project.txt"]
};

let currentDir = "/home/user";
let username = "user";

function prompt() {
  return `${username}@myos:${currentDir.replace("/home/user","~")}$`;
}

function print(text) {
  output.innerHTML += text + "<br>";
}

function handleCommand(cmd) {
  const parts = cmd.split(" ");
  const base = parts[0];

  switch(base) {
    case "ls":
      print(fs[currentDir].join(" "));
      break;

    case "cd":
      if (parts[1] === "..") {
        currentDir = "/home/user";
      } else if (fs[currentDir + "/" + parts[1]]) {
        currentDir += "/" + parts[1];
      }
      break;

    case "pwd":
      print(currentDir);
      break;

    case "neofetch":
      print("MyOS Desktop Mode");
      break;

    case "clear":
      output.innerHTML = "";
      break;

    default:
      print("command not found");
  }
}

// INPUT
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value;

    print(`${prompt()} ${cmd}`);
    handleCommand(cmd);

    input.value = "";
  }
});

// boot
print("MyOS Desktop Loaded");
