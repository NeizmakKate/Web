function AboutMe() {
    return React.createElement(
        "div",
        { className: "section" },

        React.createElement("h2", null, "Про мене"),

        React.createElement(
            "p",
            null,
            "Мене звати Катерина. Я навчаюсь на спеціальності 'Комп'ютерні науки'."
        ),

        React.createElement(
            "p",
            null,
            "Вивчаю HTML, CSS, JavaScript та React."
        )
    );
}

function Hobby() {
    return React.createElement(
        "div",
        { className: "section" },

        React.createElement("h2", null, "Моє хобі"),

        React.createElement(
            "p",
            null,
            "Моє хобі — програмування та веб-розробка."
        ),

        React.createElement(
            "p",
            null,
            "Мені подобається створювати сайти та працювати з JavaScript і React."
        )
    );
}

class App extends React.Component {
    render() {
        return React.createElement(
            "div",
            { className: "card" },

            React.createElement(
                "h1",
                null,
                "Лабораторна робота з React.js"
            ),

            React.createElement(AboutMe),
            React.createElement(Hobby)
        );
    }
}

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    React.createElement(App)
);