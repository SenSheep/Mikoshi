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
  let max_hp = swill + sbody

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

function collectSkills() {
  const skills = {};

  document.querySelectorAll('.level').forEach(input => {
    const skill = input.dataset.skill;
    if (!skills[skill]) skills[skill] = {};
    skills[skill].level = parseInt(input.value || 0, 10);
  });

  document.querySelectorAll('.mod').forEach(input => {
    const skill = input.dataset.skill;
    if (!skills[skill]) skills[skill] = {};
    skills[skill].mod = parseInt(input.value || 0, 10);
  });

  return skills;
}

function collectStats() {
  const statMap = {};
    document.querySelectorAll('.stat').forEach(input => {
    const key = input.dataset.stat; // "int", "ref" и т.д.
    statMap[key] = parseInt(input.value || "0", 10);
});

  return statMap;
}

function collectArmor() {
  const armorMap = {};
    document.querySelectorAll('.armor').forEach(input => {
    const key = input.dataset.armor; // "head", "body", "shield"
    armorMap[key] = parseInt(input.value || "0", 10);
});
  return armorMap;
}

function saveSkills() {
  const charId = document.body.dataset.charId;
  const skillsData = collectSkills();
  const statsData = collectStats();
  const armorData = collectArmor();

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

function getDamage() {
  const realHpField = document.querySelector('.real_hp');
  const armor_bodyField = document.querySelector('input.armor[data-armor="body"]');
  const damageField = document.querySelector('.damage');

  const realHp = parseInt(realHpField.value, 10);
  const armor_body = parseInt(armor_bodyField.value, 10);
  const damage = parseInt(damageField.value, 10);

  if (damage - armor_body < 0) {
    return alert("Не пробил");
  }
  const real_damage = realHp - (damage - armor_body);
  realHpField.value = real_damage;
  armor_bodyField.value = armor_body - 1;
}

// Автоматический расчет значений
document.addEventListener("DOMContentLoaded", function () {
    // Обновление суммы при изменении level или mod или stat
    document.querySelectorAll(".level, .mod, .stat, .armor").forEach(input => {
      input.addEventListener("input", () => {
        updateSkillStats();
        saveSkills(); // автоматическое сохранение при любом изменении
      });
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  const charId = document.body.dataset.charId;

  fetch(`/api/get-char-skills/${charId}/`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        const skills = data.skills;
        const stats = data.stats
        const armor = data.armor

        for (const [statName, value1] of Object.entries(stats)) {
          const statInput = document.querySelector(`.stat[data-stat="${statName}"]`);

          if (statInput) statInput.value = value1 ?? 0;
        }


        for (const [skillName, values2] of Object.entries(skills)) {
          const levelInput = document.querySelector(`.level[data-skill="${skillName}"]`);
          const modInput = document.querySelector(`.mod[data-skill="${skillName}"]`);

          if (levelInput) levelInput.value = values2.level ?? 0;
          if (modInput) modInput.value = values2.mod ?? 0;
        }

        for (const [armorName, value3] of Object.entries(armor)) {
          const armorInput = document.querySelector(`.armor[data-armor="${armorName}"]`);

          if (armorInput) armorInput.value = value3 ?? 0;
        }

      } else {
        console.error("Не удалось загрузить навыки:", data.message);
      }
      updateSkillStats()
    })
    .catch(err => {
      console.error("Ошибка запроса:", err);
    });
});