// ВОЗРАТ ИНВЕНТАРЯ
function loadInventory(inventoryData) {
  const tableBody = document.getElementById("inventory_table").getElementsByTagName("tbody")[0];
  let maxId = 0;

  for (const [itemId, itemData] of Object.entries(inventoryData)) {
    const newRow = tableBody.insertRow();

    const nameCell = newRow.insertCell();
    nameCell.classList.add('item_name');
    nameCell.setAttribute('data-item', itemId);
    nameCell.contentEditable = "true";
    nameCell.innerText = itemData.item_name || "";

    const descCell = newRow.insertCell();
    descCell.classList.add('item_desc');
    descCell.setAttribute('data-item', itemId);
    descCell.contentEditable = "true";
    descCell.innerText = itemData.item_desc || "";

    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Удалить";
    deleteBtn.onclick = function () {
      tableBody.deleteRow(newRow.rowIndex - 1);
    };
    deleteCell.appendChild(deleteBtn);

    const numericId = parseInt(itemId.split('_')[1], 10);
    if (!isNaN(numericId) && numericId >= maxId) {
      maxId = numericId + 1;
    }
  }

  document.getElementById("itemCounter").value = maxId;
}

// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTab = btn.dataset.tab;
  
      // Снимаем активные классы
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
      // Вешаем активный класс на нужные
      btn.classList.add('active');
      document.querySelector(`.tab-content[data-tab="${selectedTab}"]`).classList.add('active');
    });
  });

// Добавление строк в таблицу инвентаря

function addRow() {
  const itemCounterInput = document.getElementById("itemCounter");
  let itemCounter = parseInt(itemCounterInput.value, 10) || 0;
  const table = document.getElementById("inventory_table").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();
  const uniqueId = `item_${itemCounter++}`;

  const cell = newRow.insertCell();
  cell.classList.add('item_name');
  cell.setAttribute('data-item', uniqueId);
  cell.contentEditable = "true";
  cell.innerText = "";
  cell.addEventListener('input', () => saveSkills(cell));

  const cell1 = newRow.insertCell();
  cell1.classList.add('item_desc');
  cell1.setAttribute('data-item', uniqueId);
  cell1.contentEditable = "true";
  cell1.innerText = "";
  cell.addEventListener('input', () => saveSkills(cell));


  // Кнопка удаления строки
  const deleteCell = newRow.insertCell();
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Удалить";
  deleteBtn.onclick = function () {
    table.deleteRow(newRow.rowIndex - 1);
    saveSkills();
  };
  deleteCell.appendChild(deleteBtn);
  
  saveSkills();
}