const API_URL = "https://globalearn-n1bu.onrender.com";

async function checkBackend() {
  try {
    const response = await fetch(`${API_URL}/api/status`);
    const data = await response.json();

    console.log(data);

    const status = document.getElementById("server-status");

    if (status) {
      status.innerHTML = `
        <h3>Server Connected</h3>
        <p>Status: ${data.status}</p>
        <p>Mode: ${data.mode}</p>
      `;
    }
  } catch (err) {
    console.error(err);
  }
}

checkBackend();
