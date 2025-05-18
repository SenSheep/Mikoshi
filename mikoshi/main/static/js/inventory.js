import { saveSkills } from "./api.js";

export function addRowInv() {
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
  cell.addEventListener('focusout', () => saveSkills(cell));

  const cell1 = newRow.insertCell();
  cell1.classList.add('item_desc');
  cell1.setAttribute('data-item', uniqueId);
  cell1.contentEditable = "true";
  cell1.innerText = "";
  cell1.addEventListener('focusout', () => saveSkills(cell1));


  // Кнопка удаления строки
  const deleteCell = newRow.insertCell();
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Удалить";
  deleteBtn.onclick = function () {
    console.log("Удаление предмета");
    saveSkills();
    table.deleteRow(newRow.rowIndex - 1);
  };
  deleteCell.appendChild(deleteBtn);
  
  saveSkills();
}

export function loadInventory(inventoryData) {
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
      console.log("Удаление предмета");
      tableBody.deleteRow(newRow.rowIndex - 1);
      saveSkills();
    };
    deleteCell.appendChild(deleteBtn);

    const numericId = parseInt(itemId.split('_')[1], 10);
    if (!isNaN(numericId) && numericId >= maxId) {
      maxId = numericId + 1;
    }
  }

  document.getElementById("itemCounter").value = maxId;
}