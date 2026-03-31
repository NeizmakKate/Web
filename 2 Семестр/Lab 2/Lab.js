function getImageWidth() {
    const imageWidth = this.offsetWidth;
    console.log("Ширина цієї картинки " + imageWidth + " px");
    document.getElementById("res-1").textContent = "Ширина цієї картинки " + imageWidth + " px";
}

function updateTitle(event) {
    const currentLink = event.target;
    currentLink.title = currentLink.href;
    console.log("Додано title для " + currentLink.href);
    currentLink.removeEventListener("mouseenter", updateTitle);
}

function showValue(event) {
    const inputElement = event.target;
    let inputText = inputElement.value;

    if (inputText.trim() === "") {
        document.getElementById("demo").textContent = "Поле порожнє. Спершу напишіть щось";
    } else {
        document.getElementById("demo").textContent = inputText;
    }
}

function firstClick(event) {
    const inputElement = event.target;
    let inputText = inputElement.value;

    if (inputText.trim() === "") {
        document.getElementById("warning").textContent = "Поле порожнє. Спершу напишіть щось";
    } else {
        document.getElementById("warning").textContent = "";
        console.log("Перше натискання. Записано значення: " + inputText);

        inputElement.removeEventListener("click", firstClick);
        inputElement.addEventListener("click", secondClick);
    }
}

function secondClick(event) {
    const inputElement = event.target;
    let inputText = inputElement.value;

    if (inputText.trim() === "") {
        document.getElementById("warning").textContent = "Поле порожнє. Спершу напишіть щось";
    } else {
        document.getElementById("warning").textContent = "";
        alert("Наступне натискання. Записано значення: " + inputText);
    }
}

function solveTask5(event) {
    const paragraph = event.target;
    const originalText = paragraph.textContent.toLowerCase().trim();
    const cleanedText = originalText.replace(/[!?]/g, "");

    function ukrainianToNumber(text) {
        const parsedNumber = parseFloat(text.replace(',', '.'));
        if (!isNaN(parsedNumber)) {
            return parsedNumber;
        }

        const wordsArray = text.split(/\s+/);

        const numberDictionary = {
            'нуль': 0,
            'один': 1, 'одна': 1,
            'два': 2, 'дві': 2,
            'три': 3,
            'чотири': 4,
            'п\'ять': 5,
            'шість': 6,
            'сім': 7,
            'вісім': 8,
            'дев\'ять': 9,
            'десять': 10,
            'одинадцять': 11,
            'дванадцять': 12,
            'тринадцять': 13,
            'чотирнадцять': 14,
            'п\'ятнадцять': 15,
            'шістнадцять': 16,
            'сімнадцять': 17,
            'вісімнадцять': 18,
            'дев\'ятнадцять': 19,
            'двадцять': 20,
            'тридцять': 30,
            'сорок': 40,
            'п\'ятдесят': 50,
            'шістдесят': 60,
            'сімдесят': 70,
            'вісімдесят': 80,
            'дев\'яносто': 90,
            'сто': 100,
            'двісті': 200,
            'триста': 300,
            'чотириста': 400,
            'п\'ятсот': 500,
            'шістсот': 600,
            'сімсот': 700,
            'вісімсот': 800,
            'дев\'ятсот': 900,
            'тисяча': 1000,
            'тисячі': 1000,
            'тисяч': 1000,
            'мільйон': 1000000,
            'мільйона': 1000000,
            'мільйонів': 1000000
        };

        let totalResult = 0;
        let tempNumber = 0;

        for (const word of wordsArray) {
            if (word === 'і' || word === 'й' || word === 'та') {
                totalResult += tempNumber;
                tempNumber = 0;
                continue;
            }

            const wordValue = numberDictionary[word];
            if (wordValue === undefined) continue;

            if (wordValue >= 1000) {
                tempNumber = tempNumber === 0 ? wordValue : tempNumber * wordValue;
                totalResult += tempNumber;
                tempNumber = 0;
            } else {
                tempNumber += wordValue;
            }
        }

        totalResult += tempNumber;
        return totalResult;
    }

    const parsedValue = ukrainianToNumber(cleanedText);

    if (parsedValue !== undefined && parsedValue !== null && !isNaN(parsedValue)) {
        const squaredResult = parsedValue * parsedValue;
        paragraph.textContent = squaredResult;
        console.log(`Розпізнано число: ${parsedValue}. Квадрат: ${squaredResult}`);
    } else {
        console.warn("Не вдалося розпізнати число у тексті:", cleanedText);
        paragraph.textContent = cleanedText;
    }
}

function setRed(event) {
    const boxElement = event.target;
    boxElement.style.backgroundColor = 'red';
    boxElement.removeEventListener('click', setRed);
    boxElement.addEventListener('click', setGreen);
}

function setGreen(event) {
    const boxElement = event.target;
    boxElement.style.backgroundColor = 'green';
    boxElement.removeEventListener('click', setGreen);
    boxElement.addEventListener('click', setRed);
}

document.getElementById("cat").onclick = getImageWidth;
document.getElementById("dog").onclick = getImageWidth;
document.getElementById("han").onclick = getImageWidth;

const linksList = document.querySelectorAll(".links");
linksList.forEach(link => {
    link.addEventListener("mouseenter", updateTitle);
});

const inputsTask3 = document.querySelectorAll(".another_task");
inputsTask3.forEach(input => {
    input.addEventListener("click", showValue);
});

const inputsTask4 = document.querySelectorAll(".task");
inputsTask4.forEach(input => {
    input.addEventListener("click", firstClick);
});

document.querySelectorAll(".num-p").forEach(paragraph => {
    paragraph.addEventListener("click", solveTask5);
});

document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', setRed);
});