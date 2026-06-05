(function() {
    // ----- Загальні стилі та контейнер -----
    const body = document.body;
    body.style.margin = "0";
    body.style.padding = "20px";
    body.style.minHeight = "100vh";
    body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    body.style.background = "linear-gradient(135deg, #5c3a21, #a67b5b)";
    body.style.color = "#2c1a0c";
    body.style.boxSizing = "border-box";

    const container = document.createElement("div");
    container.style.maxWidth = "1200px";
    container.style.margin = "0 auto";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "30px";
    container.style.justifyContent = "center";

    // ----- Функція створення картки завдання -----
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

    // ========================= ЗАВДАННЯ 1: Модульне вікно (мова та день тижня) =========================
    function buildTask1(containerDiv) {
        const desc = document.createElement("p");
        desc.textContent = "Натисніть кнопку, щоб вибрати мову (ua/en), потім номер дня тижня. Результат з'явиться у спливаючому вікні.";
        desc.style.marginBottom = "15px";
        containerDiv.appendChild(desc);

        const startBtn = document.createElement("button");
        startBtn.textContent = "▶ Запустити опитування";
        startBtn.style.background = "#8b4513";
        startBtn.style.color = "#fef0e0";
        startBtn.style.border = "none";
        startBtn.style.padding = "12px 20px";
        startBtn.style.borderRadius = "12px";
        startBtn.style.cursor = "pointer";
        startBtn.style.fontSize = "16px";
        startBtn.style.transition = "0.2s";
        startBtn.style.width = "100%";
        startBtn.addEventListener("mouseenter", () => startBtn.style.background = "#a0522d");
        startBtn.addEventListener("mouseleave", () => startBtn.style.background = "#8b4513");

        // Дані про мови та дні тижня (єдиний об'єкт)
        const langData = {
            ua: {
                languagePrompt: "Виберіть мову (ua або en):",
                dayPrompt: "Введіть номер дня тижня (від 1 до 7):",
                errorLang: "Помилка! Введіть 'ua' або 'en' (регістр не важливий).",
                errorDay: "Помилка! Введіть число від 1 до 7.",
                days: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
            },
            en: {
                languagePrompt: "Select language (ua or en):",
                dayPrompt: "Enter the day number of the week (from 1 to 7):",
                errorLang: "Error! Enter 'ua' or 'en' (case insensitive).",
                errorDay: "Error! Enter a number from 1 to 7.",
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            }
        };

        // Функція створення кастомного модального вікна
        function showModal(title, message, inputType = "text", onConfirm) {
            return new Promise((resolve) => {
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.top = "0";
                overlay.style.left = "0";
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
                overlay.style.display = "flex";
                overlay.style.justifyContent = "center";
                overlay.style.alignItems = "center";
                overlay.style.zIndex = "1000";

                const modal = document.createElement("div");
                modal.style.background = "#fff8ef";
                modal.style.borderRadius = "20px";
                modal.style.padding = "25px";
                modal.style.width = "300px";
                modal.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
                modal.style.border = "1px solid #c29a6b";

                const titleEl = document.createElement("h3");
                titleEl.textContent = title;
                titleEl.style.margin = "0 0 15px 0";
                titleEl.style.color = "#8b4513";
                modal.appendChild(titleEl);

                const msgEl = document.createElement("p");
                msgEl.textContent = message;
                msgEl.style.margin = "0 0 15px 0";
                modal.appendChild(msgEl);

                const inputEl = document.createElement("input");
                inputEl.type = inputType;
                inputEl.style.width = "100%";
                inputEl.style.padding = "8px";
                inputEl.style.borderRadius = "8px";
                inputEl.style.border = "1px solid #c29a6b";
                inputEl.style.marginBottom = "15px";
                inputEl.style.boxSizing = "border-box";
                modal.appendChild(inputEl);

                const buttonDiv = document.createElement("div");
                buttonDiv.style.display = "flex";
                buttonDiv.style.gap = "10px";
                buttonDiv.style.justifyContent = "flex-end";

                const okBtn = document.createElement("button");
                okBtn.textContent = "OK";
                okBtn.style.background = "#8b4513";
                okBtn.style.color = "white";
                okBtn.style.border = "none";
                okBtn.style.padding = "6px 15px";
                okBtn.style.borderRadius = "8px";
                okBtn.style.cursor = "pointer";
                okBtn.addEventListener("click", () => {
                    document.body.removeChild(overlay);
                    resolve(inputEl.value);
                });

                const cancelBtn = document.createElement("button");
                cancelBtn.textContent = "Скасувати";
                cancelBtn.style.background = "#aaa";
                cancelBtn.style.color = "white";
                cancelBtn.style.border = "none";
                cancelBtn.style.padding = "6px 15px";
                cancelBtn.style.borderRadius = "8px";
                cancelBtn.style.cursor = "pointer";
                cancelBtn.addEventListener("click", () => {
                    document.body.removeChild(overlay);
                    resolve(null);
                });

                buttonDiv.appendChild(cancelBtn);
                buttonDiv.appendChild(okBtn);
                modal.appendChild(buttonDiv);
                overlay.appendChild(modal);
                document.body.appendChild(overlay);
                inputEl.focus();
            });
        }

        async function startDialog() {
            // 1. Запит мови
            let langCode = null;
            while (langCode === null) {
                const input = await showModal("Налаштування мови", "Виберіть мову (ua або en):", "text");
                if (input === null) return; // скасовано
                const lower = input.trim().toLowerCase();
                if (lower === "ua" || lower === "en") {
                    langCode = lower;
                } else {
                    // Просте повідомлення про помилку
                    const errModal = (msg) => new Promise(r => {
                        const ov = document.createElement("div");
                        ov.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:1100";
                        const m = document.createElement("div");
                        m.style.background = "#fff8ef"; m.style.borderRadius="16px"; m.style.padding="20px"; m.style.minWidth="250px";
                        m.innerHTML = `<p style="color:#b33;">${msg}</p><button id="errOk">OK</button>`;
                        m.querySelector("#errOk").style.cssText = "background:#8b4513;color:white;border:none;padding:8px 16px;border-radius:8px;margin-top:10px;cursor:pointer";
                        m.querySelector("#errOk").onclick = () => { document.body.removeChild(ov); r(); };
                        ov.appendChild(m); document.body.appendChild(ov);
                    });
                    await errModal(langData.ua.errorLang);
                }
            }

            const lang = langData[langCode];
            // 2. Запит дня тижня
            let dayNumber = null;
            while (dayNumber === null) {
                const input = await showModal(langCode === "ua" ? "День тижня" : "Day of week", lang.dayPrompt, "text");
                if (input === null) return;
                const num = parseInt(input.trim(), 10);
                if (!isNaN(num) && num >= 1 && num <= 7) {
                    dayNumber = num;
                } else {
                    const errModal = (msg) => new Promise(r => {
                        const ov = document.createElement("div");
                        ov.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:1100";
                        const m = document.createElement("div");
                        m.style.background = "#fff8ef"; m.style.borderRadius="16px"; m.style.padding="20px"; m.style.minWidth="250px";
                        m.innerHTML = `<p style="color:#b33;">${msg}</p><button id="errOk">OK</button>`;
                        m.querySelector("#errOk").style.cssText = "background:#8b4513;color:white;border:none;padding:8px 16px;border-radius:8px;margin-top:10px;cursor:pointer";
                        m.querySelector("#errOk").onclick = () => { document.body.removeChild(ov); r(); };
                        ov.appendChild(m); document.body.appendChild(ov);
                    });
                    await errModal(lang.errorDay);
                }
            }

            // 3. Вивід результату
            const dayName = lang.days[dayNumber - 1];
            await showModal("Результат", `${langCode === "ua" ? "День тижня" : "Day of week"}: ${dayName}`, "text", () => {});
        }

        startBtn.addEventListener("click", startDialog);
        containerDiv.appendChild(startBtn);

        const info = document.createElement("div");
        info.style.marginTop = "15px";
        info.style.fontSize = "13px";
        info.style.background = "#fef7e8";
        info.style.padding = "10px";
        info.style.borderRadius = "8px";
        info.innerHTML = "✔️ Використовується єдиний об'єкт мови. Регістр не важливий.";
        containerDiv.appendChild(info);
    }

    

    
    function buildTask2(containerDiv) {
        const desc = document.createElement("p");
        desc.textContent = "Розрахунок балансу електроенергії для заданої мережі (день/ніч). Визначення необхідної купівлі або продажу та вартості.";
        containerDiv.appendChild(desc);

        // ---------- Класи ----------
        class PowerPlant {
            constructor(capacityMW) {
                this.capacity = Math.min(100, Math.max(1, capacityMW));
            }
            generate(daytime) { return this.capacity; }
        }

        class SolarPanel {
            constructor(powerMW) {
                this.power = Math.min(5, Math.max(1, powerMW));
            }
            generate(daytime) { return daytime ? this.power : 0; }
        }

        class House {
            constructor(apartments) {
                this.apartments = Math.min(400, Math.max(1, apartments));
            }
            consume(daytime) {
                const perApartmentKW = daytime ? 4 : 1;
                return (this.apartments * perApartmentKW) / 1000;
            }
        }

        class PowerLine {
            constructor(maxMW, pricePerMW) {
                this.maxMW = maxMW;
                this.price = pricePerMW;
            }
        }

        // Мережа (можна змінювати)
        const network = {
            plants: [new PowerPlant(60), new PowerPlant(30)],
            solarPanels: [new SolarPanel(4), new SolarPanel(2), new SolarPanel(3)],
            houses: [new House(200), new House(150), new House(80)],
            lines: [new PowerLine(50, 45), new PowerLine(80, 55), new PowerLine(30, 40)]
        };

        function calculateBalance() {
            // День
            let genDay = network.plants.reduce((s,p)=>s+p.generate(true),0);
            genDay += network.solarPanels.reduce((s,p)=>s+p.generate(true),0);
            let consDay = network.houses.reduce((s,h)=>s+h.consume(true),0);
            let netDay = genDay - consDay;

            // Ніч
            let genNight = network.plants.reduce((s,p)=>s+p.generate(false),0);
            genNight += network.solarPanels.reduce((s,p)=>s+p.generate(false),0);
            let consNight = network.houses.reduce((s,h)=>s+h.consume(false),0);
            let netNight = genNight - consNight;

            function optimize(netBalance, lines) {
                if (Math.abs(netBalance) < 1e-6) return { energy: 0, cost: 0, action: "баланс" };
                const isSurplus = netBalance > 0;
                let remaining = Math.abs(netBalance);
                let sorted = [...lines].sort((a,b) => isSurplus ? b.price - a.price : a.price - b.price);
                let totalEnergy = 0;
                let totalCost = 0;
                for (let line of sorted) {
                    if (remaining <= 0) break;
                    let use = Math.min(line.maxMW, remaining);
                    remaining -= use;
                    totalEnergy += use;
                    if (isSurplus) totalCost -= use * line.price;
                    else totalCost += use * line.price;
                }
                if (remaining > 0) {
                    const lastPrice = sorted.length ? (isSurplus ? sorted[0].price : sorted[sorted.length-1].price) : 0;
                    if (isSurplus) totalCost -= remaining * lastPrice;
                    else totalCost += remaining * lastPrice;
                    totalEnergy += remaining;
                }
                return { energy: totalEnergy, cost: totalCost, action: isSurplus ? "продаж" : "купівля" };
            }

            const dayRes = optimize(netDay, network.lines);
            const nightRes = optimize(netNight, network.lines);

            return { day: { net: netDay, ...dayRes }, night: { net: netNight, ...nightRes } };
        }

        const resultDiv = document.createElement("div");
        resultDiv.style.background = "#fef7e8";
        resultDiv.style.padding = "15px";
        resultDiv.style.borderRadius = "12px";
        resultDiv.style.border = "1px solid #c29a6b";
        resultDiv.style.fontFamily = "monospace";
        resultDiv.style.fontSize = "14px";
        resultDiv.style.marginTop = "15px";

        const calcBtn = document.createElement("button");
        calcBtn.textContent = "🔌 Розрахувати баланс електромережі";
        calcBtn.style.cssText = "background:#8b4513;color:#fef0e0;border:none;padding:12px 20px;border-radius:12px;cursor:pointer;font-size:16px;width:100%;transition:0.2s";
        calcBtn.addEventListener("mouseenter", () => calcBtn.style.background = "#a0522d");
        calcBtn.addEventListener("mouseleave", () => calcBtn.style.background = "#8b4513");

        function updateResult() {
            const stats = calculateBalance();
            const formatMW = (val) => val.toFixed(2) + " МВт";
            const formatMoney = (val) => Math.abs(val).toFixed(2) + " грн" + (val < 0 ? " (прибуток)" : " (витрати)");
            resultDiv.innerHTML = `
                <strong>📊 Стан мережі:</strong><br>
                <strong>Вдень:</strong><br>
                Генерація: ${stats.day.net > 0 ? "надлишок" : "дефіцит"} ${formatMW(Math.abs(stats.day.net))}<br>
                ${stats.day.action === "баланс" ? "Баланс ідеальний" : `${stats.day.action === "продаж" ? "Продано" : "Куплено"} ${formatMW(stats.day.energy)} через лінії<br>Вартість: ${formatMoney(stats.day.cost)}`}<br><br>
                <strong>Вночі:</strong><br>
                Генерація: ${stats.night.net > 0 ? "надлишок" : "дефіцит"} ${formatMW(Math.abs(stats.night.net))}<br>
                ${stats.night.action === "баланс" ? "Баланс ідеальний" : `${stats.night.action === "продаж" ? "Продано" : "Куплено"} ${formatMW(stats.night.energy)} через лінії<br>Вартість: ${formatMoney(stats.night.cost)}`}
                <hr>
                <small>⚡ Склад мережі: <br>Електростанції: 60 МВт, 30 МВт<br>Сонячні панелі: 4,2,3 МВт (вдень)<br>Житлові будинки: 200,150,80 квартир<br>Лінії: 50МВт(45грн), 80МВт(55грн), 30МВт(40грн)</small>
            `;
        }
        calcBtn.addEventListener("click", updateResult);
        containerDiv.appendChild(calcBtn);
        containerDiv.appendChild(resultDiv);
        updateResult();
    }

  
    const task1Card = createTaskCard("Завдання 1: Модульне вікно (мова → день тижня)", buildTask1);
    const task2Card = createTaskCard("Завдання 2: Електромережа (ООП, баланс день/ніч)", buildTask2);
    container.appendChild(task1Card);
    container.appendChild(task2Card);

    
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