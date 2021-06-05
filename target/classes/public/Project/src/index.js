import Main from './components/Main';
import './components/style.css'

function init() {
    //var res = { "size": 100, "list": [{ "id": 99, "type": "wall" }, { "id": 96, "type": "wall" }, { "id": 95, "type": "wall" }, { "id": 94, "type": "wall" }, { "id": 93, "type": "wall" }, { "id": 92, "type": "wall" }, { "id": 91, "type": "wall" }, { "id": 90, "type": "wall" }, { "id": 80, "type": "wall" }, { "id": 70, "type": "wall" }, { "id": 60, "type": "wall" }, { "id": 50, "type": "wall" }, { "id": 40, "type": "wall" }, { "id": 30, "type": "wall" }, { "id": 20, "type": "wall" }, { "id": 10, "type": "wall" }, { "id": 0, "type": "wall" }, { "id": 1, "type": "wall" }, { "id": 2, "type": "wall" }, { "id": 3, "type": "wall" }, { "id": 4, "type": "wall" }, { "id": 5, "type": "wall" }, { "id": 6, "type": "wall" }, { "id": 7, "type": "wall" }, { "id": 8, "type": "wall" }, { "id": 9, "type": "wall" }, { "id": 19, "type": "wall" }, { "id": 29, "type": "wall" }, { "id": 39, "type": "wall" }, { "id": 49, "type": "wall" }, { "id": 59, "type": "wall" }, { "id": 69, "type": "wall" }, { "id": 79, "type": "wall" }, { "id": 89, "type": "wall" }, { "id": 98, "type": "light" }, { "id": 97, "type": "light" }, { "id": 86, "type": "wall" }, { "id": 76, "type": "wall" }, { "id": 66, "type": "wall" }, { "id": 56, "type": "wall" }, { "id": 35, "type": "wall" }, { "id": 32, "type": "wall" }, { "id": 42, "type": "wall" }, { "id": 55, "type": "wall" }, { "id": 45, "type": "wall" }, { "id": 46, "type": "enemy" }, { "id": 52, "type": "wall" }, { "id": 43, "type": "wall" }, { "id": 44, "type": "wall" }, { "id": 34, "type": "enemy" }, { "id": 33, "type": "enemy" }, { "id": 85, "type": "enemy" }, { "id": 65, "type": "enemy" }, { "id": 75, "type": "treasure" }, { "id": 18, "type": "light" }, { "id": 11, "type": "light" }, { "id": 72, "type": "light" }, { "id": 54, "type": "enemy" }, { "id": 53, "type": "enemy" }, { "id": 36, "type": "light" }, { "id": 62, "type": "wall" }, { "id": 15, "type": "enemy" }] }
    fetch("http://localhost:5000/load")
        .then(res => res.json())
        .then(res => {
            if (res.size == 0) {
                alert("Na serwerze nie został zapisany żaden lvl")

                var quit = document.createElement("a")
                quit.setAttribute("href", "/")
                document.body.appendChild(quit)
                quit.click()
            }

            const container = document.getElementById('root');

            new Main(container, res);
        })
}

init();