import { saveSkills } from './api.js';
import { update } from './stats.js';
import { cyberModCatalog } from './cyberware.js'

export function showModOptions(target) {
  const modList = cyberModCatalog[target] || [];
  const container = document.getElementById('modOptionsContainer');
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
      saveSkills();
    });
    container.appendChild(div);
  });
}

export function addModification(targetId, modName, modDesc) {
  const modList = document.querySelector(`.mod-list[data-for="${targetId}"]`);
  if (!modList) return;

  const modDiv = document.createElement('div');
  modDiv.classList.add('mod');
  modDiv.innerHTML = `
    <h4>${modName} <button class="remove-mod">✖</button></h4>
    <p>${modDesc}</p>
  `;
  modDiv.querySelector('.remove-mod').addEventListener('click', () => {
    modDiv.remove();
    const humInput = document.querySelector('.real_hum');
    if (humInput) humInput.value = parseInt(humInput.value) + 1;
    saveSkills();
  });
  modList.appendChild(modDiv);
}
