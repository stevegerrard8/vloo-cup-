const grid = document.getElementById('excel-grid');
const formulaInput = document.getElementById('formula-input');
const cellAddressDisplay = document.querySelector('.cell-address');

let currentLevel = 1;
let currentRow = 0;
let currentCol = 1;
let isEditing = false;

// Level 1 Verileri
const names = ["Ali", "Ayşe", "Mehmet", "Ali", "Can", "Ayşe", "Ali", "Zeynep", "Can"];
const targets = [
    { name: "Ali", formula: '=COUNTIF(B1:B9;"Ali")', row: 2, col: 4, correct: false },
    { name: "Ayşe", formula: '=COUNTIF(B1:B9;"Ayşe")', row: 3, col: 4, correct: false },
    { name: "Can", formula: '=COUNTIF(B1:B9;"Can")', row: 4, col: 4, correct: false }
];

function initLevel(level) {
    grid.innerHTML = "";
    if (level === 1) buildLevel1();
    updateSelection();
}

function buildLevel1() {
    for (let r = 0; r < 20; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < 10; c++) {
            const td = document.createElement('td');
            td.id = `cell-${r}-${c}`;
            if (c === 1 && r < names.length) td.innerText = names[r];
            if (c === 3) {
                const target = targets.find(t => t.row === r);
                if (target) td.innerText = target.name + " Sayısı:";
            }
            if (c === 0) { td.innerText = r + 1; td.classList.add('row-header'); }
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }
}

window.addEventListener('keydown', (e) => {
    const currentCell = document.getElementById(`cell-${currentRow}-${currentCol}`);

    if (!isEditing) {
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
        switch(e.key) {
            case 'ArrowUp': if (currentRow > 0) currentRow--; break;
            case 'ArrowDown': if (currentRow < 19) currentRow++; break;
            case 'ArrowLeft': if (currentCol > 1) currentCol--; break;
            case 'ArrowRight': if (currentCol < 9) currentCol++; break;
            case 'F2': 
                startEdit(currentCell); 
                break;
        }
    } else if (e.key === 'Enter') {
        stopEdit(currentCell);
    }
    updateSelection();
});

function startEdit(cell) {
    isEditing = true;
    cell.contentEditable = "true";
    cell.focus();
    cell.style.background = "white";
}

function stopEdit(cell) {
    isEditing = false;
    cell.contentEditable = "false";
    const val = cell.innerText.trim().replace(/\s/g, ""); // Boşlukları temizle
    
    const target = targets.find(t => t.row === currentRow && t.col === currentCol);
    if (target) {
        // Formül kontrolü (Büyük/küçük harf duyarsız ve tırnak işareti esnek)
        const expected = target.formula.replace(/\s/g, "").toUpperCase();
        if (val.toUpperCase() === expected) {
            target.correct = true;
            cell.style.color = "#217346";
            cell.innerText = target.count || "3"; // Sayıyı göster veya formülü bırak
            checkLevel1Progress();
        } else {
            alert("Hatalı Formül! İpucu: =COUNTIF(B1:B9;\"İsim\")");
            cell.innerText = "";
        }
    }
}

function checkLevel1Progress() {
    if (targets.every(t => t.correct)) {
        alert("Crash Scope Gururla Sunar: Level 2'ye Hazırsın!");
        // Level 2'ye geçiş kodları buraya...
    }
}

function updateSelection() {
    if (isEditing) return;
    document.querySelectorAll('.selected-cell').forEach(el => el.classList.remove('selected-cell'));
    const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    if (cell) {
        cell.classList.add('selected-cell');
        const colLetter = String.fromCharCode(64 + currentCol);
        cellAddressDisplay.innerText = `${colLetter}${currentRow + 1}`;
    }
}

initLevel(1);
