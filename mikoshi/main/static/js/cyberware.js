const cyberModCatalog = {
  // НЕЙРОЛИНК
  neural_link: [
    {
      id: "braindance",
      name: "Записыватель брейндансов",
      cost: "500eb (Дорогое)",
      hl: "7 (2d)",
      slot: "Клиника",
      desc: "Записывает Брейндансы на стандартную щепку памяти или на подсоединенный Агент"
    },
    {
      id: "kerenzikov",
      name: "Керензиков",
      cost: 500,
      hl: 14,
      slot: "Клиника",
      desc: "Даёт +2 к броскам Инициативы"
    }
  ],

  // КИБЕРГЛАЗА
  eye_right: [
    {
      id: "anti_flash",
      name: "Антиослепление",
      cost: 100,
      hl: 2,
      slot: "Молл",
      desc: "Пользователь невосприимчив к слепоте или другим эффектам, вызванными яркими вспышками"
    },
    {
      id: "virtual_vision",
      name: "Виртуальное зрение",
      cost: 100,
      hl: 2,
      slot: "Молл",
      desc: " Проецирует изображение киберпространства поверх реального мира"
    }
  ],

}

function PSYCHO(n) {
  alert("Вы психопат!");
  if (n < 0) {
    setInterval(() => {
        const mods = document.querySelectorAll('.mod');
        const rand = mods[Math.floor(Math.random() * mods.length)];
        if (rand) rand.classList.toggle('glitch');
        }, 300);
}
}