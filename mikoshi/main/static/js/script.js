// Автоматический расчет значений
document.addEventListener("DOMContentLoaded", function () {
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
  
    // Обновление суммы при изменении level или mod
    document.querySelectorAll(".level, .mod, .stat").forEach(input => {
      input.addEventListener("input", updateSkillStats);
    });
  });
  
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

  function saveSkills() {
    const charId = document.body.dataset.charId;
    const skillsData = collectSkills();
    const statsData = collectStats();

    fetch('/api/save-char/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        char_id: charId,  // ID персонажа
        skills: skillsData,
        stats: statsData
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        alert("Skills saved!");
      } else {
        alert("Error: " + data.message);
      }
    });
  }

document.addEventListener("DOMContentLoaded", function () {
  const charId = document.body.dataset.charId;

  fetch(`/api/get-char-skills/${charId}/`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        const skills = data.skills;

        for (const [skillName, values] of Object.entries(skills)) {
          const levelInput = document.querySelector(`.level[data-skill="${skillName}"]`);
          const modInput = document.querySelector(`.mod[data-skill="${skillName}"]`);

          if (levelInput) levelInput.value = values.level ?? 0;
          if (modInput) modInput.value = values.mod ?? 0;
        }
      } else {
        console.error("Не удалось загрузить навыки:", data.message);
      }
    })
    .catch(err => {
      console.error("Ошибка запроса:", err);
    });
});