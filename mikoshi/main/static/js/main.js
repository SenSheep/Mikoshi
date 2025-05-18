import { update } from "./stats.js";
import { saveSkills, loadSkills } from "./api.js";
import { addRowInv } from "./inventory.js";
import { showRoleDesc } from "./roles.js";
import { toggleRoleEdit, closeRoleEdit, openDamageModal, closeDamageModal } from "./modals.js";
import { getDamage, getHeal, getHum, getDamageHum } from "./damage.js";
import { showModOptions, initCyberwareToggles } from './cybercat.js';

// document.addEventListener("DOMContentLoaded", function () {
//   // Обработчики для полей ввода
//   document.querySelectorAll(".level, .mod, .stat, .armor, .name, .real_hp, .role_level, .real_hum")
//     .forEach(input => {
//       input.addEventListener("input", () => {
//         updateSkillStats();
//         saveSkills();
//         showRoleDesc();
//       });
//     });
//.level, .mod, .stat, .armor, .name, .real_hp, .role_level, .real_hum

document.addEventListener("DOMContentLoaded", async function () {
  // Обработчик для кнопки "Сохранить"
  window.addRowInv = addRowInv;

  // Загрузка данных при загрузке страницы
  await loadSkills();
  update();

  // Обновление полей LVL, MOD, STAT, SUM при изменении значений
  // + Сохранение изменений
  document.querySelectorAll(".level, .mod, .stat")
    .forEach(input => {
      input.addEventListener("input", () => {
        saveSkills();
        update();
      });
    });

  // Сохранение изменений в инвентаре
  const table = document.getElementById('inventory_table');
  table.addEventListener('focusout', (event) => {
    const target = event.target;
    if (target.classList.contains('item_name') || target.classList.contains('item_desc')) {
      saveSkills();
    }
  });

  // Показать описание роли при изменении уровня
  // + Сохранение изменений
  document.querySelectorAll(".role_level")
    .forEach(input => {
      input.addEventListener("input", () => {
        showRoleDesc();
        saveSkills();
      });
    });

  // Переключение между вкладками
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

  // --- Модалка смены роли ---
  window.toggleRoleEdit = toggleRoleEdit;
  window.closeRoleEdit = closeRoleEdit;
  document.getElementById("modalOverlayRole").addEventListener("click", function (e) {
    if (e.target === this) this.style.display = "none";
  });
  document.querySelectorAll('input[name="role-choice"]').forEach(radio => {
    radio.addEventListener('change', function () {
      const selectedValue = this.value;
      const selectedText = this.closest('.role-card').querySelector('h3').innerText;

      // Сохраняем реальное значение для отправки формы
      document.getElementById("roleHiddenInput").value = selectedValue;

      // Отображаем выбранную роль в input
      document.getElementById("roleInput").value = selectedText;

      document.getElementById("modalOverlayRole").style.display = "none";

      showRoleDesc();
      saveSkills();
    });
  });

  // --- Модалка для урона ---
  window.openDamageModal = openDamageModal;
  window.closeDamageModal = closeDamageModal;
  document.getElementById("modalOverlayDamage").addEventListener("click", function (e) {
    if (e.target === this) this.style.display = "none";
  });

  window.getDamage = getDamage;
  window.getHeal = getHeal;
  window.getHum = getHum;
  window.getDamageHum = getDamageHum;

  // --- Модалка для киберимплантов ---
  // Кнопки "Добавить мод"
  let currentCyberTarget = null;
  document.querySelectorAll('.add-mod').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      currentCyberTarget = target;
      showModOptions(target);
      document.getElementById('modalOverlayCyber').style.display = 'flex';
    });
  });

  // Закрытие модалки
  document.getElementById("closeModModal").addEventListener("click", () => {
    update(); // или updateSkillStats();
    document.getElementById("modalOverlayCyber").style.display = "none";
  });

  // Закрытие по клику на фон
  const overlay = document.getElementById("modalOverlayCyber");
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === this) this.style.display = "none";
    });
  }

  initCyberwareToggles();
  // Обработчик для переключателей киберимплантов
});