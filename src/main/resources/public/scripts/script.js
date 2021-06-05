const board = document.getElementById("board")
const size = 100
const position = function (el, number) {
    const colours = ["green", "red", "blue", "yellow", "lightgray"]

    el.style.backgroundColor = colours[number]

    let ob = {}
    ob["id"] = el.getAttribute("id")
    ob["type"] = document.getElementById('material_name').innerText

    for (let i = 0; i < level.length; i++) {
        if (el.getAttribute("id") == level[i].id) level.splice(i, 1)
    }

    if (document.getElementById('material_name').innerText != "delete" && document.getElementById('material_name').innerText != "nothing") level.push(ob)
    if (document.getElementById('material_name').innerText == "nothing") alert("Choose one of the types")

    document.querySelector("pre").innerText = JSON.stringify(level, null, ' ')
}
let number
let level = []

document.querySelector("pre").innerText = JSON.stringify(level)

for (let i = 0; i < size; i++) {
    let box = document.createElement("div")
    box.classList.add('box')
    box.setAttribute("id", i)

    box.addEventListener("click", function () {
        position(box, number)
    })

    board.appendChild(box)
}

const materials = document.querySelectorAll(".material")

for (let i = 0; i < materials.length; i++) {
    materials[i].addEventListener("click", function () {
        document.getElementById("material_name").innerText = materials[i].innerText.toLowerCase()
        document.getElementById("now").style.backgroundColor = materials[i].style.backgroundColor
        number = i
    })
}

document.getElementById("save_lvl").addEventListener("click", function () {
    const body = JSON.stringify({ "size": size, "list": level })
    const header = { "Content-Type": "application/json" }

    fetch("http://localhost:5000/save", { method: "post", body, header }) // fetch
        .then(response => response.json())
        .then(data => {
            var text = JSON.parse(data)["text"]
            alert(text)
        })
})

document.getElementById("save_test").addEventListener("click", function () {

    fetch("http://localhost:5000/test") // fetch
        .then(response => response.json())
        .then(data => {
            var text = JSON.parse(data)["text"]
            alert(text)
        })
})

document.getElementById("load_lvl").addEventListener("click", function () {
    const colours = ["green", "red", "blue", "yellow"]

    fetch("http://localhost:5000/load") // fetch
        .then(response => response.json())
        .then(data => {
            if (data["size"] == 0) alert("Nie zapisano jeszcze żadnego levelu !")
            else {
                document.querySelector("pre").innerText = JSON.stringify(data["list"], null, ' ')
                level = data["list"]

                for (let i = 0; i < size; i++) document.getElementById(i).style.backgroundColor = "lightgray"

                for (let i = 0; i < data["list"].length; i++) {
                    switch (data["list"][i].type) {
                        case 'wall':
                            document.getElementById(data["list"][i].id).style.backgroundColor = colours[0]
                            break;
                        case 'enemy':
                            document.getElementById(data["list"][i].id).style.backgroundColor = colours[1]
                            break;
                        case 'treasure':
                            document.getElementById(data["list"][i].id).style.backgroundColor = colours[2]
                            break;
                        case 'light':
                            document.getElementById(data["list"][i].id).style.backgroundColor = colours[3]
                            break;
                    }
                }
            }
        })
})