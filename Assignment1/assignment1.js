const rowsInput = document.getElementById('rows');
const columnsInput = document.getElementById('columns');
const generateButton = document.getElementById('generate');
const table = document.getElementById('table');

// function to generate table based on user input
function generateTable() {
  // get the number of rows and columns from the inputs
  const rows = rowsInput.value || 10;
  const columns = columnsInput.value || 10;

  // clear the existing table
  table.innerHTML = '';

  // create the table
  const tableElem = document.createElement('table');
  for (let i = 1; i <= rows; i++) {
    const rowElem = document.createElement('tr');
    for (let j = 1; j <= columns; j++) {
      const cellElem = document.createElement('td');
      cellElem.textContent = `${i} x ${j} = ${i*j}`;
      rowElem.appendChild(cellElem);
    }
    tableElem.appendChild(rowElem);
  }
  table.appendChild(tableElem);
}

// call the generateTable function when the generate button is clicked
generateButton.addEventListener('click', generateTable);

// call the generateTable function when the page loads
window.onload = generateTable;
