// --- Модалка смены роли ---
export function toggleRoleEdit() {
  document.getElementById("modalOverlayRole").style.display = "flex";
}
export function closeRoleEdit() {
  document.getElementById("modalOverlayRole").style.display = "none";
}

// --- Модалка для урона ---
export function openDamageModal() {
  document.getElementById("modalOverlayDamage").style.display = "flex";
}
export function closeDamageModal() {
  document.getElementById("modalOverlayDamage").style.display = "none";
}

// --- Модалка для киберимплантов ---
