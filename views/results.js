const table = document.getElementById('data_table');

function downloadCsv() {
    // Vytvoření obsahu CSV souboru
    let csvContent = "";
    
    for (const row of table.rows) {
        for (const cell of row.cells) {
            csvContent += cell.innerText + ";";
        }
        csvContent += "\n";
    }

    // Vytvoření a stažení CSV souboru
    var blob = new Blob([csvContent], { type: 'text/csv' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data_kviz.csv';
    link.click();
}



