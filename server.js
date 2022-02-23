var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var server = http.createServer(function (request, response) {
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    switch (request.method) {
        case "GET":
            if (request.url == "/") {
                fs.readFile("static/index.html", function (error, data) {
                    if (error) {
                        response.writeHead(404, { 'Content-Type': 'text/html' });
                        response.write("<h1>błąd 404 - nie ma pliku!<h1>");
                        response.end();
                    }

                    else {
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        response.write(data);
                        response.end();
                    }

                });
            }
            else {
                fs.readFile("static/" + decodeURI(request.url), function (error, data) {
                    if (error) {
                        response.write("<h1>błąd 404 - nie ma pliku!<h1>");
                        response.end();
                    }

                    else {
                        response.write(data);
                        response.end();
                    }

                });
            }

            // załaduj pliki html, js, css, jpg, png etc;
            break;
        case "POST":
            function servResponse(request, response) {
                var allData = "";

                //kiedy przychodzą dane POSTEM, w postaci pakietów,
                //łącza się po kolei do jednej zmiennej "allData"
                // w poniższej funkcji nic nie modyfikujemy

                request.on("data", function (data) {
                    console.log("data: " + data)
                    allData += data;
                })

                //kiedy przyjdą już wszystkie dane
                //parsujemy je do obiektu "finish"
                //i odsyłamy do przeglądarki

                request.on("end", function (data) {
                    var foldery = []
                    var pliczki = []
                    var roz = []
                    var obj = {
                        "dirs": [],
                        "files": [],
                        "size": [],
                    }
                    var finish = qs.parse(allData)
                    if (finish.a == "first") {
                        fs.readdir(__dirname + "/static/mp3", function (err, files) {
                            if (err) {
                                return console.log(err);
                            }
                            //

                            files.forEach(function (fileName) {
                                foldery.push(fileName)
                                console.log(foldery);
                                //tu dodaj foldery do wcześniej utworzonej tablicy
                            });
                            // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
                            fs.readdir(__dirname + "/static/mp3/" + foldery[0], function (err, files) {
                                if (err) {
                                    return console.log(err);
                                }
                                //

                                files.forEach(function (fileName) {
                                    pliczki.push(fileName)
                                    console.log(pliczki);
                                    //tu dodaj foldery do wcześniej utworzonej tablicy
                                });
                                files.forEach(function (file) {
                                    var stats = fs.statSync(__dirname + "/static/mp3/" + foldery[0] + "/" + file);
                                    roz.push(stats.size)
                                });
                                obj.dirs = foldery
                                obj.files = pliczki
                                obj.size = roz
                                response.end(JSON.stringify(obj))
                            });
                        });
                        
                    }
                    else if (finish.a == "next") {
                        fs.readdir(__dirname + "/static/mp3", function (err, files) {
                            if (err) {
                                return console.log(err);
                            }
                            //

                            files.forEach(function (fileName) {
                                foldery.push(fileName)
                                console.log(foldery);
                                //tu dodaj foldery do wcześniej utworzonej tablicy
                            });
                            // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
                            fs.readdir(__dirname + "/static/mp3/" + finish.okladka, function (err, files) {
                                if (err) {
                                    return console.log(err);
                                }
                                //

                                files.forEach(function (fileName) {
                                    pliczki.push(fileName)
                                    console.log(pliczki);
                                    //tu dodaj foldery do wcześniej utworzonej tablicy
                                });
                                files.forEach(function (file) {
                                    var stats = fs.statSync(__dirname + "/static/mp3/" + finish.okladka + "/" + file);
                                    roz.push(stats.size)
                                });
                                obj.dirs = foldery
                                obj.files = pliczki
                                obj.size = roz
                                response.end(JSON.stringify(obj))
                            });
                        });
                        
                    }
                })
            }
            servResponse(request, response)
            
            break;
        default: break;
    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});
