async function loadLeads() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/leads");
    const leads = await response.json();

    const tbody = document.querySelector("#leadsTable tbody");
    tbody.innerHTML = ""; // Clear previous rows

    leads.forEach(lead => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${lead.id}</td>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.phone}</td>
        <td>${lead.message}</td>
        <td>${lead.status}</td>
        <td>${new Date(lead.created_at).toLocaleString()}</td>
      `;
      tbody.appendChild(row);
    });

  } catch (error) {
    console.log("Error loading leads:", error);
  }
}

// Page load pe dashboard update
window.onload = loadLeads;
