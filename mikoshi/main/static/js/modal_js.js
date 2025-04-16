// Скрипты для модального окна
// Открытие МО через кнопку
document.getElementById("openModalBtn").addEventListener("click", function () {
    document.getElementById("modalOverlay").style.display = "flex";
  });

// Закрытие после использование МО
document.getElementById("closeModalBtn").addEventListener("click", function () {
  document.getElementById("modalOverlay").style.display = "none";
});

// Закрытие по клику вне окна
document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) {
    this.style.display = "none";
  }
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