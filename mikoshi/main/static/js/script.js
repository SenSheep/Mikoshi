document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll(".autocomplete");

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            let datalist = document.getElementById("options");
            let filter = this.value.toLowerCase();
            let options = datalist.getElementsByTagName("option");

            for (let option of options) {
                if (option.value.toLowerCase().includes(filter)) {
                    option.style.display = "block";
                } else {
                    option.style.display = "none";
                }
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let table = document.getElementById("dynamicTable").getElementsByTagName('tbody')[0];
    let addRowBtn = document.getElementById("addRowBtn");

    addRowBtn.addEventListener("click", function () {
        let newRow = table.insertRow(); // Создаём новую строку

        // Создаём ячейки и добавляем элементы ввода
        for (let i = 0; i < 5; i++) {
            let newCell = newRow.insertCell(i);
            let input = document.createElement("input");

            if (i === 1) {
                input.setAttribute("list", "options");
                input.classList.add("autocomplete");
            }

            newCell.appendChild(input);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Функция для получения значения характеристики
    function getStatValue(statName) {
        const rows = document.querySelectorAll(".stat_col tbody tr");
        for (let row of rows) {
            const key = row.cells[0].textContent.trim();
            const value = row.cells[1].querySelector("input").value.trim();
            if (key === statName) {
                return value || "0"; // Если пусто, подставляем 0
            }
        }
        return "0";
    }

    // Отслеживаем изменения в колонке "СТАТ Назв"
    document.querySelectorAll(".autocomplete").forEach((select) => {
        select.addEventListener("input", function () {
            const statName = this.value; // Получаем выбранное значение
            const statValue = getStatValue(statName); // Находим его значение
            const row = this.closest("tr"); // Находим текущую строку таблицы
            if (row) {
                row.cells[2].querySelector("input").value = statValue; // Заполняем "СТАТ Знач"
            }
        });
    });
});
