(function() {
    // --------------------------------- Стилізація сторінки ---------------------------------
    const body = document.body;
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.minHeight = "100vh";
    body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    body.style.background = "linear-gradient(135deg, #5c3a21, #a67b5b)";
    body.style.boxSizing = "border-box";
    body.style.display = "flex";
    body.style.justifyContent = "center";
    body.style.alignItems = "center";

    const mainContainer = document.createElement("div");
    mainContainer.style.width = "100%";
    mainContainer.style.maxWidth = "800px";
    mainContainer.style.margin = "20px";
    mainContainer.style.background = "rgba(245, 222, 179, 0.9)";
    mainContainer.style.backdropFilter = "blur(12px)";
    mainContainer.style.borderRadius = "32px";
    mainContainer.style.padding = "25px";
    mainContainer.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
    mainContainer.style.textAlign = "center";

    // --------------------------------- Екран привітання ---------------------------------
    const startScreen = document.createElement("div");
    startScreen.id = "startScreen";

    const title = document.createElement("h1");
    title.textContent = "Моя перша гра";
    title.style.fontSize = "3rem";
    title.style.color = "#4a2a0e";
    title.style.marginBottom = "30px";
    title.style.textShadow = "2px 2px 4px rgba(0,0,0,0.2)";
    startScreen.appendChild(title);

    const startBtn = document.createElement("button");
    startBtn.textContent = "Почати гру";
    startBtn.style.background = "#8b4513";
    startBtn.style.color = "#fef0e0";
    startBtn.style.border = "none";
    startBtn.style.padding = "15px 30px";
    startBtn.style.fontSize = "1.5rem";
    startBtn.style.borderRadius = "40px";
    startBtn.style.cursor = "pointer";
    startBtn.style.transition = "0.2s";
    startBtn.style.width = "200px";
    startBtn.addEventListener("mouseenter", () => startBtn.style.background = "#a0522d");
    startBtn.addEventListener("mouseleave", () => startBtn.style.background = "#8b4513");
    startScreen.appendChild(startBtn);

    // --------------------------------- Ігровий екран ---------------------------------
    const gameScreen = document.createElement("div");
    gameScreen.id = "gameScreen";
    gameScreen.style.display = "none";

    // Таймер
    const timerDiv = document.createElement("div");
    timerDiv.style.fontSize = "2rem";
    timerDiv.style.fontWeight = "bold";
    timerDiv.style.marginBottom = "20px";
    timerDiv.style.background = "#2c1a0c";
    timerDiv.style.display = "inline-block";
    timerDiv.style.padding = "10px 20px";
    timerDiv.style.borderRadius = "50px";
    timerDiv.style.color = "#fef0e0";
    timerDiv.textContent = "Залишилось: 60";
    gameScreen.appendChild(timerDiv);

    // Поле гри (контейнер для сітки)
    const gridContainer = document.createElement("div");
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
    gridContainer.style.gap = "10px";
    gridContainer.style.marginBottom = "20px";
    gridContainer.style.backgroundColor = "rgba(0,0,0,0.1)";
    gridContainer.style.padding = "15px";
    gridContainer.style.borderRadius = "20px";
    gameScreen.appendChild(gridContainer);

    // Кнопка перезапуску
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Почати з початку";
    restartBtn.style.background = "#8b4513";
    restartBtn.style.color = "#fef0e0";
    restartBtn.style.border = "none";
    restartBtn.style.padding = "10px 20px";
    restartBtn.style.fontSize = "1.2rem";
    restartBtn.style.borderRadius = "30px";
    restartBtn.style.cursor = "pointer";
    restartBtn.style.marginBottom = "25px";
    restartBtn.style.transition = "0.2s";
    restartBtn.addEventListener("mouseenter", () => restartBtn.style.background = "#a0522d");
    restartBtn.addEventListener("mouseleave", () => restartBtn.style.background = "#8b4513");
    gameScreen.appendChild(restartBtn);

    // Таблиця статистики
    const statsTitle = document.createElement("h3");
    statsTitle.textContent = "Статистика спроб";
    statsTitle.style.color = "#4a2a0e";
    statsTitle.style.margin = "20px 0 10px";
    gameScreen.appendChild(statsTitle);

    const statsTable = document.createElement("table");
    statsTable.style.width = "100%";
    statsTable.style.borderCollapse = "collapse";
    statsTable.style.background = "#fef7e8";
    statsTable.style.borderRadius = "12px";
    statsTable.style.overflow = "hidden";
    statsTable.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Назва гри", "Час (сек.)"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        th.style.padding = "10px";
        th.style.backgroundColor = "#c29a6b";
        th.style.color = "white";
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    statsTable.appendChild(thead);
    const tbody = document.createElement("tbody");
    statsTable.appendChild(tbody);
    gameScreen.appendChild(statsTable);

    // --------------------------------- Змінні гри ---------------------------------
    let currentGameActive = false;      // чи дозволені кліки
    let expectedNumber = 1;             // яке число очікується (1..20)
    let timerInterval = null;
    let remainingSeconds = 60;
    let cells = [];                     // зберігає DOM-елементи клітинок
    let numbersMatrix = [];             // 5x5 з числами
    let results = [];                   // масив результатів { id, time }
    let gameCounter = 1;                // лічильник ігор

    // --------------------------------- Допоміжні функції ---------------------------------
    function getRandomColor() {
        // випадковий насичений колір (не надто світлий)
        const hue = Math.floor(Math.random() * 360);
        const sat = 50 + Math.floor(Math.random() * 50); // 50-100%
        const light = 35 + Math.floor(Math.random() * 40); // 35-75%
        return `hsl(${hue}, ${sat}%, ${light}%)`;
    }

    function getRandomFontSize() {
        const sizes = ["1rem", "1.2rem", "1.5rem", "1.8rem", "2rem", "2.2rem"];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Генерація поля 5x5 з числами 1..25 (перемішані)
    function generateGridNumbers() {
        let nums = [];
        for (let i = 1; i <= 25; i++) nums.push(i);
        nums = shuffleArray([...nums]);
        const matrix = [];
        for (let i = 0; i < 5; i++) {
            matrix.push(nums.slice(i * 5, i * 5 + 5));
        }
        return matrix;
    }

    // Створення клітинок з випадковим кольором та розміром шрифту
    function renderGrid() {
        gridContainer.innerHTML = "";
        cells = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const value = numbersMatrix[i][j];
                const cell = document.createElement("div");
                cell.textContent = value;
                cell.style.backgroundColor = getRandomColor();
                cell.style.color = "white";
                cell.style.fontSize = getRandomFontSize();
                cell.style.fontWeight = "bold";
                cell.style.display = "flex";
                cell.style.alignItems = "center";
                cell.style.justifyContent = "center";
                cell.style.padding = "20px 10px";
                cell.style.borderRadius = "16px";
                cell.style.cursor = "pointer";
                cell.style.transition = "0.1s";
                cell.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
                cell.setAttribute("data-value", value);
                cell.setAttribute("data-row", i);
                cell.setAttribute("data-col", j);
                
                // Якщо число вже було вибране раніше (від 1 до expected-1), підсвітити
                if (value >= 1 && value <= 20 && value < expectedNumber) {
                    cell.style.backgroundColor = "#2e7d32"; // зелений для вже вибраних
                    cell.style.opacity = "0.7";
                } else if (value === expectedNumber && currentGameActive) {
                    cell.style.backgroundColor = "#ff9800"; // помаранчевий для поточного
                }
                
                cell.addEventListener("click", () => onCellClick(value));
                gridContainer.appendChild(cell);
                cells.push(cell);
            }
        }
    }

    // Оновлення підсвітки (після кожного кліку або перезапуску)
    function updateHighlight() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const val = numbersMatrix[i][j];
                const idx = i * 5 + j;
                const cell = cells[idx];
                if (!cell) continue;
                if (val >= 1 && val <= 20 && val < expectedNumber) {
                    cell.style.backgroundColor = "#2e7d32";
                    cell.style.opacity = "0.7";
                } else if (val === expectedNumber && currentGameActive && expectedNumber <= 20) {
                    cell.style.backgroundColor = "#ff9800";
                    cell.style.opacity = "1";
                } else {
                    // відновлюємо випадковий колір (але щоб не змінювати постійно, зберігаємо? краще оновити)
                    cell.style.backgroundColor = getRandomColor();
                    cell.style.opacity = "1";
                }
            }
        }
    }

    // Завершення гри з перемогою
    function winGame() {
        if (!currentGameActive) return;
        currentGameActive = false;
        if (timerInterval) clearInterval(timerInterval);
        const spentTime = 60 - remainingSeconds;
        const timeValue = spentTime >= 0 ? spentTime : 0;
        alert(`🎉 Вітаємо! Ви завершили гру за ${timeValue} секунд! 🎉`);
        
        // Збереження результату
        results.unshift({ id: gameCounter, time: timeValue });
        gameCounter++;
        if (results.length > 10) results.pop();
        updateStatsTable();
        
        // Автоматичний перезапуск? За умовою "гра починається з початку"
        resetGame();
    }

    // Обробка кліку на клітинку
    function onCellClick(value) {
        if (!currentGameActive) return;
        if (expectedNumber > 20) return; // вже перемога
        if (value < 1 || value > 20) {
            alert(`Не вірна цифра (${value} поза діапазоном 1-20)`);
            return;
        }
        if (value !== expectedNumber) {
            alert(`Не вірна цифра! Очікується ${expectedNumber}, а ви натиснули ${value}`);
            return;
        }
        // Правильне натискання
        expectedNumber++;
        updateHighlight(); // змінюємо підсвітку
        
        if (expectedNumber === 21) {
            winGame();
        }
    }

    // Скидання таймера
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }
    
    function startTimer() {
        if (timerInterval) stopTimer();
        timerInterval = setInterval(() => {
            if (!currentGameActive) return;
            if (remainingSeconds <= 0) {
                // час вийшов
                stopTimer();
                currentGameActive = false;
                alert("Час вийшов! Ви не встигли.");
                resetGame();
            } else {
                remainingSeconds--;
                timerDiv.textContent = `Залишилось: ${remainingSeconds}`;
            }
        }, 1000);
    }
    
    // Перезапуск гри (скидає стан, генерує нове поле)
    function resetGame() {
        stopTimer();
        currentGameActive = false;
        expectedNumber = 1;
        remainingSeconds = 60;
        timerDiv.textContent = `Залишилось: 60`;
        // Генеруємо нові числа
        numbersMatrix = generateGridNumbers();
        renderGrid(); // створює нові клітинки з випадковими стилями
        // Активуємо гру
        currentGameActive = true;
        startTimer();
    }
    
    // Оновлення таблиці статистики
    function updateStatsTable() {
        tbody.innerHTML = "";
        if (results.length === 0) {
            const emptyRow = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = 2;
            td.textContent = "Немає даних";
            td.style.padding = "10px";
            td.style.textAlign = "center";
            emptyRow.appendChild(td);
            tbody.appendChild(emptyRow);
            return;
        }
        // Знаходимо найкращий час (мінімальний)
        let bestTime = Math.min(...results.map(r => r.time));
        results.forEach(record => {
            const row = document.createElement("tr");
            const tdName = document.createElement("td");
            tdName.textContent = `Гра ${record.id}`;
            tdName.style.padding = "8px";
            tdName.style.borderBottom = "1px solid #c29a6b";
            const tdTime = document.createElement("td");
            tdTime.textContent = `${record.time} с.`;
            tdTime.style.padding = "8px";
            tdTime.style.borderBottom = "1px solid #c29a6b";
            if (record.time === bestTime) {
                row.style.backgroundColor = "#ffecb3";
                tdName.style.fontWeight = "bold";
                tdTime.style.fontWeight = "bold";
            }
            row.appendChild(tdName);
            row.appendChild(tdTime);
            tbody.appendChild(row);
        });
    }
    
    // Ініціалізація нової гри (показуємо ігровий екран)
    function startNewGame() {
        // скидаємо всі змінні, генеруємо нове поле
        stopTimer();
        expectedNumber = 1;
        remainingSeconds = 60;
        timerDiv.textContent = `Залишилось: 60`;
        numbersMatrix = generateGridNumbers();
        renderGrid();
        currentGameActive = true;
        startTimer();
        // показати ігровий екран, сховати стартовий
        startScreen.style.display = "none";
        gameScreen.style.display = "block";
    }
    
    // Обробник кнопки "Почати з початку" (перезапуск поточної гри)
    function restartCurrentGame() {
        if (currentGameActive) {
            // Запитаємо підтвердження?
            if (confirm("Почати гру з початку? Поточний прогрес буде втрачено.")) {
                resetGame();
            }
        } else {
            resetGame();
        }
    }
    
    // Перехід з головного екрану на гру
    startBtn.addEventListener("click", () => {
        // Перед стартом скидаємо статистику? Ні, зберігаємо результати.
        startNewGame();
    });
    
    // Додаємо обробник для кнопки перезапуску
    restartBtn.addEventListener("click", restartCurrentGame);
    
    // Первинне налаштування: показуємо стартовий екран, ховаємо гру
    gameScreen.style.display = "none";
    startScreen.style.display = "block";
    mainContainer.appendChild(startScreen);
    mainContainer.appendChild(gameScreen);
    document.body.appendChild(mainContainer);
    
    // Ініціалізація порожньої таблиці
    updateStatsTable();
})();