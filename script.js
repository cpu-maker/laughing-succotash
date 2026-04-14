// TIME
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent =
    now.toLocaleTimeString();
}
setInterval(updateTime, 1000);

// FAKE CPU + REAL RAM
function updateStats() {
  // CPU (fake but animated)
  const cpu = Math.floor(Math.random() * 60) + 20;

  // RAM (real from browser if available)
  let ram = "--";
  if (performance.memory) {
    ram = Math.round(
      (performance.memory.usedJSHeapSize /
       performance.memory.jsHeapSizeLimit) * 100
    );
  }

  document.getElementById("cpu").textContent = `CPU: ${cpu}%`;
  document.getElementById("ram").textContent = `RAM: ${ram}%`;
}
setInterval(updateStats, 1000);

// TERMINAL
const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const cmd = input.value;
    output.innerHTML += `> ${cmd}<br>`;

    handleCommand(cmd);

    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});

function handleCommand(cmd) {
  switch(cmd.toLowerCase()) {
    case "help":
      output.innerHTML += "Commands: help, clear, about<br>";
      break;

    case "clear":
      output.innerHTML = "";
      break;

    case "about":
      output.innerHTML += "MyOS v0.1 - Browser OS<br>";
      break;

    default:
      output.innerHTML += "Command not found<br>";
  }
}
