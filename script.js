const grid = document.getElementById('excel-grid');
const cellAddressDisplay = document.querySelector('.cell-address');
let currentRow = 0;
let currentCol = 0;
let targetRow, targetCol;
let score = 0;

// 1. Tabloyu İnşa Et (A-J arası sütunlar, 1-20 arası satırlar)
function createGrid() {
    for (let r = 0; r < 20; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < 10; c++) {
            const td = document.createElement('td');
            td.id = `cell-${r}-${c}`;
            // İlk sütuna satır numaralarını yazalım (Excel stili)
            if (c === 0) td.innerText = r + 1; 
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }
    updateSelection();
    setNewTarget();
}

// 2. Yeni Hedef Belirle (Oyuncunun gitmesi gereken hücre)
function setNewTarget() {
    // Eski hedefi temizle
    if (targetRow !== undefined) {
        document.getElementById(`cell-${targetRow}-${targetCol}`).classList.remove('active-cell');
    }
    
    targetRow = Math.floor(Math.random() * 20);
    targetCol = Math.floor(Math.random() * 9) + 1; // 0. sütun numara sütunu olduğu için +1
    
    const targetCell = document.getElementById(`cell-${targetRow}-${targetCol}`);
    targetCell.classList.add('active-cell');
    targetCell.innerText = "GELİR_VERİSİ"; // Sanki veri giriyormuşuz gibi
}

// 3. Seçili Hücreyi Güncelle
function updateSelection() {
    // Tüm seçili sınıfları temizle
    document.querySelectorAll('td').forEach(td => td.style.outline = 'none');
    
    const currentCell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    currentCell.style.outline = "2px solid #217346";
    currentCell.style.outlineOffset = "-2px";
    
    // Sol üstteki adres çubuğunu güncelle (A1, B5 gibi)
    const colLetter = String.fromCharCode(65 + currentCol);
    cellAddressDisplay.innerText = `${colLetter}${currentRow + 1}`;
}

// 4. Klavye Kontrolleri
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': if (currentRow > 0) currentRow--; break;
        case 'ArrowDown': if (currentRow < 19) currentRow++; break;
        case 'ArrowLeft': if (currentCol > 0) currentCol--; break;
        case 'ArrowRight': if (currentCol < 9) currentCol++; break;
        case 'Enter':
            if (currentRow === targetRow && currentCol === targetCol) {
                score += 100;
                document.getElementById('formula-input').value = `SKOR: ${score} - Harika gidiyorsun!`;
                setNewTarget();
            }
            break;
    }
    updateSelection();
});

createGrid();
