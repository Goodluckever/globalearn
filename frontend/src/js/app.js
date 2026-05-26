const API_URL = "https://globalearn-n1bu.onrender.com";

async function getBackendStatus() {
  try {
    const response = await fetch(`${API_URL}/api/status`);
    const data = await response.json();

    console.log("Backend Connected:", data);

    const statusBox = document.getElementById("server-status");

    if (statusBox) {
      statusBox.innerHTML = `
        <h3>Platform Status</h3>
        <p>Status: ${data.status || "Online"}</p>
        <p>Mode: ${data.mode || "Simulation"}</p>
      `;
    }
  } catch (error) {
    console.error("Backend connection failed", error);
  }
}

getBackendStatus();
