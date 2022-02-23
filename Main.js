var cover
var music
var net
var granie
$(document).ready(function () {
    cover = new Okladka()
    music = new Utwor()
    net = new Net()
    $.ajax({
        url: "adres serwera",
        data: { a: "first" },
        type: "POST",
        success: function (data) {
            //czytamy odesłane z serwera dane

            // alert(data)
            var finish = JSON.parse(data)
            // console.log(finish.dirs)

            for (var i = 0; i < finish.dirs.length; i++) {
                cover.createOkladka(finish.dirs[i])
            }
            for (var i = 0; i < finish.files.length; i++) {
                music.createUtwor(finish.files[i], finish.dirs[0], finish.size[i])
            }
            //tu wypisz sumę w div-ie na stronie


        },
        error: function (xhr, status, error) {
            console.log(xhr);
        },
    });
});
