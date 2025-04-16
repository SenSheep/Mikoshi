document.getElementById("openModalBtn").addEventListener("click", function () {
    document.getElementById("modalOverlay").style.display = "flex";
  });
  
  document.getElementById("closeModalBtn").addEventListener("click", function () {
    document.getElementById("modalOverlay").style.display = "none";
  });
  
  // Закрытие по клику вне окна
  document.getElementById("modalOverlay").addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.display = "none";
    }
  });