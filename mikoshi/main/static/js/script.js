function updateSkillStats() {
  const statInputs = document.querySelectorAll('.stat');
  const statMap = {};

  // Собираем значения всех статов в объект
  statInputs.forEach(input => {
    const key = input.dataset.stat; // например, "int"
    statMap[key] = parseInt(input.value || 0, 10);
  });

  // Получаем максимальное hp
  let sbody = statMap['body']
  let swill = statMap['will'] 
  let max_hp = 10 + (5 * Math.ceil((swill + sbody) /2))

  const maxHpField = document.querySelector('.max_hp');
  if (maxHpField) {
    maxHpField.value = max_hp;
  }

  // Обновляем все поля скиллов
  document.querySelectorAll('.stat-from').forEach(skillStatInput => {
    const from = skillStatInput.dataset.from; // например, "int"
    const value = statMap[from] || 0;
    skillStatInput.value = value;

    // Обновляем сумму
    const row = skillStatInput.closest("tr");
    const level = parseInt(row.querySelector(".level")?.value || 0, 10);
    const mod = parseInt(row.querySelector(".mod")?.value || 0, 10);
    const sumField = row.querySelector(".sum");
    if (sumField) {
      sumField.value = level + value + mod;
    }
}) 
}

// СОХРАНЕНИЕ ДАННЫХ
function saveSkills() {
  const charId = document.body.dataset.charId;
  const skillsData = collectSkills() || 0;
  const statsData = collectStats();
  const armorData = collectArmor();
  const inventory = collectInventory();
  const name = document.querySelector('.name').value;
  const role = document.querySelector('.role').value;
  const hp = document.querySelector('.real_hp').value;


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
      inventory, inventory,
      
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

document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('inventory_table');

  table.addEventListener('focusout', (event) => {
    const target = event.target;
    if (target.classList.contains('item_name') || target.classList.contains('item_desc')) {
      saveSkills();  // или saveInventory()
    }
  });
});

// Автоматический расчет значений
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".level, .mod, .stat, .armor, .name, .role, .real_hp, .item_name, .item_desc").forEach(input => {
      input.addEventListener("input", () => {
        updateSkillStats();
        saveSkills(); // автоматическое сохранение при любом изменении
      });
    });
  });

// начальное отображение сохраненный данных
document.addEventListener("DOMContentLoaded", function () {
  const charId = document.body.dataset.charId;

  fetch(`/api/get-char-skills/${charId}/`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        const skills = data.skills;
        const stats = data.stats;
        const armor = data.armor;
        const name = data.name;
        const role = data.role;
        const hp = data.hp;
        
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
        const roleInput = document.querySelector(`.role`);
        if (roleInput) roleInput.value = role ?? '';

        // REAL HP
        const hpInput = document.querySelector(`.real_hp`);
        if (hpInput) hpInput.value = hp ?? 0;

      } else {
        console.error("Не удалось загрузить навыки:", data.message);
      }
      updateSkillStats()
    })
    .catch(err => {
      console.error("Ошибка запроса:", err);
    });
});

