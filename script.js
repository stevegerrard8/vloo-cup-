const grid = document.getElementById('excel-grid');
const formulaInput = document.getElementById('formula-input');
const cellAddressDisplay = document.querySelector('.cell-address');

let currentLevel = 1;
let currentRow = 0;
let currentCol = 1;
let score = 0;

// Level 1 Verileri
const names = ["Ali", "Ayşe", "Mehmet", "Ali", "Can", "Ayşe", "Ali", "Zeynep", "Can"];
const targets = [
    { name: "Ali", count: 3, userAns: null, row: 2, col: 4 },
    { name: "Ayşe", count: 2, userAns: null, row: 3, col: 4 },
    { name: "Can", count: 2, userAns: null, row: 4, col: 4 }
];

function initLevel(level) {
    grid.innerHTML = "";
    if (level === 1) {
        buildLevel1();
        formulaInput.value = "LEVEL 1: İsimleri say ve D sütununa adetlerini yaz!";
    } else if (level === 2) {
        buildLevel2();
        formulaInput.value = "LEVEL 2: Hatalı hücreleri (#REF!) bul ve Enter ile temizle!";
    }
}

function buildLevel1() {
    for (let r = 0; r < 20; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < 10; c++) {
            const td = document.createElement('td');
            td.id = `cell-${r}-${c}`;
            
            // A Sütunu: İsim Listesi
            if (c === 1 && r < names.length) td.innerText = names[r];
            // C Sütunu: Hedef İsimler
            if (c === 3) {
                const target = targets.find(t => t.row === r);
                if (target) td.innerText = target.name + ":";
            }
            // Satır No
            if (c === 0) { td.innerText = r + 1; td.classList.add('row-header'); }
            
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }
}

// Level 2 ve 3 yapıları buraya eklenecek... 
// (Şimdilik Level 1 mekaniğini çalıştıralım)

window.addEventListener('keydown', (e) => {
    // Sayı girişi kontrolü (Level 1 için)
    if (currentLevel === 1 && !isNaN(e.key) && currentCol === 4) {
        const target = targets.find(t => t.row === currentRow);
        if (target) {
            const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
            cell.innerText = e.key;
            target.userAns = parseInt(e.key);
            checkLevel1Progress();
        }
    }

    // Hareket
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
    switch(e.key) {
        case 'ArrowUp': if (currentRow > 0) currentRow--; break;
        case 'ArrowDown': if (currentRow < 19) currentRow++; break;
        case 'ArrowLeft': if (currentCol > 1) currentCol--; break;
        case 'ArrowRight': if (currentCol < 9) currentCol++; break;
    }
    updateSelection();
});

function checkLevel1Progress() {
    const isDone = targets.every(t => t.userAns === t.count);
    if (isDone) {
        alert("Harika! Level 2'ye geçiyorsun...");
        currentLevel = 2;
        initLevel(2);
    }
}

function updateSelection() {
    document.querySelectorAll('.selected-cell').forEach(el => el.classList.remove('selected-cell'));
    const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    if (cell) cell.classList.add('selected-cell');
}

initLevel(1);
