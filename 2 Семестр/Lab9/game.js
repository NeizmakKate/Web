$(function () {

    // ================= BODY =================
    $("body").css({
        margin: "0",
        padding: "0",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#e5e5e5",
        fontFamily: "Arial"
    });

    // ================= MAIN =================
    const container = $("<div></div>").css({
        width: "900px",
        padding: "30px",
        border: "4px solid black",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "30px",
        flexWrap: "wrap"
    });

    // ================= GRID =================
    const grid = $("<div></div>").css({
        display: "grid",
        gridTemplateColumns: "repeat(5, 80px)",
        gap: "5px"
    });

    // ================= RIGHT PANEL =================
    const rightPanel = $("<div></div>").css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px"
    });

    // ================= BUTTON =================
    const restartBtn = $("<button>Почати з початку</button>");
    restartBtn.button();

    restartBtn.css({
        fontSize: "20px",
        padding: "10px 20px"
    });

    // ================= TARGET IMAGE =================
    const targetBox = $("<div></div>").css({
        width: "100px",
        height: "100px",
        border: "2px solid #4a90e2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    });

    const targetImg = $("<img>").css({
        width: "80px",
        height: "80px"
    });

    targetBox.append(targetImg);

    // ================= IMAGES =================
    const images = [
        "🐶","🐱","🐭","🐹","🐰",
        "🦊","🐻","🐼","🐨","🐯",
        "🦁","🐮","🐷","🐸","🐵",
        "🐔","🐧","🐦","🐤","🦆",
        "🦅","🦉","🐴","🦋","🐞"
    ];

    let currentTarget = "";

    // ================= CREATE GRID =================
    function createGrid() {

        grid.empty();

        const shuffled = [...images].sort(() => Math.random() - 0.5);

        shuffled.forEach(animal => {

            const cell = $("<div></div>");

            cell.css({
                width: "80px",
                height: "80px",
                border: "1px solid gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "45px",
                cursor: "pointer",
                background: "#fafafa"
            });

            cell.text(animal);

            // hover
            cell.hover(
                function () {
                    $(this).css("background", "#d9ecff");
                },
                function () {
                    $(this).css("background", "#fafafa");
                }
            );

            // click
            cell.on("click", function () {

                if (animal === currentTarget) {

                    $(this).effect("bounce", 500);

                    setTimeout(() => {

                        chooseTarget();

                    }, 500);

                } else {

                    $(this).effect("shake", 500);
                }
            });

            grid.append(cell);
        });
    }

    // ================= TARGET =================
    function chooseTarget() {

        currentTarget =
            images[Math.floor(Math.random() * images.length)];

        targetImg.attr("src", "");
        targetImg.replaceWith(
            $("<div>")
                .text(currentTarget)
                .css({
                    fontSize: "60px"
                })
        );

        targetBox.empty();

        const emoji = $("<div>")
            .text(currentTarget)
            .css({
                fontSize: "60px"
            });

        targetBox.append(emoji);
    }

    // ================= RESTART =================
    restartBtn.on("click", function () {

        container.hide("explode", 500);

        setTimeout(() => {

            container.show("fade", 500);

            createGrid();
            chooseTarget();

        }, 600);
    });

    // ================= APPEND =================
    rightPanel.append(restartBtn);
    rightPanel.append(targetBox);

    container.append(grid);
    container.append(rightPanel);

    $("body").append(container);

    // ================= START =================
    createGrid();
    chooseTarget();

    // ================= ADAPTIVE =================
    function adaptive() {

        if ($(window).width() < 800) {

            container.css({
                width: "95%",
                flexDirection: "column"
            });

            grid.css({
                gridTemplateColumns: "repeat(5, 60px)"
            });

            grid.children().css({
                width: "60px",
                height: "60px",
                fontSize: "30px"
            });

        } else {

            container.css({
                flexDirection: "row"
            });

            grid.css({
                gridTemplateColumns: "repeat(5, 80px)"
            });

            grid.children().css({
                width: "80px",
                height: "80px",
                fontSize: "45px"
            });
        }
    }

    adaptive();

    $(window).on("resize", adaptive);

});