import * as collectData from './collectdata.js';
import { loadInventory } from './inventory.js';
import { showRoleDesc } from './roles.js';
import { cyberModCatalog } from './cyberware.js';
import { addModification } from './cybercat.js';

export function saveSkills() {
  console.log('Saving skills...');

  const charId = document.body.dataset.charId;
  const skillsData = collectData.collectSkills() || 0;
  const statsData = collectData.collectStats();
  const armorData = collectData.collectArmor();
  const inventory = collectData.collectInventory();
  const name = document.querySelector('.name').value;
  const role = document.querySelector('.role').value;
  const hp = document.querySelector('.real_hp').value || 0;
  const hum = document.querySelector('.real_hum').value || 0;
  const role_level = document.querySelector('.role_level').value;
  const ability = collectData.collectPointsPlusDrugs() || {};
  const cyberware = collectData.collectCyberware() || [];


  fetch('/api/save-char/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      char_id: charId,  // ID персонажа
      skills: skillsData,
      stats: statsData,
      armor: armorData,
      name: name,
      role: role,
      hp: hp,
      inventory: inventory,
      role_level: role_level,
      ability: ability,
      hum: hum,
      cyberware: cyberware,      
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'ok') {
    } else {
      alert("Error: " + data.message);
    }
  });
}

export async function loadSkills() {
  const charId = document.body.dataset.charId;
  console.log('Loading skills for character ID:', charId);

  try {
    const res = await fetch(`/api/get-char-skills/${charId}/`);
    const data = await res.json();

    if (data.status !== "ok") {
      console.error("Не удалось загрузить навыки:", data.message);
      return;
    }

    const skills = data.skills;
    const stats = data.stats;
    const armor = data.armor;
    const name = data.name;
    const role = data.role;
    const role_choice = data.role_choice;
    const hp = data.hp;
    const role_level = data.role_level;   
    const hum = data.hum;
    const cyberware = data.cyberware || [];

    let minusHum = 0;

    // ИНВЕНТАРЬ
    loadInventory(data.inventory)

    // СТАТЫ
    for (const [statName, value1] of Object.entries(stats)) {
      const statInput = document.querySelector(`.stat[data-stat="${statName}"]`);
      if (statInput) statInput.value = value1 ?? 0;
    }

    // СКИЛЛЫ
    for (const [skillName, values2] of Object.entries(skills)) {
      const levelInput = document.querySelector(`.level[data-skill="${skillName}"]`);
      const modInput = document.querySelector(`.mod[data-skill="${skillName}"]`);
      if (levelInput) levelInput.value = values2.level ?? 0;
      if (modInput) modInput.value = values2.mod ?? 0;
    }

    // БРОНЯ
    for (const [armorName, value3] of Object.entries(armor)) {
      const armorInput = document.querySelector(`.armor[data-armor="${armorName}"]`);
      if (armorInput) armorInput.value = value3 ?? 0;
    }

    // ИМЯ
    const nameInput = document.querySelector(`.name`);
    if (nameInput) nameInput.value = name ?? '';

    // РОЛЬ
    const hidden = document.getElementById('roleHiddenInput');
    const roleInput = document.querySelector(`.role-choice`);
    if (hidden) hidden.value = role ?? '';
    if (roleInput) roleInput.value = role_choice ?? '';

    const role_levelField = document.getElementById("role_level");
    if (role_levelField) role_levelField.value = role_level ?? '';

    showRoleDesc();

    // REAL HP
    const hpInput = document.querySelector(`.real_hp`);
    if (hpInput) hpInput.value = hp ?? 0;

    // REAL HUM 
    const humInput = document.querySelector(`.real_hum`);
    if (humInput) humInput.value = hum ?? 0;

    // КИБЕРВЕАР
    for (const [type, info] of Object.entries(cyberware)) {
      const block = document.querySelector(`.cyberware-block[data-type="${type}"]`);
      if (!block) continue;

      const checkbox = block.querySelector('.cybertoggle');
      if (checkbox) {
        checkbox.checked = info.status;
        if (checkbox.checked) minusHum++;
      }

      const modList = block.querySelector(`.mod-list[data-for="${type.replace('cyber', '')}"]`);
      if (!modList) continue;
      modList.innerHTML = "";

      for (const modRef of info.mods || []) {
        const modcyberware = (cyberModCatalog[type.replace('cyber', '')] || []).find(m => m.id === modRef.id);
        if (modcyberware) {
          minusHum++;
          addModification(type.replace('cyber', ''), modcyberware.name, modcyberware.desc);
        }
      }
    }
    const minusHumField = document.querySelector('.minus_hum')
    minusHumField.value = minusHum;

  } catch (err) {
    console.error("Ошибка запроса:", err);
  }
}
