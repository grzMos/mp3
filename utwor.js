class Utwor {

    constructor() {
        this.tab2 = [];
        this.tab = []
        this.goBack();
        this.goNext();
        this.PaSt();
        this.End();
        this.Time();
        this.Name();
        this.Slide();
    }
    createUtwor(music, album, rozmiar) {
        var kol = document.createElement("tr")
        $(kol).on("click", function () {
            $("#audio").trigger("stop");
            $("#audio_src").attr("src", "/mp3/" + album + "/" + music);
            $("#audio").trigger('load');
            $("#audio").trigger("play");
            $("#play").attr("src", "img/stop.png")
            console.log(music)
        }.bind(this))
        var line = document.createElement("td")
        line.innerText = album
        kol.appendChild(line)
        var line = document.createElement("td")
        line.innerText = music
        this.tab.push("/mp3/" + album + "/" + music)
        this.tab2.push(music)
        $("#audio_src").attr("src", this.tab[0])
        var aud = document.getElementById("audio")
        aud.volume = 0.3
        kol.appendChild(line)
        var line = document.createElement("td")
        line.innerText = (rozmiar / 1000 / 1000).toFixed(2) + " MB"
        kol.appendChild(line)
        document.getElementById("table").appendChild(kol)
        $(".covers").on("click", function () {
            this.tab = []
            this.tab2 = []
        }.bind(this))
    }
    Name() {
        $("#audio").on("loadeddata", function () {
            console.log(this.tab2)
            if (this.tab2[this.tab.indexOf($("#audio_src").attr("src"))] == undefined)
                document.getElementById("name").innerHTML = "Billie Eilish - bury a friend (Lyrics).mp3"
            else
                document.getElementById("name").innerHTML = this.tab2[this.tab.indexOf($("#audio_src").attr("src"))]
        }.bind(this))

    }
    End() {
        $("#audio").on("ended", function () {
            console.log(this.tab)
            console.log(this.tab.indexOf($("#audio_src").attr("src")))
            if (this.tab.indexOf($("#audio_src").attr("src")) == this.tab.length - 1) {
                // $("#play").attr("src", "img/stop.png")
                $("#audio_src").attr("src", this.tab[0])
                $("#audio").trigger('load');
                $("#audio").prop("currentTime", 0);
                $("#audio").trigger("play");
            } else {
                // $("#play").attr("src", "img/stop.png")
                $("#audio_src").attr("src", this.tab[this.tab.indexOf($("#audio_src").attr("src")) + 1])
                $("#audio").trigger('load');
                $("#audio").prop("currentTime", 0);
                $("#audio").trigger("play");
            }
        }.bind(this))
    }
    Slide() {
        $("#audio").on("loadeddata", function () {
            $("#where").css("width", 0)
            myMove();
            console.log("siemka")
        })
        function myMove() {
            var dl = $("#audio").prop("duration")
            var x = parseFloat($("#where").css("width").slice(0, 1))
            console.log(x)
            var jed = 300 / dl
            var id = setInterval(frame, 1000);
            function frame() {
                if ($("#play").attr("src") == "img/stop.png") {
                    $("#play").on("click", function () {
                        clearInterval(id)
                    })
                }
                $("tr").on("click", function () {
                    clearInterval(id)
                })
                $("#back").on("click", function () {
                    clearInterval(id)
                })
                $("#forward").on("click", function () {
                    clearInterval(id)
                })
                if (Math.floor(x) == 300) {
                    clearInterval(id)
                } else {
                    x = x + jed
                    $("#where").css("width", x);
                }
            }
        }
    }

    Time() {
        $("#audio").on("loadeddata", function () {
            var aktualny = "00:00"
            var durationMin = Math.floor($("#audio").prop("duration") / 60)
            if (durationMin < 10) {
                durationMin = "0" + durationMin
            }
            var durationSec = Math.floor($("#audio").prop("duration") % 60)
            if (durationSec < 10) {
                durationSec = "0" + durationSec
            }
            $("#audio").on("timeupdate", function () {
                var currentMin = Math.floor($("#audio").prop("currentTime") / 60)
                if (currentMin < 10) {
                    currentMin = "0" + currentMin
                }
                var currentSec = Math.floor($("#audio").prop("currentTime") % 60)
                if (currentSec < 10) {
                    currentSec = "0" + currentSec
                }
                aktualny = currentMin + ":" + currentSec
                document.getElementById("time").innerHTML = aktualny + "/" + durationMin + ":" + durationSec
            });

        })
    }
    PaSt() {
        var granie = false
        console.log($("#play").attr("src"))
        $("#play").on("click", function () {
            if ($("#play").attr("src") == "img/stop.png") {

                $("#play").attr("src", "img/play.png")
                $("#audio").trigger('pause');
                granie = false
            }
            else if ($("#play").attr("src") == "img/play.png") {
                $("#audio").trigger("play"); {
                    granie = true
                    console.log(granie)
                }
                $("#play").attr("src", "img/stop.png")
            }
        })
    }
    goBack() {
        $("#back").on("click", function () {
            // console.log(this.tab)
            // console.log(this.tab.indexOf($("#audio_src").attr("src")))
            if (this.tab.indexOf($("#audio_src").attr("src")) == 0) {
                $("#audio").trigger("stop");
                // $("#play").attr("src", "img/stop.png")
                $("#audio_src").attr("src", this.tab[this.tab.indexOf($("#audio_src").attr("src")) + this.tab.length - 1])
                $("#audio").trigger('load');
                if ($("#play").attr("src") == "img/stop.png") {
                    $("#audio").trigger("play");
                }
            } else {
                $("#audio").trigger("stop");
                // $("#play").attr("src", "img/stop.png")
                $("#audio_src").attr("src", this.tab[this.tab.indexOf($("#audio_src").attr("src")) - 1])
                $("#audio").trigger('load');
                if ($("#play").attr("src") == "img/stop.png") {
                    $("#audio").trigger("play");
                }
            }
        }.bind(this))
    }
    goNext() {
        $("#forward").on("click", function () {
            // console.log(this.tab)
            if (this.tab.indexOf($("#audio_src").attr("src")) == this.tab.length - 1) {
                $("#audio").trigger("stop");
                // $("#play").attr("src", "img/stop.png")
                $("#audio_src").attr("src", this.tab[0])
                $("#audio").trigger('load');
                if ($("#play").attr("src") == "img/stop.png") {
                    $("#audio").trigger("play");
                }
            } else {
                $("#audio").trigger("stop");
                // $("#play").attr("src", "img/stop.png")
                $("#audio_src").attr("src", this.tab[this.tab.indexOf($("#audio_src").attr("src")) + 1])
                $("#audio").trigger('load');
                if ($("#play").attr("src") == "img/stop.png") {
                    $("#audio").trigger("play");
                }
            }
        }.bind(this))
    }
}

