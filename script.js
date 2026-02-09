const grid = document.getElementById('excel-grid');
const cellAddressDisplay = document.querySelector('.cell-address');

let currentRow = 0;
let currentCol = 1; // 0. sütun numara sütunu olduğu için 1'den başlıyoruz

// 1. Tabloyu oluştururken ID'leri ve sınıfları net veriyoruz
function createGrid() {
    grid.innerHTML = "";
    for (let r = 0; r < 30; r++) { // 30 satır
        const tr = document.createElement('tr');
        for (let c = 0; c < 15; c++) { // 15 sütun (A-O)
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
}

// 2. Seçili hücreyi görsel olarak güncelleme
function updateSelection() {
    // Önceki seçili olanı temizle
    const previous = document.querySelector('.selected-cell');
    if (previous) previous.classList.remove('selected-cell');

    // Yeni hücreyi bul ve vurgula
    const currentCell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    if (currentCell) {
        currentCell.classList.add('selected-cell');
        
        // Excel adresini yaz (Örn: B5)
        const colLetter = String.fromCharCode(64 + currentCol);
        cellAddressDisplay.innerText = `${colLetter}${currentRow + 1}`;
        
        // Seçili hücre her zaman ekranda kalsın (Scroll takibi)
        currentCell.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
}

// 3. Klavye Kontrolleri (Sadece Ok Tuşları ile Başlayalım)
window.addEventListener('keydown', (e) => {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
        e.preventDefault(); // Sayfanın kaymasını engelle
    }

    switch(e.key) {
        case 'ArrowUp': if (currentRow > 0) currentRow--; break;
        case 'ArrowDown': if (currentRow < 29) currentRow++; break;
        case 'ArrowLeft': if (currentCol > 1) currentCol--; break;
        case 'ArrowRight': if (currentCol < 14) currentCol++; break;
    }
    updateSelection();
});

createGrid();
