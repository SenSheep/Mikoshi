import { saveSkills } from './api.js';
import { cyberModCatalog } from './cyberware.js'

// 
export function showModOptions(target) {
  const normalizedTarget = normalizeTarget(target);
  const modList = cyberModCatalog[normalizedTarget] || [];
  const container = document.getElementById('modOptionsContainer');
  const hum = document.querySelector('.max_hum')
  container.innerHTML = "";

  modList.forEach(mod => {
    const div = document.createElement('div');
    div.className = "mod-option";
    div.innerHTML = `
      <strong>${mod.name}</strong><br>
      💰 Price: ${mod.cost} | 🧠 HL: ${mod.hl} | 📍 ${mod.slot}<br>
      <em>${mod.desc}</em>
    `;
    div.addEventListener('click', () => {
      addModification(target, mod.name, mod.desc);
      document.getElementById("modalOverlayCyber").style.display = "none";
      hum.value = Number(hum.value) - 1;
      saveSkills();
    });
    container.appendChild(div);
  });
}

export function addModification(targetId, modName, modDesc) {
  const modList = document.querySelector(`.mod-list[data-for="${targetId}"]`);
  const hum = document.querySelector('.max_hum')
  if (!modList) return;

  const modDiv = document.createElement('div');
  modDiv.classList.add('mod');
  modDiv.innerHTML = `
    <h4>${modName} <button class="remove-mod">✖</button></h4>
    <p>${modDesc}</p>
  `;
  modDiv.querySelector('.remove-mod').addEventListener('click', () => {
    modDiv.remove();
    hum.value = Number(hum.value) + 1;
    saveSkills();
  });
  modList.appendChild(modDiv);
}

export function initCyberwareToggles() {
  const humInput = document.querySelector('.max_hum');
  if (!humInput) return;

  document.querySelectorAll('.cyberware-block .cybertoggle').forEach(toggle => {
    toggle.addEventListener('change', () => {
      const hl = 1; // постоянное значение урона по человечности
      let currentHum = parseInt(humInput.value) || 0;

      if (toggle.checked) {
        currentHum -= hl;
      } else {
        currentHum += hl;
      }

      humInput.value = currentHum;
      saveSkills(); // сохраняем новое значение
    });
  });
}

export function normalizeTarget(target) {
  return target.replace(/_left|_right/, '');
}