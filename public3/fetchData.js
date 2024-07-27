document.getElementById('fetchData').addEventListener('click', function() {
  fetch('/fetch-data')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
          tableBody.innerHTML = ''; // Clear existing table rows
          
          data.forEach(item => {
              const row = tableBody.insertRow();
              const cell1 = row.insertCell(0);
              const cell2 = row.insertCell(1);
              cell1.textContent = item.name;
              cell2.textContent = item.email;
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          alert('Error fetching data: ' + error.message);
      });
});
