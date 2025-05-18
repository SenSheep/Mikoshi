import { saveSkills } from "./api.js";
import * as roledecs from "./roleleveldesc.js";

export function showRoleDesc() {
  const role = document.querySelector('.role').value;
  const rolelevel = parseInt(document.getElementById('role_level').value, 10) || 0;
  const roleDescField = document.getElementById('roleAbilities')
  roleDescField.innerHTML = ''

  if (role === 'rocker') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = roledecs.rockerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = roledecs.rockerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = roledecs.rockerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 8) {
      const desc = roledecs.rockerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 9) {
      const desc = roledecs.rockerLevels["9"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 10) {
      const desc = roledecs.rockerLevels["10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'solo') {
    roleDescField.innerHTML = `
      <div id="soloAbilities">
      <h3>Боевое чутье</h3>
      <p>Доступно очков: <span id="availablePoints"></span></p>
    
      <div class="ability-block" data-ability="deflection">
        <h4>▶ Отражение урона: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    
      <div class="ability-block" data-ability="initiative">
        <h4>▶ Личная инициатива: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    
      <div class="ability-block" data-ability="accuracy">
        <h4>▶ Точная атака: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>

      <div class="ability-block" data-ability="nofail">
        <h4>▶ Умелое обращение: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>

      <div class="ability-block" data-ability="findweak">
        <h4>▶ Выявление слабостей: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>

      <div class="ability-block" data-ability="percept">
        <h4>▶ Обнаружение угроз: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    </div>
    `
    const availablePointsSpan = document.getElementById('availablePoints');
    let maxPoints = rolelevel;
    availablePointsSpan.textContent = maxPoints;

    document.querySelectorAll(".ability-block").forEach(block => {
      const plus = block.querySelector(".plus");
      const minus = block.querySelector(".minus");
      const pointsSpan = block.querySelector(".points");
      const effectText = block.querySelector(".effect-text");

      plus.addEventListener("click", () => {
        let current = parseInt(pointsSpan.textContent);
        if (maxPoints > 0) {
          current++;
          maxPoints--;
          pointsSpan.textContent = current;
          updateEffect(block.dataset.ability, current, effectText);
        }
        availablePointsSpan.textContent = maxPoints;
      });

      minus.addEventListener("click", () => {
        let current = parseInt(pointsSpan.textContent);
        if (current > 0) {
          current--;
          maxPoints++;
          pointsSpan.textContent = current;
          updateEffect(block.dataset.ability, current, effectText);
        }
        availablePointsSpan.textContent = maxPoints;
      });
    });

    function updateEffect(ability, points, el) {
      switch (ability) {
        case "deflection":
          const reduction = Math.floor(points / 2);
          if (points > 0) el.textContent = `Снижает первый урон в раунде на ${reduction}`;
          else el.textContent = `Нет бонуса`;
          break;
        case "initiative":
          if (points > 0) el.textContent = `+${points} к инициативе`;
          else el.textContent = `Нет бонуса`;
          break;
        case "accuracy":
          if (points >= 9) el.textContent = `+3 к попаданию`;
          else if (points >= 6) el.textContent = `+2 к попаданию`;
          else if (points >= 3) el.textContent = `+1 к попаданию`;
          else el.textContent = `Нет бонуса`;
          break;
        case "nofail":
          if (points >= 4) el.textContent = "Игнорирование критических провалов во время атак";
          else el.textContent = "Нет бонуса";
          break;
        case "findweak":
          if (points > 0) el.textContent = `+${points} к урону (до брони) для первой успешной атаки`;
          else el.textContent = `Нет бонуса`;
          break;
        case "percept":
          if (points > 0) el.textContent = `+${points} к внимательности`;
          else el.textContent = `Нет бонуса`; 
          break;
        // Добавь остальные способности аналогично
      }
    }
  }

  if (role === 'netrunner') {
    if (rolelevel >= 1 && rolelevel <= 3) {
      const desc = roledecs.netrunnerLevels["1-3"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 4 && rolelevel <= 6) {
      const desc = roledecs.netrunnerLevels["4-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 9) {
      const desc = roledecs.netrunnerLevels["7-9"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 10) {
      const desc = roledecs.netrunnerLevels["10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'techie') {
    roleDescField.innerHTML = `
      <div id=technieoAbilities">
      <h3>Создатель</h3>
      <p>Доступно очков: <span id="availablePoints"></span></p>
    
      <div class="ability-block" data-ability="expert">
        <h4>▶ Полевая экспертиза: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    
      <div class="ability-block" data-ability="modif">
        <h4>▶ Мастер модернизации: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    
      <div class="ability-block" data-ability="make">
        <h4>▶ Мастер изготовления: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>

      <div class="ability-block" data-ability="invent">
        <h4>▶ Мастер изобретатель: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    </div>
    `
    const availablePointsSpan = document.getElementById('availablePoints');
    let maxPoints = rolelevel * 2;
    availablePointsSpan.textContent = maxPoints;
    const charId = document.body.dataset.charId;

    document.querySelectorAll(".ability-block").forEach(block => {
      const plus = block.querySelector(".plus");
      const minus = block.querySelector(".minus");
      const pointsSpan = block.querySelector(".points");
      const effectText = block.querySelector(".effect-text");
      const ability = block.dataset.ability;

      plus.addEventListener("click", () => {
        let current = parseInt(pointsSpan.textContent);
        if (maxPoints > 0) {
          current++;
          maxPoints--;
          pointsSpan.textContent = current;
          updateEffect(block.dataset.ability, current, effectText);
          saveSkills();
        }
        availablePointsSpan.textContent = maxPoints;
      });

      minus.addEventListener("click", () => {
        let current = parseInt(pointsSpan.textContent);
        if (current > 0) {
          current--;
          maxPoints++;
          pointsSpan.textContent = current;
          updateEffect(block.dataset.ability, current, effectText);
          saveSkills()
        }
        availablePointsSpan.textContent = maxPoints;
      });
    });

    function updateEffect(ability, points, el) {
      switch (ability) {
        case "expert":
          if (points > 0) el.textContent = `+ ${points} к навыкам: Техника, Кибертехника, Системы безопасности, Оружейник, Наземная, Морская или Авиатехника`;
          else el.textContent = `Нет бонуса`;
          break;
        case "modif":
          if (points > 0) el.textContent = `Модернизация делается СТАТ ТЕХ + ТЕХ Навык, которым ремонтируется предмет + Ранг мастера модернизации (+${points}) + 1d10`;
          else el.textContent = `Нет бонуса`;
          break;
        case "make":
          if (points > 0) el.textContent = `Чтобы изготовить предмет, делается бросок СТАТ ТЕХ + навык ТЕХ, которым ремонтируется предмет + ранг Мастера изготовления (${points}) + 1d10`;
          else el.textContent = `Нет бонуса`;
          break;
        case "invent":
          if (points > 0) el.textContent = `Для изобретения ТЕХ + навык ТЕХ, связанный с ремонтом изобретения или предмета, который изобретение должно улучшить + ранг Мастера Изобретателя (${points}) + 1d10`;
          else el.textContent = `Нет бонуса`;
          break;
      }
    }

    fetch(`/api/get-char-skills/${charId}/`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        const ability = data.ability || {};
  
        // Для каждого блока ability-block
        document.querySelectorAll(".ability-block").forEach(block => {
          const abilityName = block.dataset.ability; // Получаем имя способности из data-ability
          const points = ability[abilityName] || 0; // Получаем количество очков из data.ability
          const plusButton = block.querySelector(".plus"); // Кнопка "plus"
  
          // Нажимаем кнопку "plus" нужное количество раз
          for (let i = 0; i < points; i++) {
            plusButton.click();
          }
        });
      }
    })
  }

  if (role === 'medtech') {
    roleDescField.innerHTML = `
      <div id="medtechAbilities">
      <h3>Создатель</h3>
      <p>Доступно очков: <span id="availablePoints"></span></p>
    
      <div class="ability-block" data-ability="surgeon">
        <h4>▶ Хирургия: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    
      <div class="ability-block" data-ability="pharm">
        <h4>▶ Фармацевтика: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
        <div class="drug-selection" style="display: none;">
        <label>Выберите препарат:</label><br>
        <select style='display: none' class="drug-dropdown">
          <option value="">—</option>
          <option value="antibiotics">Антибиотики</option>
          <option value="detox">Быстрый детокс</option>
          <option value="speedheal">СпидХил</option>
          <option value="stim">Стим</option>
          <option value="vpsk">Всплеск</option>
        </select>
      </div>
      </div>
    
      <div class="ability-block" data-ability="cryosystem">
        <h4>▶ Криосистемы: <span class="points">0</span> <button class="minus">-</button> <button class="plus">+</button></h4>
        <p class="effect-text">Нет бонуса</p>
      </div>
    </div>

    <button onclick="saveSkills()">TEST BUTTON</button>
    `
    const availablePointsSpan = document.getElementById('availablePoints');
    let maxPoints = rolelevel;
    availablePointsSpan.textContent = maxPoints;
    const charId = document.body.dataset.charId;

    document.querySelectorAll(".ability-block").forEach(block => {
      const plus = block.querySelector(".plus");
      const minus = block.querySelector(".minus");
      const pointsSpan = block.querySelector(".points");
      const effectText = block.querySelector(".effect-text");
      const ability = block.dataset.ability;

      plus.addEventListener("click", () => {
        let current = parseInt(pointsSpan.textContent);
        if (maxPoints > 0) {
          current++;
          maxPoints--;
          pointsSpan.textContent = current;
          updateEffect(block.dataset.ability, current, effectText);
          saveSkills()
        }
        availablePointsSpan.textContent = maxPoints;
      });

      minus.addEventListener("click", () => {
        let current = parseInt(pointsSpan.textContent);
        if (current > 0) {
          current--;
          maxPoints++;
          pointsSpan.textContent = current;
          updateEffect(block.dataset.ability, current, effectText);
          saveSkills()
        }
        availablePointsSpan.textContent = maxPoints;
      });
    });

function updateEffect(ability, points, el) {
  switch (ability) {
    
    case "surgeon":
      if (points > 0) el.textContent = `+ ${points} к навыку Хирургия`;
      else el.textContent = `Нет бонуса`;
      break;

    case "pharm":
      const drugBlock = el.parentElement.querySelector(".drug-selection");
      const drugEffect = drugBlock.querySelector(".drug-effect");
      const dropdown = drugBlock.querySelector(".drug-dropdown");
      
      // Обновляем текстовый эффект для фармацевтики
      if (points > 0) {
        el.textContent = `+ ${points} к навыку Медицинские технологии`;
        drugBlock.style.display = "block";
        
        // Ограничиваем количество доступных препаратов количеством очков
        const availableOptions = [
          "antibiotics",
          "detox",
          "speedheal",
          "stim",
          "vpsk"
        ];
        
        // Очищаем все старые формы
        let formContainer = drugBlock.querySelector(".form-container");
        if (!formContainer) {
          formContainer = document.createElement("div");
          formContainer.classList.add("form-container");
          drugBlock.appendChild(formContainer);
        } else {
          formContainer.innerHTML = ''; // Очистить старые формы
        }
        
        // Добавляем нужное количество форм
        for (let i = 0; i < points; i++) {
          const form = document.createElement("div");
          form.classList.add("drug-form");

          // Создаём выпадающий список для каждого препарата
          const select = document.createElement("select");
          select.classList.add("drug-dropdown");
          const optionEmpty = document.createElement("option");
          optionEmpty.value = "";
          optionEmpty.textContent = "—";
          select.appendChild(optionEmpty);

          availableOptions.slice(0, 5).forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = getDrugName(option);
            select.appendChild(optionElement);
          });

          const effectText = document.createElement("p");
          effectText.classList.add("drug-effect");
          effectText.textContent = "";

          form.appendChild(select);
          form.appendChild(effectText);
          formContainer.appendChild(form);

          // Обновляем эффект при изменении выбора препарата
          select.onchange = () => {
            const selectedValue = select.value;
            effectText.textContent = getDrugEffect(selectedValue);
            saveSkills();
          };
        }
      } else {
        el.textContent = "Нет бонуса";
        drugBlock.style.display = "none";
      }
      break;

    case "cryosystem":
      if (points == 1) el.textContent = `Вы получаете крионасос`;
      else if (points === 2) el.textContent = `Вы получаете 24/7 доступ к 1 Криокамере одновременно в любом хранилище, управляемом медицинскими корпорациями или государственными учреждениями`;
      else if (points === 3) el.textContent = `Вы получаете 1 Криокамеру, установленную в любом помещении на ваш выбор`;
      else if (points === 4) el.textContent = `Вы получаете еще 2 Криокамеры, которые можно поместить там же, где и первая. Ваш Крионасос теперь имеет 2 заряда, максимальная грузоподъемность криопакета увеличивается до 2х человек в стазисе.`;
      else if (points === 5) el.textContent = `Вы получаете еще 3 Криокамеры, которые можно поместить там же, где и первые три. Ваш Крионасос теперь имеет 3 заряда, максимальная грузоподъемность криопакета увеличивается до 3х человек в стазисе`;
      else el.textContent = `Нет бонуса`;
      break;
  }
}

  fetch(`/api/get-char-skills/${charId}/`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        const ability = data.ability || {};
        const drugs = ability["drugs"] || [];

        document.querySelectorAll(".ability-block").forEach(block => {
          const abilityName = block.dataset.ability;
          const points = ability[abilityName] || 0;

          const pointsSpan = block.querySelector(".points");
          const effectText = block.querySelector(".effect-text");

          pointsSpan.textContent = points;
          updateEffect(abilityName, points, effectText);
        });

        // После отрисовки препаратов — вставим значения
        if ((ability["pharm"] || 0) > 0 && Array.isArray(drugs)) {
          setTimeout(() => {
            const pharmBlock = document.querySelector('[data-ability="pharm"]');
            if (!pharmBlock) return;

            const selects = pharmBlock.querySelectorAll(".drug-dropdown");
            const effects = pharmBlock.querySelectorAll(".drug-effect");

            drugs.forEach((drug, index) => {
              const adjustedIndex = index + 1;
              const select = selects[adjustedIndex];
              const effect = effects[index];
              if (select) {
                select.value = drug;
                effect.textContent = getDrugEffect(drug);
              }
            });
          }, 100);
        }
      }
    });

// Функция для получения названия препарата
function getDrugName(value) {
  const drugNames = {
    "antibiotics": "Антибиотики",
    "detox": "Быстрый детокс",
    "speedheal": "СпидХил",
    "stim": "Стим",
    "vpsk": "Всплеск"
  };
  return drugNames[value] || '';
}

// Функция для получения эффекта препарата
function getDrugEffect(value) {
  const drugEffects = {
    "antibiotics": "Дополнительно восстанавливаются 2 ПЗ в день в течение недели. Один раз в день.",
    "detox": "Мгновенно очищает от наркотиков, ядов и интоксикации.",
    "speedheal": "Мгновенно восстанавливает ПЗ = ТЕЛ + ВОЛЯ. Один раз в день.",
    "stim": "Игнорирование штрафов тяжелого ранения на 1 час. Один раз в день.",
    "vpsk": "Бодрствование без сна на 24 часа. Один раз в неделю."
  };
  return drugEffects[value] || '';
  
}}

  if (role === 'media') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = roledecs.mediaLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = roledecs.mediaLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = roledecs.mediaLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 8) {
      const desc = roledecs.mediaLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 9) {
      const desc = roledecs.mediaLevels["9"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 10) {
      const desc = roledecs.mediaLevels["10"];
      roleDescField.innerHTML = desc
    }
  }

  // В РАЗРАБОТКЕ
  if (role === 'corporate') {
    roleDescField.innerHTML = '<b>В РАЗРАБОТКЕ</b>'

    // if (rolelevel >= 1 && rolelevel <= 2) {
    //   const desc = rockerLevels["1-2"];
    //   roleDescField.innerHTML = desc
    // }
    // if (rolelevel >= 3 && rolelevel <= 4) {
    //   const desc = rockerLevels["3-4"];
    //   roleDescField.innerHTML = desc
    // }
    // if (rolelevel >= 5 && rolelevel <= 6) {
    //   const desc = rockerLevels["5-6"];
    //   roleDescField.innerHTML = desc
    // }
    // if (rolelevel >= 7 && rolelevel <= 7) {
    //   const desc = rockerLevels["7-8"];
    //   roleDescField.innerHTML = desc
    // }
    // if (rolelevel >= 9 && rolelevel <= 10) {
    //   const desc = rockerLevels["9-10"];
    //   roleDescField.innerHTML = desc
    // }
  }

  if (role === 'lawman') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = roledecs.lawmanLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = roledecs.lawmanLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 7) {
      const desc = roledecs.lawmanLevels["5-7"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 8) {
      const desc = roledecs.lawmanLevels["8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 9) {
      const desc = roledecs.lawmanLevels["9"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 10) {
      const desc = roledecs.lawmanLevels["10"];
      roleDescField.innerHTML = desc
    }
  }

  if (role === 'fixer') {
    if (rolelevel >= 1 && rolelevel <= 2) {
      const desc = roledecs.fixerLevels["1-2"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 3 && rolelevel <= 4) {
      const desc = roledecs.fixerLevels["3-4"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 5 && rolelevel <= 6) {
      const desc = roledecs.fixerLevels["5-6"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel >= 7 && rolelevel <= 8) {
      const desc = roledecs.fixerLevels["7-8"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 9) {
      const desc = roledecs.fixerLevels["9"];
      roleDescField.innerHTML = desc
    }
    if (rolelevel === 10) {
      const desc = roledecs.fixerLevels["10"];
      roleDescField.innerHTML = desc
    }
  }

    // В РАЗРАБОТКЕ
  if (role === 'nomad') {
  }
}