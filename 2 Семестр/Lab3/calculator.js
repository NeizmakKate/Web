
(function() {
   
    const body = document.body;
    body.style.margin = "0";
    body.style.minHeight = "100vh";
    body.style.display = "flex";
    body.style.justifyContent = "center";
    body.style.alignItems = "center";
    body.style.background = "linear-gradient(145deg, #1e2a3a 0%, #0f1724 100%)";
    body.style.fontFamily = "'Segoe UI', 'Poppins', system-ui, sans-serif";

   
    const calculator = document.createElement("div");
    calculator.style.background = "#1e1f2c";
    calculator.style.borderRadius = "2.5rem";
    calculator.style.padding = "1.5rem";
    calculator.style.boxShadow = "0 25px 45px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)";
    calculator.style.width = "320px";
    calculator.style.transition = "all 0.2s";

    const displayDiv = document.createElement("div");
    displayDiv.style.background = "#0b0c10";
    displayDiv.style.borderRadius = "1.8rem";
    displayDiv.style.padding = "1.2rem";
    displayDiv.style.marginBottom = "1.8rem";
    displayDiv.style.boxShadow = "inset 0 4px 8px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)";

    const displayInput = document.createElement("input");
    displayInput.type = "text";
    displayInput.value = "0";
    displayInput.readOnly = true;
    displayInput.style.width = "100%";
    displayInput.style.background = "transparent";
    displayInput.style.border = "none";
    displayInput.style.fontSize = "2.8rem";
    displayInput.style.fontWeight = "500";
    displayInput.style.color = "#f0f3f8";
    displayInput.style.textAlign = "right";
    displayInput.style.fontFamily = "'Courier New', 'Fira Code', monospace";
    displayInput.style.outline = "none";
    displayInput.style.padding = "0";

    displayDiv.appendChild(displayInput);
    calculator.appendChild(displayDiv);

    
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.flexDirection = "column";
    buttonsContainer.style.gap = "0.8rem";

   
    const buttonsLayout = [
        ["AC", "+/-", "%", "÷"],
        ["7", "8", "9", "×"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", ".", "="]
    ];

    let expression = "";
    let lastResult = false;

    function updateDisplay(value) {
        displayInput.value = value;
    }

    
    function applyButtonStyles(btn, symbol) {
        btn.style.border = "none";
        btn.style.fontSize = "1.6rem";
        btn.style.fontWeight = "600";
        btn.style.padding = "1rem 0";
        btn.style.borderRadius = "1.8rem";
        btn.style.cursor = "pointer";
        btn.style.transition = "all 0.2s ease";
        btn.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
        btn.style.flex = "1 1 0px";
        btn.style.fontFamily = "inherit";
        btn.style.color = "white";

        if (symbol === "AC") {
            btn.style.backgroundColor = "#e67e22";
        } else if (symbol === "=") {
            btn.style.backgroundColor = "#2ecc71";
            btn.style.color = "#1e1f2c";
            btn.style.fontWeight = "800";
        } else if (["÷", "×", "-", "+"].includes(symbol)) {
            btn.style.backgroundColor = "#f39c12";
            btn.style.color = "#1e1f2c";
        } else if (["+/-", "%"].includes(symbol)) {
            btn.style.backgroundColor = "#3d404f";
        } else {
            btn.style.backgroundColor = "#2c2e3a";
        }
    }

    
    function createButton(symbol) {
        const button = document.createElement("button");
        button.textContent = symbol;
        applyButtonStyles(button, symbol);

       
        button.addEventListener("mouseenter", () => {
            button.style.opacity = "0.8";
        });
        button.addEventListener("mouseleave", () => {
            button.style.opacity = "1";
        });

        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.96)";
            button.style.boxShadow = "0 1px 2px black";
        });
        button.addEventListener("mouseup", () => {
            button.style.transform = "scale(1)";
            button.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
        });

        
        button.addEventListener("click", () => {
            if (symbol === "AC") {
                expression = "";
                updateDisplay("0");
                lastResult = false;
                return;
            }

            if (symbol === "=") {
                try {
                    const result = eval(
                        expression
                            .replace(/÷/g, "/")
                            .replace(/×/g, "*")
                    );
                    if (!isFinite(result)) throw new Error();
                    displayInput.value = result;
                    expression = result.toString();
                    lastResult = true;
                } catch {
                    displayInput.value = "Помилка";
                    expression = "";
                    lastResult = false;
                }
                return;
            }

            if (symbol === "+/-") {
                if (expression && !lastResult) {
                    const num = parseFloat(expression);
                    if (!isNaN(num)) {
                        expression = (num * -1).toString();
                        updateDisplay(expression);
                    }
                } else if (lastResult && expression) {
                    const num = parseFloat(expression);
                    if (!isNaN(num)) {
                        expression = (num * -1).toString();
                        updateDisplay(expression);
                        lastResult = false;
                    }
                }
                return;
            }

            if (symbol === "%") {
                if (expression && !lastResult) {
                    const num = parseFloat(expression);
                    if (!isNaN(num)) {
                        expression = (num / 100).toString();
                        updateDisplay(expression);
                    }
                } else if (lastResult && expression) {
                    const num = parseFloat(expression);
                    if (!isNaN(num)) {
                        expression = (num / 100).toString();
                        updateDisplay(expression);
                        lastResult = false;
                    }
                }
                return;
            }

            
            if (lastResult && !["÷", "×", "-", "+"].includes(symbol)) {
                expression = "";
                lastResult = false;
            }

            if (displayInput.value === "Помилка") {
                expression = "";
            }

            
            const lastChar = expression.slice(-1);
            const operators = ["÷", "×", "-", "+"];
            if (operators.includes(lastChar) && operators.includes(symbol)) {
                expression = expression.slice(0, -1) + symbol;
            } else {
                expression += symbol;
            }

            if (symbol === ".") {
                const parts = expression.split(/[÷×\+\-]/);
                const lastNumber = parts[parts.length - 1];
                if (lastNumber.includes(".")) {
                    return;
                }
            }

            updateDisplay(expression);
        });

        return button;
    }

   
    for (let row of buttonsLayout) {
        const rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.gap = "0.8rem";
        rowDiv.style.justifyContent = "space-between";

        for (let sym of row) {
            const btn = createButton(sym);
            if (sym === "0") {
                btn.style.flex = "2.2";
            }
            rowDiv.appendChild(btn);
        }
        buttonsContainer.appendChild(rowDiv);
    }

    calculator.appendChild(buttonsContainer);
    document.body.appendChild(calculator);

    function handleResponsive() {
        const width = window.innerWidth;
        if (width <= 400) {
            calculator.style.width = "280px";
            calculator.style.padding = "1rem";
            const allBtns = document.querySelectorAll("button");
            allBtns.forEach(btn => {
                btn.style.fontSize = "1.3rem";
                btn.style.padding = "0.7rem 0";
            });
            displayInput.style.fontSize = "2.2rem";
        } else {
            calculator.style.width = "320px";
            calculator.style.padding = "1.5rem";
            const allBtns = document.querySelectorAll("button");
            allBtns.forEach(btn => {
                btn.style.fontSize = "1.6rem";
                btn.style.padding = "1rem 0";
            });
            displayInput.style.fontSize = "2.8rem";
        }
    }

    handleResponsive();
    window.addEventListener("resize", handleResponsive);

    
    document.addEventListener("keydown", (e) => {
        const key = e.key;
        const allowed = ["0","1","2","3","4","5","6","7","8","9",".","+","-","*","/","%","Enter","Escape","Backspace"];
        if (!allowed.includes(key)) return;
        e.preventDefault();

        if (key === "Enter") {
            const eqBtn = Array.from(document.querySelectorAll("button")).find(btn => btn.textContent === "=");
            if (eqBtn) eqBtn.click();
            return;
        }
        if (key === "Escape") {
            const acBtn = Array.from(document.querySelectorAll("button")).find(btn => btn.textContent === "AC");
            if (acBtn) acBtn.click();
            return;
        }
        if (key === "Backspace") {
            if (expression.length > 0) {
                expression = expression.slice(0, -1);
                updateDisplay(expression || "0");
                lastResult = false;
            } else {
                updateDisplay("0");
            }
            return;
        }
        let mappedKey = key;
        if (key === "*") mappedKey = "×";
        if (key === "/") mappedKey = "÷";
        const targetBtn = Array.from(document.querySelectorAll("button")).find(btn => btn.textContent === mappedKey);
        if (targetBtn) targetBtn.click();
    });
})();