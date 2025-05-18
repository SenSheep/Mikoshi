import { cyberModCatalog } from './cyberware.js';

export function collectSkills() {
    const skillsMap = {};
  
    document.querySelectorAll('.level').forEach(input => {
      const skill = input.dataset.skill;
      if (!skillsMap[skill]) skillsMap[skill] = {};
      skillsMap[skill].level = parseInt(input.value || 0, 10);
    });
  
    document.querySelectorAll('.mod').forEach(input => {
      const skill = input.dataset.skill;
      if (!skillsMap[skill]) skillsMap[skill] = {};
      skillsMap[skill].mod = parseInt(input.value || 0, 10);
    });
  
    return skillsMap;
} // Output: {"concetration": {"level": 2, "mod": 0}, "athletics": {"level": 3, "mod": 0}, ...}
  
export function collectStats() {
    const statMap = {};
    document.querySelectorAll('.stat').forEach(input => {
      const key = input.dataset.stat; // "int", "ref" и т.д.
      statMap[key] = parseInt(input.value || "0", 10);
    });
    return statMap;
} // Output: {"int": 6, "ref": 5, "tech": 4, ...}

export function collectPoints() {
  const statPoints = {}
  document.querySelectorAll(".ability-block").forEach(block => {
    const ability = block.dataset.ability;
    const pointsSpan = block.querySelector(".points");
    statPoints[ability] = parseInt(pointsSpan.innerText || "0", 10);
  });
  return statPoints;
}; // Output: {"abilitiry_1": 2, "abilitiry_2": 0, ...}

export function collectDrugs() {
  const drugSelections = [];
  const drugForms = document.querySelectorAll(".drug-form");


  drugForms.forEach(form => {
    const select = form.querySelector(".drug-dropdown");
    const selectedDrug = select.value;
    drugSelections.push(selectedDrug);
  });
  return drugSelections;
} // Output: ["drug_1", "drug_2", ...]

export function collectPointsPlusDrugs() {
  const skillsData = collectPoints();  // вызываешь updatePoints(), если нужно
  const collectedDrugs = collectDrugs();
  skillsData['drugs'] = collectedDrugs;
  return skillsData;
} // Output: {"abilitiry_1": 2, "abilitiry_2": 0, ..., "drugs": ["drug_1", "drug_2", ...]}
  
export function collectArmor() {
    const armorMap = {};
    document.querySelectorAll('.armor').forEach(input => {
      const key = input.dataset.armor; // "head", "body", "shield"
      armorMap[key] = parseInt(input.value || "0", 10);
    });
    return armorMap;
} // Output: {"head": 2, "body": 3, "shield": 1, ...}

export function collectInventory() {
  const inventoryMap = {};

  document.querySelectorAll('.item_name').forEach(cell => {
    const item = cell.dataset.item;
    if (!inventoryMap[item]) inventoryMap[item] = {};
    inventoryMap[item].item_name = cell.innerText || "";
  });

  document.querySelectorAll('.item_desc').forEach(cell => {
    const item = cell.dataset.item;
    if (!inventoryMap[item]) inventoryMap[item] = {};
    inventoryMap[item].item_desc = cell.innerText || "";
  });

  const itemCounterInput = document.getElementById("itemCounter");
  itemCounterInput.value = Object.keys(inventoryMap).length;

  return inventoryMap;
} // Output: {"item_1": {"item_name": "name_1", "item_desc": "desc_1"}, "item_2": {"item_name": "name_2", "item_desc": "desc_2"}, ...}

export function collectCyberware() {
  const data = {};

  document.querySelectorAll('.cyberware-block').forEach(block => {
    const type = block.getAttribute('data-type');
    const shortType = type.replace('cyber', '');
    const checkbox = block.querySelector('.cybertoggle');

    const mods = [];
    block.querySelectorAll('.mod-list .mod').forEach(modDiv => {
      const name = modDiv.querySelector('h4')?.childNodes[0]?.nodeValue.trim();
      if (name) {
        // Поиск ID по имени из каталога
        const catalogMods = cyberModCatalog[shortType] || [];
        const modObj = catalogMods.find(mod => mod.name === name);
        if (modObj && modObj.id) {
          mods.push({ id: modObj.id });
        } else {
          console.warn(`Модификация "${name}" не найдена в каталоге ${shortType}`);
        }
      }
    });

    data[type] = {
      status: checkbox?.checked || false,
      mods: mods
    };
  });
  return data;
} // Output: {"cyberware_1": {"status": true, "mods": [{"id": 1}, {"id": 2}]}, "cyberware_2": {"status": false, "mods": [{"id": 3}]}, ...}
