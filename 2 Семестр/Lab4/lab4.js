(function() {
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

    const title = document.createElement("h1");
    title.textContent = "Лабораторна робота №4: Функції, масиви, умови";
    title.style.textAlign = "center";
    title.style.color = "#f5e6d3";
    title.style.marginBottom = "30px";
    title.style.fontWeight = "600";
    container.appendChild(title);

    function createCard(titleText, description, inputAreaGenerator, buttonText, resultHandler) {
        const card = document.createElement("div");
        card.style.background = "rgba(245, 222, 179, 0.9)";
        card.style.backdropFilter = "blur(12px)";
        card.style.borderRadius = "16px";
        card.style.padding = "20px";
        card.style.marginBottom = "20px";
        card.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
        card.style.transition = "transform 0.25s, box-shadow 0.25s";

        const h2 = document.createElement("h2");
        h2.textContent = titleText;
        h2.style.marginTop = "0";
        h2.style.fontSize = "1.25rem";
        h2.style.color = "#4a2a0e";
        card.appendChild(h2);

        const desc = document.createElement("p");
        desc.textContent = description;
        desc.style.fontSize = "0.95rem";
        desc.style.color = "#6b4226";
        card.appendChild(desc);

        let inputContainer = null;
        if (inputAreaGenerator) {
            inputContainer = document.createElement("div");
            inputContainer.style.marginBottom = "15px";
            inputAreaGenerator(inputContainer);
            card.appendChild(inputContainer);
        }

        const btn = document.createElement("button");
        btn.textContent = buttonText;
        btn.style.background = "#8b4513";
        btn.style.color = "#fef0e0";
        btn.style.border = "none";
        btn.style.padding = "10px 18px";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "14px";
        btn.style.transition = "all 0.25s ease";
        btn.addEventListener("mouseenter", () => btn.style.background = "#a0522d");
        btn.addEventListener("mouseleave", () => btn.style.background = "#8b4513");
        card.appendChild(btn);

        const resultDiv = document.createElement("div");
        resultDiv.style.marginTop = "15px";
        resultDiv.style.padding = "12px";
        resultDiv.style.background = "#fef7e8";
        resultDiv.style.borderRadius = "8px";
        resultDiv.style.fontFamily = "monospace";
        resultDiv.style.whiteSpace = "pre-wrap";
        resultDiv.style.fontSize = "13px";
        resultDiv.style.border = "1px solid #c29a6b";
        resultDiv.style.color = "#3b2a1f";
        resultDiv.textContent = "Тут буде результат...";
        card.appendChild(resultDiv);

        btn.addEventListener("click", () => {
            try {
                const result = resultHandler(inputContainer);
                resultDiv.textContent = result;
            } catch (err) {
                resultDiv.textContent = "Помилка: " + err.message;
            }
        });

        return card;
    }

    
    const task1 = createCard(
        "1. Залишок від ділення на 60",
        "Функція seconds(total) = total % 60",
        (cont) => {
            const inp = document.createElement("input");
            inp.type = "number";
            inp.placeholder = "Введіть число total";
            inp.style.padding = "8px";
            inp.style.width = "100%";
            inp.style.background = "#fff6ea";
            inp.style.border = "1px solid #c29a6b";
            inp.style.borderRadius = "6px";
            cont.appendChild(inp);
            cont.inp = inp;
        },
        "Обчислити",
        (cont) => {
            const total = parseInt(cont.inp.value);
            if (isNaN(total)) return "Введіть число";
            return `seconds(${total}) = ${total % 60}`;
        }
    );
    container.appendChild(task1);

    
    const task2 = createCard(
        "2. Периметр многокутника",
        "P = side * count",
        (cont) => {
            const side = document.createElement("input");
            side.type = "number";
            side.placeholder = "Сторона";
            side.style.width = "48%";
            side.style.marginRight = "4%";
            side.style.background = "#fff6ea";
            side.style.border = "1px solid #c29a6b";
            side.style.borderRadius = "6px";
            side.style.padding = "8px";
            const count = document.createElement("input");
            count.type = "number";
            count.placeholder = "Кількість сторін";
            count.style.width = "48%";
            count.style.background = "#fff6ea";
            count.style.border = "1px solid #c29a6b";
            count.style.borderRadius = "6px";
            count.style.padding = "8px";
            cont.appendChild(side);
            cont.appendChild(count);
            cont.side = side;
            cont.count = count;
        },
        "Розрахувати",
        (cont) => {
            const s = parseFloat(cont.side.value);
            const c = parseInt(cont.count.value);
            if (isNaN(s) || isNaN(c)) return "Введіть обидва числа";
            return `${s} * ${c} = ${s * c}`;
        }
    );
    container.appendChild(task2);

    
    const task3 = createCard(
        "3. FizzBuzz",
        "Виводить числа від 1 до n (кратні 3→fizz, 5→buzz, 3&5→fizzbuzz)",
        (cont) => {
            const inp = document.createElement("input");
            inp.type = "number";
            inp.placeholder = "n";
            inp.style.width = "100%";
            inp.style.background = "#fff6ea";
            inp.style.border = "1px solid #c29a6b";
            inp.style.borderRadius = "6px";
            inp.style.padding = "8px";
            cont.appendChild(inp);
            cont.inp = inp;
        },
        "Виконати",
        (cont) => {
            let n = parseInt(cont.inp.value);
            if (isNaN(n) || n < 1) return "Введіть ціле число >= 1";
            let out = [];
            for (let i = 1; i <= n; i++) {
                if (i % 15 === 0) out.push("fizzbuzz");
                else if (i % 3 === 0) out.push("fizz");
                else if (i % 5 === 0) out.push("buzz");
                else out.push(i);
            }
            console.log(out.join(", "));
            return out.join(", ");
        }
    );
    container.appendChild(task3);

    
    const task4 = createCard(
        "4. Середнє арифметичне трьох чисел",
        "Calculate(a,b,c) = (a+b+c)/3",
        (cont) => {
            let inputs = [];
            for (let i = 0; i < 3; i++) {
                let inp = document.createElement("input");
                inp.type = "number";
                inp.placeholder = `Число ${i+1}`;
                inp.style.width = "30%";
                inp.style.marginRight = "3%";
                inp.style.background = "#fff6ea";
                inp.style.border = "1px solid #c29a6b";
                inp.style.borderRadius = "6px";
                inp.style.padding = "8px";
                cont.appendChild(inp);
                inputs.push(inp);
            }
            cont.inputs = inputs;
        },
        "Обчислити",
        (cont) => {
            const nums = cont.inputs.map(inp => parseFloat(inp.value));
            if (nums.some(isNaN)) return "Введіть всі три числа";
            const avg = nums.reduce((a,b) => a+b, 0) / 3;
            return `(${nums.join(" + ")}) / 3 = ${avg}`;
        }
    );
    container.appendChild(task4);

    
    const task5 = createCard(
        "5. Перевірка подільності n на x та y",
        "Три способи: if, тернарний, логічний",
        (cont) => {
            const n = document.createElement("input"); n.type = "number"; n.placeholder = "n"; n.style.width = "30%"; n.style.marginRight = "3%";
            const x = document.createElement("input"); x.type = "number"; x.placeholder = "x"; x.style.width = "30%"; x.style.marginRight = "3%";
            const y = document.createElement("input"); y.type = "number"; y.placeholder = "y"; y.style.width = "30%";
            [n,x,y].forEach(i => {
                i.style.background = "#fff6ea";
                i.style.border = "1px solid #c29a6b";
                i.style.borderRadius = "6px";
                i.style.padding = "8px";
                cont.appendChild(i);
            });
            cont.n = n; cont.x = x; cont.y = y;
        },
        "Перевірити",
        (cont) => {
            const n = parseInt(cont.n.value), x = parseInt(cont.x.value), y = parseInt(cont.y.value);
            if (isNaN(n) || isNaN(x) || isNaN(y) || x===0 || y===0) return "Коректні числа (x,y ≠ 0)";
            const resIf = (n % x === 0 && n % y === 0) ? "так" : "ні";
            const resTernary = (n % x === 0 && n % y === 0) ? "так" : "ні";
            const resLogical = (n % x === 0 && n % y === 0) && "так" || "ні";
            return `if: ${resIf}\nтернарний: ${resTernary}\nлогічний: ${resLogical}`;
        }
    );
    container.appendChild(task5);

    
    const task6 = createCard(
        "6. Аналіз масиву (мінімум, максимум, сума, середнє, непарні)",
        "Створюється масив випадкових цілих чисел",
        (cont) => {
            const inp = document.createElement("input");
            inp.type = "number";
            inp.placeholder = "Розмір масиву N";
            inp.style.width = "100%";
            inp.style.background = "#fff6ea";
            inp.style.border = "1px solid #c29a6b";
            inp.style.borderRadius = "6px";
            inp.style.padding = "8px";
            cont.appendChild(inp);
            cont.inp = inp;
        },
        "Згенерувати",
        (cont) => {
            let N = parseInt(cont.inp.value);
            if (isNaN(N) || N < 1) return "Введіть N ≥ 1";
            const arr = Array.from({length: N}, () => Math.floor(Math.random() * 101) - 50);
            const min = Math.min(...arr);
            const max = Math.max(...arr);
            const sum = arr.reduce((a,b) => a+b, 0);
            const avg = sum / N;
            const odd = arr.filter(x => x % 2 !== 0);
            return `Масив: [${arr.join(", ")}]\n\nМін: ${min}\nМакс: ${max}\nСума: ${sum}\nСереднє: ${avg.toFixed(2)}\nНепарні: [${odd.join(", ")}]`;
        }
    );
    container.appendChild(task6);

    
    const task7 = createCard(
        "7. Двовимірний масив 5x5, головна діагональ",
        "Від'ємні на 0, додатні на 1",
        null,
        "Згенерувати",
        () => {
            let matrix = Array(5).fill().map(() => Array(5).fill().map(() => Math.floor(Math.random() * 31) - 15));
            const original = matrix.map(row => [...row]);
            for (let i = 0; i < 5; i++) {
                if (matrix[i][i] < 0) matrix[i][i] = 0;
                else if (matrix[i][i] > 0) matrix[i][i] = 1;
            }
            const format = (mat) => mat.map(row => row.join("\t")).join("\n");
            return `Початкова:\n${format(original)}\n\nПісля зміни:\n${format(matrix)}`;
        }
    );
    container.appendChild(task7);

    
    const task8 = createCard(
        "8. Арифметичні операції",
        "Виберіть операцію: +, -, ×, ÷ (перевірка на 0)",
        (cont) => {
            const a = document.createElement("input"); a.type = "number"; a.placeholder = "Число A"; a.style.width = "30%"; a.style.marginRight = "3%";
            const b = document.createElement("input"); b.type = "number"; b.placeholder = "Число B"; b.style.width = "30%"; b.style.marginRight = "3%";
            const sel = document.createElement("select");
            sel.innerHTML = `<option value="add">Додавання (+)</option><option value="sub">Віднімання (-)</option><option value="mul">Множення (×)</option><option value="div">Ділення (÷)</option>`;
            [a,b,sel].forEach(el => {
                if (el !== sel) {
                    el.style.background = "#fff6ea";
                    el.style.border = "1px solid #c29a6b";
                    el.style.borderRadius = "6px";
                    el.style.padding = "8px";
                } else {
                    sel.style.background = "#fff6ea";
                    sel.style.border = "1px solid #c29a6b";
                    sel.style.borderRadius = "6px";
                    sel.style.padding = "8px";
                }
                cont.appendChild(el);
            });
            cont.a = a; cont.b = b; cont.sel = sel;
        },
        "Обчислити",
        (cont) => {
            const a = parseFloat(cont.a.value), b = parseFloat(cont.b.value);
            if (isNaN(a) || isNaN(b)) return "Введіть обидва числа";
            let res;
            switch (cont.sel.value) {
                case "add": res = a + b; break;
                case "sub": res = a - b; break;
                case "mul": res = a * b; break;
                case "div": if (b === 0) return "Помилка: ділення на 0!"; res = a / b; break;
                default: return "Невідома операція";
            }
            return `${a} ${cont.sel.value === "add" ? "+" : cont.sel.value === "sub" ? "-" : cont.sel.value === "mul" ? "×" : "÷"} ${b} = ${res}`;
        }
    );
    container.appendChild(task8);

    
    const task9 = createCard(
        "9. Аналіз числа",
        "Визначає: знак, просте, ділення на 2,3,5,6,9",
        (cont) => {
            const inp = document.createElement("input");
            inp.type = "number";
            inp.placeholder = "Введіть ціле число";
            inp.style.width = "100%";
            inp.style.background = "#fff6ea";
            inp.style.border = "1px solid #c29a6b";
            inp.style.borderRadius = "6px";
            inp.style.padding = "8px";
            cont.appendChild(inp);
            cont.inp = inp;
        },
        "Аналізувати",
        (cont) => {
            let n = parseInt(cont.inp.value);
            if (isNaN(n)) return "Введіть число";
            const sign = n > 0 ? "позитивне" : (n < 0 ? "негативне" : "нуль");
            let isPrime = false;
            if (n > 1) {
                isPrime = true;
                for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) { isPrime = false; break; }
            }
            const divs = [];
            if (n % 2 === 0) divs.push(2);
            if (n % 3 === 0) divs.push(3);
            if (n % 5 === 0) divs.push(5);
            if (n % 6 === 0) divs.push(6);
            if (n % 9 === 0) divs.push(9);
            return `Число ${n}: ${sign}\nПросте: ${isPrime ? "так" : "ні"}\nДілиться без остачі на: ${divs.length ? divs.join(", ") : "жодне з (2,3,5,6,9)"}`;
        }
    );
    container.appendChild(task9);

    
    const task10 = createCard(
        "10. Перевернутий масив та квадрати чисел",
        "Введіть масив через кому (наприклад: 2, cat, 4, 6, text)",
        (cont) => {
            const inp = document.createElement("input");
            inp.type = "text";
            inp.placeholder = "елементи через кому";
            inp.style.width = "100%";
            inp.style.background = "#fff6ea";
            inp.style.border = "1px solid #c29a6b";
            inp.style.borderRadius = "6px";
            inp.style.padding = "8px";
            cont.appendChild(inp);
            cont.inp = inp;
        },
        "Перетворити",
        (cont) => {
            const raw = cont.inp.value;
            if (!raw.trim()) return "Введіть масив";
            let items = raw.split(",").map(s => s.trim());
            let reversed = [...items].reverse();
            let transformed = reversed.map(item => {
                let num = parseFloat(item);
                if (!isNaN(num) && isFinite(num)) return (num * num).toString();
                return item;
            });
            return `Оригінал: [${items.join(", ")}]\nПеревернутий з квадратами чисел: [${transformed.join(", ")}]`;
        }
    );
    container.appendChild(task10);

    // Завдання 11
    const task11 = createCard(
        "11. Видалення дублікатів",
        "Введіть масив через кому (наприклад: 1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6)",
        (cont) => {
            const inp = document.createElement("input");
            inp.type = "text";
            inp.placeholder = "елементи через кому";
            inp.style.width = "100%";
            inp.style.background = "#fff6ea";
            inp.style.border = "1px solid #c29a6b";
            inp.style.borderRadius = "6px";
            inp.style.padding = "8px";
            cont.appendChild(inp);
            cont.inp = inp;
        },
        "Видалити дублікати",
        (cont) => {
            const raw = cont.inp.value;
            if (!raw.trim()) return "Введіть масив";
            let items = raw.split(",").map(s => s.trim());
            let unique = [];
            for (let v of items) if (!unique.includes(v)) unique.push(v);
            return `Оригінал: [${items.join(", ")}]\nБез дублікатів: [${unique.join(", ")}]`;
        }
    );
    container.appendChild(task11);

    // Адаптивність
    function adapt() {
        if (window.innerWidth <= 600) {
            container.style.maxWidth = "100%";
            document.querySelectorAll(".result-area").forEach(div => div.style.fontSize = "11px");
        } else {
            container.style.maxWidth = "1000px";
            document.querySelectorAll(".result-area").forEach(div => div.style.fontSize = "13px");
        }
    }
    adapt();
    window.addEventListener("resize", adapt);

    document.body.appendChild(container);
})();