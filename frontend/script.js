document.getElementById("leadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("result");

  try {
    const response = await fetch("http://127.0.0.1:5000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message })
    });
    if (response.ok) {
      result.style.color = "green";
      result.innerText = "✅ Your query submitted successfully!";
      document.getElementById("leadForm").reset();
    } else {
      result.style.color = "red";
      result.innerText = "❌ Submission failed!";
    }
  } catch (error) {
    result.style.color = "red";
    result.innerText = "❌ Backend not reachable!";
  }
});
