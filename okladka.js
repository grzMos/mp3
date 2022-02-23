class Okladka {

    constructor() {

    }
    createOkladka(cover) {

        var x = document.createElement("div")
        x.className = "covers"
        x.style.backgroundImage = "url(/covers/" + cover + ".jpg)"
        x.addEventListener("click", function () {
            net.sendData(cover);
            console.log(cover)
        })
        document.getElementById("left").appendChild(x)
    }


}

