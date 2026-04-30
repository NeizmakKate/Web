(function() {
    // ----- Стилізація сторінки -----
    const body = document.body;
    body.style.margin = "0";
    body.style.padding = "20px";
    body.style.minHeight = "100vh";
    body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    body.style.background = "linear-gradient(135deg, #5c3a21, #a67b5b)";
    body.style.color = "#2c1a0c";
    body.style.boxSizing = "border-box";

    const container = document.createElement("div");
    container.style.maxWidth = "1000px";
    container.style.margin = "0 auto";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "30px";
    container.style.justifyContent = "center";

    // ----- Функція створення картки -----
    function createTaskCard(title, contentGenerator) {
        const card = document.createElement("div");
        card.style.background = "rgba(245, 222, 179, 0.9)";
        card.style.backdropFilter = "blur(12px)";
        card.style.borderRadius = "24px";
        card.style.padding = "20px";
        card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
        card.style.transition = "transform 0.2s";
        card.style.width = "calc(50% - 15px)";
        card.style.minWidth = "300px";
        card.style.boxSizing = "border-box";

        const h2 = document.createElement("h2");
        h2.textContent = title;
        h2.style.marginTop = "0";
        h2.style.color = "#4a2a0e";
        h2.style.borderBottom = "2px solid #c29a6b";
        h2.style.paddingBottom = "10px";
        card.appendChild(h2);

        const contentDiv = document.createElement("div");
        contentGenerator(contentDiv);
        card.appendChild(contentDiv);

        return card;
    }

    // ================= ЗАВДАННЯ 1: Поточний час у форматі =================
    function buildTask1(containerDiv) {
        const desc = document.createElement("p");
        desc.textContent = "Натисніть кнопку, щоб отримати поточний час у форматі: 09:15:56, середа, 06 травня 2025 року.";
        desc.style.marginBottom = "15px";
        containerDiv.appendChild(desc);

        const btn = document.createElement("button");
        btn.textContent = "🕒 Показати поточний час";
        btn.style.background = "#8b4513";
        btn.style.color = "#fef0e0";
        btn.style.border = "none";
        btn.style.padding = "12px 20px";
        btn.style.borderRadius = "12px";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "16px";
        btn.style.width = "100%";
        btn.style.transition = "0.2s";
        btn.addEventListener("mouseenter", () => btn.style.background = "#a0522d");
        btn.addEventListener("mouseleave", () => btn.style.background = "#8b4513");

        const resultDiv = document.createElement("div");
        resultDiv.style.marginTop = "15px";
        resultDiv.style.background = "#fef7e8";
        resultDiv.style.padding = "12px";
        resultDiv.style.borderRadius = "8px";
        resultDiv.style.border = "1px solid #c29a6b";
        resultDiv.style.fontFamily = "monospace";
        resultDiv.style.fontSize = "14px";
        resultDiv.textContent = "Результат з'явиться тут...";

        // Масиви для форматування
        const daysUA = ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];
        const monthsUA = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];

        function formatCurrentTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const dayName = daysUA[now.getDay()];
            const day = now.getDate();
            const month = monthsUA[now.getMonth()];
            const year = now.getFullYear();
            return `${hours}:${minutes}:${seconds}, ${dayName}, ${day} ${month} ${year} року`;
        }

        function showTime() {
            const formatted = formatCurrentTime();
            console.log(formatted);
            resultDiv.textContent = formatted;
        }

        btn.addEventListener("click", showTime);
        containerDiv.appendChild(btn);
        containerDiv.appendChild(resultDiv);
    }

    // ================= ЗАВДАННЯ 2: Гра "Вгадай число" =================
    function buildTask2(containerDiv) {
        const desc = document.createElement("p");
        desc.textContent = "Комп'ютер загадує число від 0 до 50. Ви вгадуєте. Підказки: гаряче (≤5), тепло (6‑15), холодно (≥16).";
        desc.style.marginBottom = "15px";
        containerDiv.appendChild(desc);

        const btn = document.createElement("button");
        btn.textContent = "🎲 Почати гру";
        btn.style.background = "#8b4513";
        btn.style.color = "#fef0e0";
        btn.style.border = "none";
        btn.style.padding = "12px 20px";
        btn.style.borderRadius = "12px";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "16px";
        btn.style.width = "100%";
        btn.style.transition = "0.2s";
        btn.addEventListener("mouseenter", () => btn.style.background = "#a0522d");
        btn.addEventListener("mouseleave", () => btn.style.background = "#8b4513");

        const logDiv = document.createElement("div");
        logDiv.style.marginTop = "15px";
        logDiv.style.background = "#fef7e8";
        logDiv.style.padding = "12px";
        logDiv.style.borderRadius = "8px";
        logDiv.style.border = "1px solid #c29a6b";
        logDiv.style.fontFamily = "monospace";
        logDiv.style.fontSize = "12px";
        logDiv.style.maxHeight = "200px";
        logDiv.style.overflowY = "auto";
        logDiv.textContent = "Лог спроб (останні події):";

        // Допоміжна функція форматування дати/часу для консолі
        function formatDateTime() {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        }

        async function startGame() {
            const secret = Math.floor(Math.random() * 51); // 0-50
            let attempts = 0;
            let guessed = false;
            let gameLog = [];

            function addLogEntry(attemptNum, userNumber, status) {
                const timeStr = formatDateTime();
                const logMsg = `${timeStr} Спроба ${attemptNum}: число ${userNumber} – ${status}`;
                console.log(logMsg);
                gameLog.unshift(logMsg); // нові повідомлення зверху
                if (gameLog.length > 10) gameLog.pop();
                logDiv.innerHTML = "Лог спроб (останні):<br>" + gameLog.map(s => s.replace(/ /g, '&nbsp;')).join("<br>");
            }

            while (!guessed) {
                let userInput = prompt(`🎯 Загадано число від 0 до 50. Спробуйте вгадати (спроба ${attempts + 1}):`);
                if (userInput === null) {
                    // користувач скасував – виходимо
                    alert("Гру скасовано.");
                    return;
                }
                userInput = userInput.trim();
                let num = Number(userInput);
                if (isNaN(num) || !Number.isInteger(num) || num < 0 || num > 50) {
                    alert("❌ Будь ласка, введіть ціле число від 0 до 50.");
                    continue;
                }
                attempts++;
                const diff = Math.abs(num - secret);
                let status = "";
                if (num === secret) {
                    status = "ВІРНО!";
                    guessed = true;
                    addLogEntry(attempts, num, status);
                    alert(`🎉 Вітаємо! За ${attempts} ${attempts === 1 ? "спробу" : "спроби"} ви вгадали число ${secret}.`);
                    const again = confirm("Бажаєте зіграти ще раз?");
                    if (again) {
                        startGame(); // рекурсивний виклик для нової гри
                    }
                    return;
                } else {
                    if (diff <= 5) status = "гаряче";
                    else if (diff <= 15) status = "тепло";
                    else status = "холодно";
                    addLogEntry(attempts, num, `не вірно (${status})`);
                    alert(`❌ Не вгадали. Ваше число ${num}. Підказка: ${status}.`);
                }
            }
        }

        btn.addEventListener("click", startGame);
        containerDiv.appendChild(btn);
        containerDiv.appendChild(logDiv);
    }

    // Створюємо картки
    const task1Card = createTaskCard("Завдання 1: Поточний час (Date)", buildTask1);
    const task2Card = createTaskCard("Завдання 2: Гра «Вгадай число»", buildTask2);
    container.appendChild(task1Card);
    container.appendChild(task2Card);

    // Адаптивність
    function adaptLayout() {
        const width = window.innerWidth;
        if (width <= 720) {
            task1Card.style.width = "100%";
            task2Card.style.width = "100%";
        } else {
            task1Card.style.width = "calc(50% - 15px)";
            task2Card.style.width = "calc(50% - 15px)";
        }
    }
    adaptLayout();
    window.addEventListener("resize", adaptLayout);

    document.body.appendChild(container);
})();