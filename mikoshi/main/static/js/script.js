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
  const role_level = document.querySelector('.role_level').value;


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
      role_level: role_level
      
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
    document.querySelectorAll(".level, .mod, .stat, .armor, .name, .real_hp, .item_name, .item_desc, .role_level").forEach(input => {
      input.addEventListener("input", () => {
        updateSkillStats();
        saveSkills(); // автоматическое сохранение при любом изменении
        showRoleDesc()
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
        const role_choice = data.role_choice;
        const hp = data.hp;
        const role_level = data.role_level;
        
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
        const hidden = document.getElementById('roleHiddenInput')
        const roleInput = document.querySelector(`.role-choice`);
        if (hidden) hidden.value = role ?? '';
        if (roleInput) roleInput.value = role_choice ?? '';

        const role_levelField = document.getElementById("role_level");
        if (role_levelField) role_levelField.value = role_level ?? '';
        showRoleDesc()

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

// Загрузка описания роли
function showRoleDesc() {
  const role = document.querySelector('.role').value;
  const rolelevel = parseInt(document.getElementById('role_level').value, 10) || 0;
  const roleDescField = document.getElementById('solorole')
  roleDescField.innerHTML = ''

  if (role === 'rocker') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 8) {
      const desc = rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 9) {
      const desc = rockerLevels["9"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 10) {
      const desc = rockerLevels["10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'solo') {
    roleDescField.innerHTML = `
      <div id="soloAbilities">
      <h3>Боевое чутье</h3>
      <p>Доступно очков: <span id="availablePoints"></span></p>
    
      <div class="ability-block" data-ability="deflection">
        <h4>▶ Отражение урона: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    
      <div class="ability-block" data-ability="initiative">
        <h4>▶ Личная инициатива: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    
      <div class="ability-block" data-ability="accuracy">
        <h4>▶ Точная атака: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>

      <div class="ability-block" data-ability="nofail">
        <h4>▶ Умелое обращение: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>

      <div class="ability-block" data-ability="findweak">
        <h4>▶ Выявление слабостей: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>

      <div class="ability-block" data-ability="percept">
        <h4>▶ Обнаружение угроз: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    
      <!-- Добавь другие способности по аналогии -->
    </div>
    `
    const availablePointsSpan = document.getElementById('availablePoints');
    let maxPoints = rolelevel;
    availablePointsSpan.textContent = maxPoints;

    document.querySelectorAll(".ability-block").forEach(block => {
      const plus = block.querySelector(".plus");
      const minus = block.querySelector(".minus");
      const pointsSpan = block.querySelector(".points");
      const effectText = block.querySelector(".effect-text");

      plus.addEventListener("click", () => {
        let current = parseInt(pointsSpan.textContent);
        if (maxPoints > 0) {
          current++;
          maxPoints--;
          pointsSpan.textContent = current;
          updateEffect(block.dataset.ability, current, effectText);
        }
        availablePointsSpan.textContent = maxPoints;
      });

      minus.addEventListener("click", () => {
        let current = parseInt(pointsSpan.textContent);
        if (current > 0) {
          current--;
          maxPoints++;
          pointsSpan.textContent = current;
          updateEffect(block.dataset.ability, current, effectText);
        }
        availablePointsSpan.textContent = maxPoints;
      });
    });

    function updateEffect(ability, points, el) {
      switch (ability) {
        case "deflection":
          const reduction = Math.floor(points / 2);
          if (points > 0) el.textContent = `Снижает первый урон в раунде на ${reduction}`;
          else el.textContent = `Нет бонуса`;
          break;
        case "initiative":
          if (points > 0) el.textContent = `+${points} к инициативе`;
          else el.textContent = `Нет бонуса`;
          break;
        case "accuracy":
          if (points >= 9) el.textContent = `+3 к попаданию`;
          else if (points >= 6) el.textContent = `+2 к попаданию`;
          else if (points >= 3) el.textContent = `+1 к попаданию`;
          else el.textContent = `Нет бонуса`;
          break;
        case "nofail":
          if (points >= 4) el.textContent = "Игнорирование критических провалов во время атак";
          else el.textContent = "Нет бонуса";
          break;
        case "findweak":
          if (points > 0) el.textContent = `+${points} к урону (до брони) для первой успешной атаки`;
          else el.textContent = `Нет бонуса`;
          break;
        case "percept":
          if (points > 0) el.textContent = `+${points} к внимательности`;
          else el.textContent = `Нет бонуса`;
          break;
        // Добавь остальные способности аналогично
      }
    }
  }

  if (role === 'netrunner') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 7) {
      const desc = rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 9 && rolelevel <= 10) {
      const desc = rockerLevels["9-10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'technie') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 7) {
      const desc = rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 9 && rolelevel <= 10) {
      const desc = rockerLevels["9-10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'medtech') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 7) {
      const desc = rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 9 && rolelevel <= 10) {
      const desc = rockerLevels["9-10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'media') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 7) {
      const desc = rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 9 && rolelevel <= 10) {
      const desc = rockerLevels["9-10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'corporate') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 7) {
      const desc = rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 9 && rolelevel <= 10) {
      const desc = rockerLevels["9-10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'lawman') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 7) {
      const desc = rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 9 && rolelevel <= 10) {
      const desc = rockerLevels["9-10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'fixer') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 7) {
      const desc = rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 9 && rolelevel <= 10) {
      const desc = rockerLevels["9-10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'nomad') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 7) {
      const desc = rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 9 && rolelevel <= 10) {
      const desc = rockerLevels["9-10"];
      roleDescField.innerHTML = desc
    }
  }
}