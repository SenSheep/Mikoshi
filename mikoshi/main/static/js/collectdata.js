function collectSkills() {
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
  }
  
function collectStats() {
    const statMap = {};
    document.querySelectorAll('.stat').forEach(input => {
      const key = input.dataset.stat; // "int", "ref" и т.д.
      statMap[key] = parseInt(input.value || "0", 10);
    });
    return statMap;
}

function collectPoints() {
  const statPoints = {}
  document.querySelectorAll(".ability-block").forEach(block => {
    const ability = block.dataset.ability;
    const pointsSpan = block.querySelector(".points");
    statPoints[ability] = parseInt(pointsSpan.innerText || "0", 10);
  });
  return statPoints;
};

function collectDrugs() {
  const drugSelections = [];
  const drugForms = document.querySelectorAll(".drug-form");


  drugForms.forEach(form => {
    const select = form.querySelector(".drug-dropdown");
    const selectedDrug = select.value;
    drugSelections.push(selectedDrug);
  });
  return drugSelections;
}

function collectPointsPlusDrugs() {
  const skillsData = collectPoints();  // вызываешь updatePoints(), если нужно
  const collectedDrugs = collectDrugs();
  skillsData['drugs'] = collectedDrugs;
  return skillsData;
}
  
function collectArmor() {
    const armorMap = {};
    document.querySelectorAll('.armor').forEach(input => {
      const key = input.dataset.armor; // "head", "body", "shield"
      armorMap[key] = parseInt(input.value || "0", 10);
    });
    return armorMap;
}

function collectInventory() {
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

  return inventoryMap;
}

function collectCyberware() {
  const data = {};

  document.querySelectorAll('.cyberware-block').forEach(block => {
    const type = block.getAttribute('data-type');
    const shortType = type.replace('cyber', '');
    const checkbox = block.querySelector('.main-toggle');

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
}

