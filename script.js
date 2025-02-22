const API_URL = "/api/qr_counter";

async function fetchCounter() {
    const response = await fetch(API_URL);
    const count = await response.text();
    document.getElementById("counter").innerText = `Escaneos: ${count}`;
}

async function incrementCounter() {
    await fetch(API_URL, { method: "POST" });
    fetchCounter();
}

fetchCounter();
