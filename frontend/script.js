document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("result");

  if (name === "") {
    showError("Name is required");
    return;
  }

  if (!email.includes("@")) {
    showError("Email must contain @");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    showError("Phone number must be exactly 10 digits");
    return;
  }

  if (message.length < 7) {
    showError("Message must be at least 7 characters");
    return;
  }

  result.style.color = "green";
  result.innerHTML = `
    ✅ Thank you <b>${name}</b><br><br>
    🤖 AI Processing Enabled<br>
    Lead captured successfully<br>
    Our team will contact you soon
  `;

  document.getElementById("leadForm").reset();
});

function showError(msg) {
  const result = document.getElementById("result");
  result.style.color = "red";
  result.innerText = "❌ " + msg;
}
