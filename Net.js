class Net {
    constructor() {

    }
    sendData(album) {
        $.ajax({
            url: "adres serwera",
            data: { a: "next", okladka: album },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane

                // alert(data)
                var finish = JSON.parse(data)
                // console.log(finish.dirs)
                // for (var i = 0; i < finish.dirs.length; i++) {
                //     cover.createOkladka(finish.dirs[i])
                // }
                document.getElementById("table").innerHTML = ""
                for (var i = 0; i < finish.files.length; i++) {
                    music.createUtwor(finish.files[i], album, finish.size[i])
                }
                //tu wypisz sumę w div-ie na stronie

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });

    }
}