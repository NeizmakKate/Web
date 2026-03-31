document.getElementById("btn-1").onclick = function () {
    let number = 2;
    let output = "";

    while (number <= 100) {
        let isPrime = true;
        let divisor = 2;

        while (divisor <= Math.sqrt(number)) {
            if (number % divisor === 0) {
                isPrime = false;
                break;
            }
            divisor++;
        }

        if (isPrime) {
            output += number + " ";
        }
        number++;
    }

    document.getElementById("res-1").textContent = output;
};


document.getElementById("btn-2").onclick = function () {
    let number = 0;
    let output = "";

    do {
        if (number === 0) {
            output += number + " - це нуль\n";
        } else if (number % 2 === 0) {
            output += number + " - парне число\n";
        } else {
            output += number + " - непарне число\n";
        }
        number++;
    } while (number <= 10);

    document.getElementById("res-2").textContent = output;
};


document.getElementById("btn-3").onclick = function () {
    let value = 10000;
    let iterations = 0;
    let result;

    while (value >= 50) {
        iterations++;
        value = value / 2;
        result = value;
    }

    console.log("Результат " + result);
    console.log("Кількість ітерацій " + iterations);

    document.getElementById("res-3").textContent =
        "Результат " + result + "\nКількість ітерацій " + iterations;
};


document.getElementById("btn-4").onclick = function () {
    let userInput = prompt("Введіть номер місяця");
    let monthNumber = Number(userInput);
    let monthName = "";
    let season = "";

    if (monthNumber < 1 || monthNumber > 12 || isNaN(monthNumber)) {
        alert("Помилка. Введіть коректне число від 1 до 12.");
        return;
    }

    switch (monthNumber) {
        case 1: monthName = "Січень"; break;
        case 2: monthName = "Лютий"; break;
        case 3: monthName = "Березень"; break;
        case 4: monthName = "Квітень"; break;
        case 5: monthName = "Травень"; break;
        case 6: monthName = "Червень"; break;
        case 7: monthName = "Липень"; break;
        case 8: monthName = "Серпень"; break;
        case 9: monthName = "Вересень"; break;
        case 10: monthName = "Жовтень"; break;
        case 11: monthName = "Листопад"; break;
        case 12: monthName = "Грудень"; break;
    }

    if (monthNumber === 12 || monthNumber <= 2) {
        season = "Зима";
    } else if (monthNumber <= 5) {
        season = "Весна";
    } else if (monthNumber <= 8) {
        season = "Літо";
    } else {
        season = "Осінь";
    }

    alert("Місяць " + monthName + "\nПора року " + season);
};


document.getElementById("btn-5").onclick = function () {
    let inputTemp = prompt("Введіть температуру за шкалою Цельсія");
    let celsius = Number(inputTemp);

    if (inputTemp === null || inputTemp === "" || isNaN(celsius)) {
        alert("Введено некоректну температуру. Спробуйте ще раз");
        return;
    }

    let fahrenheit = (9 / 5) * celsius + 32;

    alert("Температура за шкалою Фаренгейта " + fahrenheit.toFixed(1));
};


document.getElementById("btn-6").onclick = function () {
    let userInput = prompt("Введіть число від 1 до 7");
    let dayNumber = Number(userInput);
    let dayName = "";

    if (dayNumber < 1 || dayNumber > 7 || isNaN(dayNumber)) {
        alert("Введено некоректне число. Введіть число в діапазоні від 1 до 7.");
        return;
    }

    switch (dayNumber) {
        case 1: dayName = "Понеділок"; break;
        case 2: dayName = "Вівторок"; break;
        case 3: dayName = "Середа"; break;
        case 4: dayName = "Четвер"; break;
        case 5: dayName = "П'ятниця"; break;
        case 6: dayName = "Субота"; break;
        case 7: dayName = "Неділя"; break;
    }

    document.getElementById("res-6").textContent = dayName;
};