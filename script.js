const grid = document.getElementById('excel-grid');
const cellAddressDisplay = document.querySelector('.cell-address');
const formulaInput = document.getElementById('formula-input');

let currentRow = 0;
let currentCol = 1; // 0. sütun numara sütunu
let targetRow, targetCol, currentTask;
let score = 0;
let isEditing = false;

const tasks = [
    { label: "COPY", key: "c", ctrl: true },
    { label: "PASTE", key: "v", ctrl: true },
    { label: "CUT", key: "x", ctrl: true },
    { label: "EDIT (F2)", key: "F2", ctrl: false },
    { label: "ENTER", key: "Enter", ctrl: false }
];

function createGrid() {
    grid.innerHTML = "";
    for (let r = 0; r < 20; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < 10; c++) {
            const td = document.createElement('td');
            td.id = `cell-${r}-${c}`;
            if (c === 0) {
                td.innerText = r + 1;
                td.classList.add('row-header');
            }
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }
    updateSelection();
    setNewTarget();
}

function setNewTarget() {
    if (targetRow !== undefined) {
        const oldCell = document.getElementById(`cell-${targetRow}-${targetCol}`);
        oldCell.classList.remove('active-cell');
        oldCell.innerText = "";
    }
    
    targetRow = Math.floor(Math.random() * 20);
    targetCol = Math.floor(Math.random() * 9) + 1;
    currentTask = tasks[Math.floor(Math.random() * tasks.length)];
    
    const targetCell = document.getElementById(`cell-${targetRow}-${targetCol}`);
    targetCell.classList.add('active-cell');
    targetCell.innerText = currentTask.label;
    formulaInput.value = `GÖREV: ${currentTask.label} komutunu uygula!`;
}

function updateSelection() {
    document.querySelectorAll('td').forEach(td => td.classList.remove('selected-cell'));
    const currentCell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    currentCell.classList.add('selected-cell');
    
    const colLetter = String.fromCharCode(64 + currentCol);
    cellAddressDisplay.innerText = `${colLetter}${currentRow + 1}`;
}

window.addEventListener('keydown', (e) => {
    // F2 ve Ok Tuşları gibi default browser hareketlerini engelle (Oyunu bozmasın)
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","F2"].includes(e.key)) {
        e.preventDefault();
    }

    // Hareket Kontrolleri
    if (!isEditing) {
        if (e.key === 'ArrowUp' && currentRow > 0) currentRow--;
        if (e.key === 'ArrowDown' && currentRow < 19) currentRow++;
        if (e.key === 'ArrowLeft' && currentCol > 1) currentCol--;
        if (e.key === 'ArrowRight' && currentCol < 9) currentCol++;
    }

    // Görev Kontrolü
    const isCorrectKey = e.key.toLowerCase() === currentTask.key.toLowerCase();
    const isCorrectCtrl = e.ctrlKey === currentTask.ctrl;

    if (currentRow === targetRow && currentCol === targetCol) {
        if (isCorrectKey && isCorrectCtrl) {
            score += 150;
            formulaInput.value = `TEBRİKLER! Skor: ${score}`;
            setNewTarget();
        }
    }

    updateSelection();
});

createGrid();
