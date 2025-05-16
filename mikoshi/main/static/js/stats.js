import {collectStats} from './collectdata.js';

export function update(){
  const statsMap = collectStats();
  const minusHum = parseInt(document.querySelector('.minus_hum')?.value || 0, 10);
  updateHealth(statsMap.body, statsMap.will);
  updateHumanity(statsMap.emp, minusHum);
  updateSkillStats(statsMap);
}

// Вычисление Пунктов Здоровья
function updateHealth(body = 0, will = 0) {
  let max_hp = 10 + (5 * Math.ceil((will + body) /2))

  const maxHpField = document.querySelector('.max_hp');
  if (maxHpField) {
    maxHpField.value = max_hp;
  }
}

// Вычисление Максимальной человечности
function updateHumanity(emp = 0, minusHum = 0) {
  const maxHum = document.querySelector('.max_hum');
  maxHum.value = (emp * 10) - minusHum;
}

// ПРАВИЛЬНОЕ ОТОБРАЖЕНИЕ СТАТОВ
function updateSkillStats(stat = {}) {
  // Собираем значения всех статов в объект
  const statMap = stat;

  // Обновляем все поля скиллов
  const hum = document.querySelector('.real_hum').value;
  const e = document.querySelector('.new_stat') 
  document.querySelectorAll('.stat-from').forEach(skillStatInput => {
    const from = skillStatInput.dataset.from; // например, "int"
    const value = statMap[from] || 0;
    skillStatInput.value = value;
    if (from === "emp") {
      let h = Math.floor(hum / 10);
      e.value = h;
      skillStatInput.value = h;
    };

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