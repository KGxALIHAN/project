document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const weightInput = document.querySelector("input[name='weight']");
    const heightInput = document.querySelector("input[name='height']");
    const bmiDisplay = document.createElement("p");
    bmiDisplay.style.fontWeight = "bold";
    form.insertBefore(bmiDisplay, form.firstChild);

    // Обновляем BMI при изменении веса или роста
    const updateBMI = () => {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100; // Преобразуем см в метры
        if (weight && height) {
            const bmi = (weight / (height * height)).toFixed(2);
            bmiDisplay.textContent = `Ваш индекс массы тела (BMI): ${bmi}`;
        } else {
            bmiDisplay.textContent = "";
        }
    };

    weightInput.addEventListener("input", updateBMI);
    heightInput.addEventListener("input", updateBMI);

    // Валидация перед отправкой формы
    form.addEventListener("submit", (e) => {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const age = parseInt(document.querySelector("input[name='age']").value);

        if (!weight || weight <= 0 || !height || height <= 0 || !age || age <= 0) {
            e.preventDefault();
            alert("Пожалуйста, введите корректные значения для веса, роста и возраста.");
        }
    });
});
