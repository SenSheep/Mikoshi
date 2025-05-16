import { saveSkills } from "./api.js";


// Получение урона + эффекты урона
export function getDamage() {
  const realHpField = document.querySelector('.real_hp');
  const damageField = document.querySelector('.damage');

  const piercing = document.querySelector('input.damageEffect[data-type="piercing"]'); // Бронебойные
  const through = document.querySelector('input.damageEffect[data-type="through"]');   // Сквозь броню
  const piercingless = document.querySelector('input.damageEffect[data-type="piercingless"]'); // Игнор 1/2 брони

    document.getElementById("modalOverlayDamage").style.display = "none";

  // Получаем выбранную часть тела
  const selectedPart = document.querySelector('.damagePart:checked');
  if (!selectedPart) {
    alert("Выберите место попадания (голова, тело или щит)");
    return;
  }
  const hitLocation = selectedPart.dataset.type;

  const armorField = document.querySelector(`input.armor[data-armor="${hitLocation}"]`);
  if (!armorField) {
    alert("Ошибка: броня для места попадания не найдена");
    return;
  }

  const realHp = parseInt(realHpField.value, 10);
  const armor = parseInt(armorField.value, 10);
  const damage = parseInt(damageField.value, 10);

  if (selectedPart.dataset.type == 'shield') {
    if (armor - damage < 0) {
      armorField.value = 0;
      return;
    }
    armorField.value = (armor - damage);
    return;
  }

  if (isNaN(realHp) || isNaN(armor) || isNaN(damage)) {
    alert("Проверьте значения HP, брони и урона — все должны быть числами");
    return;
  }

  // Игнор 1/2 брони
  if (piercingless.checked) {
    const effectiveArmor = Math.ceil(armor / 2);
    if (damage - effectiveArmor < 0) {
      return alert("Не пробил");
    }
    realHpField.value = realHp - (damage - effectiveArmor);
    if (armor - (piercing.checked ? 2 : 1) < 0) {
      armorField.value = 0;
      return;
    }
    armorField.value = armor - (piercing.checked ? 2 : 1);
    return;
  }

  // Сквозь броню
  if (through.checked) {
    realHpField.value = realHp - damage;
    armorField.value = armor - (piercing.checked ? 2 : 1);
    return;
  }

  // Обычный урон
  if (damage - armor < 0) {
    return alert("Не пробил");
  }
  realHpField.value = realHp - (damage - armor);
  if (armor - (piercing.checked ? 2 : 1) < 0) {
    armorField.value = 0;
    return;
  }
  armorField.value = armor - (piercing.checked ? 2 : 1);
  return;
}

// Лечение
export function getHeal() {
  const realHpField = document.querySelector('.real_hp');
  const healField = document.querySelector('.heal');
  const maxHpField = document.querySelector('.max_hp');

  const maxHp = parseInt(maxHpField.value, 10) || 0;
  const realHp = parseInt(realHpField.value, 10) || 0;
  const heal = parseInt(healField.value, 10) || 0;

      document.getElementById("modalOverlayDamage").style.display = "none";

  if ((realHp + heal) >= maxHp) {
    realHpField.value = maxHp;
    saveSkills();
    return;
  }
  realHpField.value = realHp + heal;
  saveSkills();
}

export function getHum() {
  const realhumField = document.querySelector('.real_hum');
  const humField = document.querySelector('.hum');
  const maxHumField = document.querySelector('.max_hum');

  const maxHum = parseInt(maxHumField.value, 10) || 0;
  const realhum = parseInt(realhumField.value, 10) || 0;
  const hum = parseInt(humField.value, 10) || 0;

    document.getElementById("modalOverlayDamage").style.display = "none";

  if ((realhum + hum) >= maxHum) {
    realhumField.value = maxHum;
    saveSkills();
    return;
  }
  realhumField.value = realhum + hum;
  saveSkills();
}

export function getDamageHum() {
  const realhumField = document.querySelector('.real_hum');
  const humField = document.querySelector('.hum');
  const maxHumField = document.querySelector('.max_hum');

  const maxHum = parseInt(maxHumField.value, 10) || 0;
  const realhum = parseInt(realhumField.value, 10) || 0;
  const hum = parseInt(humField.value, 10) || 0;

    document.getElementById("modalOverlayDamage").style.display = "none";
  
  realhumField.value = realhum - hum;
  saveSkills();
}