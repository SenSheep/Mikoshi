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