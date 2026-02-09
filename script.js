const grid = document.getElementById('excel-grid');
const cellAddressDisplay = document.querySelector('.cell-address');
const formulaInput = document.getElementById('formula-input');

let currentRow = 2; // C3
let currentCol = 2; 
let targetRow, targetCol;
let score = 0;

function createGrid() {
    grid.innerHTML = "";
    for (let r = 0; r < 20; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < 12; c++) {
            const td = document.createElement('td');
            td.id = `cell-${r}-${c}`;
            if (c === 0) { td.innerText = r + 1; td.classList.add('row-header'); }
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }
    setNewTarget();
    updateSelection();
}

function setNewTarget() {
    // Önceki hedefi temizle
    document.querySelectorAll('.active-cell').forEach(el => {
        el.classList.remove('active-cell');
        el.innerText = "";
    });

    targetRow = Math.floor(Math.random() * 19);
    targetCol = Math.floor(Math.random() * 10) + 1;
    
    const targetCell = document.getElementById(`cell-${targetRow}-${targetCol}`);
    targetCell.classList.add('active-cell');
    targetCell.innerText = "VERİ_GİR"; 
}

function updateSelection() {
    document.querySelectorAll('.selected-cell').forEach(el => el.classList.remove('selected-cell'));
    const currentCell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    currentCell.classList.add('selected-cell');
    
    const colLetter = String.fromCharCode(64 + currentCol);
    cellAddressDisplay.innerText = `${colLetter}${currentRow + 1}`;

    // Hedefe ulaşıldı mı?
    if (currentRow === targetRow && currentCol === targetCol) {
        score += 100;
        formulaInput.value = `SKOR: ${score} - Yeni Hedef Bekleniyor...`;
        setNewTarget();
    }
}

window.addEventListener('keydown', (e) => {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
    switch(e.key) {
        case 'ArrowUp': if (currentRow > 0) currentRow--; break;
        case 'ArrowDown': if (currentRow < 19) currentRow++; break;
        case 'ArrowLeft': if (currentCol > 1) currentCol--; break;
        case 'ArrowRight': if (currentCol < 11) currentCol++; break;
    }
    updateSelection();
});

createGrid();
