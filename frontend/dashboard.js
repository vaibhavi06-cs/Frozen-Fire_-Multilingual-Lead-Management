window.onload = async function () {
  try {
    const response = await fetch("http://localhost:5000/api/leads");
    const leads = await response.json();

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    leads.forEach(lead => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.phone}</td>
        <td>${lead.status}</td>
      `;

      tbody.appendChild(row);
    });

  } catch (error) {
    console.log("Error loading dashboard:", error);
  }
};
