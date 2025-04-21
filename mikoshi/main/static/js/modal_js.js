// --- Модалка урона / HP ---
document.getElementById("openModalBtn").addEventListener("click", () => {
  document.getElementById("modalOverlayDamage").style.display = "flex";
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("modalOverlayDamage").style.display = "none";
});

document.getElementById("modalOverlayDamage").addEventListener("click", function (e) {
  if (e.target === this) this.style.display = "none";
});

// Получение урона + эффекты урона
function getDamage() {
  const realHpField = document.querySelector('.real_hp');
  const armor_bodyField = document.querySelector('input.armor[data-armor="body"]');
  const damageField = document.querySelector('.damage');

  const piercing = document.querySelector('input.damageEffect[data-type="piercing"]'); //Бронебойные
  const through = document.querySelector('input.damageEffect[data-type="through"]'); //Сквозь броню
  const piercingless = document.querySelector('input.damageEffect[data-type="piercingless"]'); //Игнор 1\2 брони
  const realHp = parseInt(realHpField.value, 10);
  const armor_body = parseInt(armor_bodyField.value, 10);
  const damage = parseInt(damageField.value, 10);

  //Игнор 1\2 брони
  if (piercingless.checked) {
    if (damage - Math.ceil(armor_body / 2) < 0) {
      return alert("Не пробил");
    }
    const real_damage = realHp - (damage - Math.ceil(armor_body / 2));
    realHpField.value = real_damage;
    if (piercing.checked) { //Бронебойные
      armor_bodyField.value = armor_body - 2;
    }
    else {
      armor_bodyField.value = armor_body - 1;
    }
    return;
  }

  //Сквозь броню
  if (through.checked) {
    const real_damage = realHp - damage;
    realHpField.value = real_damage;
    if (piercing.checked) { //Бронебойные
      armor_bodyField.value = armor_body - 2;
    }
    else {
      armor_bodyField.value = armor_body - 1;
    }
    return;
  }

  // Обычные
  if (damage - armor_body < 0) {
    return alert("Не пробил");
  }
  const real_damage = realHp - (damage - armor_body);
  realHpField.value = real_damage;
  if (piercing.checked) { //Бронебойные
    armor_bodyField.value = armor_body - 2;
  }
  else {
    armor_bodyField.value = armor_body - 1;
  }
  return;
}

// --- Модалка для киберимплантов ---
// Данные по имплантам находятся в файле cyber.js
const cyberModCatalog = {
    eye: [
      {
        name: "Thermal Vision",
        cost: 500,
        hl: 2,
        slot: "Cybereye",
        desc: "Позволяет видеть тепловые сигнатуры в полной темноте."
      },
      {
        name: "Targeting Scope",
        cost: 750,
        hl: 3,
        slot: "Cybereye",
        desc: "Добавляет прицеливание с автофиксацией цели."
      }
    ],
    audio: [
      {
        name: "Amplified Hearing",
        cost: 300,
        hl: 1,
        slot: "Cyberaudio",
        desc: "Повышенная чувствительность слуха, слышит шёпот сквозь стены."
      },
      {
        name: "Radio Receiver",
        cost: 450,
        hl: 2,
        slot: "Cyberaudio",
        desc: "Позволяет принимать радиопередачи напрямую в мозг."
      }
    ]
  };


let currentCyberTarget = null;

document.querySelectorAll('.add-mod').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    currentCyberTarget = target;
    showModOptions(target);
    document.getElementById('modalOverlayCyber').style.display = 'flex';
  });
});

// ЗАГРУЖАЕМ МОДЫ
function showModOptions(target) {
  const modList = cyberModCatalog[target] || [];
  const container = document.getElementById('modOptionsContainer');
  container.innerHTML = "";

  modList.forEach(mod => {
    const div = document.createElement('div');
    div.className = "mod-option";
    div.innerHTML = `
      <strong>${mod.name}</strong><br>
      💰 ${mod.cost} eb | 🧠 HL: ${mod.hl} | 📍 ${mod.slot}<br>
      <em>${mod.desc}</em>
    `;
    div.addEventListener('click', () => {
      addModification(target, mod.name);
      closeModModal();
    });
    container.appendChild(div);
  });
}

// Универсальная функция добавления
function addModification(targetId, modName) {
  const modList = document.querySelector(`.mod-list[data-for="${targetId}"]`);
  if (!modList) return;

  const modDiv = document.createElement('div');
  modDiv.classList.add('mod');
  modDiv.innerHTML = `
    <span>${modName}</span>
    <button class="remove-mod">✖</button>
  `;
  modDiv.querySelector('.remove-mod').addEventListener('click', () => {
    modDiv.remove();
  });
  modList.appendChild(modDiv);
}

document.getElementById("closeModModal").addEventListener("click", () => {
  document.getElementById("modalOverlayCyber").style.display = "none";
});

document.getElementById("modalOverlayCyber").addEventListener("click", function (e) {
  if (e.target === this) this.style.display = "none";
});