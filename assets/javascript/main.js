$( document ).ready(function(){

var cerca = $(".user-search");

cerca.click(ajaxCall);

function ajaxCall(){

    console.clear() //pulisco la console a ogni click

    var userInput = $(".user-input").val(); //variabile che determina il valore dell'input dell'utente

    console.log(userInput);
    
        $.ajax({ //creo la chiamata Ajax

            url : "https://api.themoviedb.org/3/search/movie",

            method : "GET",

            data : {

                api_key : "9a6350f5129ed4894bf272b898b287df",
                query : userInput,
                language : "it-IT",
            },

            success : function(data){

                console.log(data);
               
                var films = data.results;

                stampa(films);
                    
            },
            error : function(richiesta, stato, errori){

                alert("È avvenuto un errore. " + " " + richiesta + " " + stato + " " + errori);

            }
        })
    }

})

function inputReset(){

    $(".user-input").val("");
}

function stampa(films){

    var listaFilm = $("#films");
    listaFilm.html(" ");

    var source = $("#movie-template").html();
    var template = Handlebars.compile(source);

    for (var i=0; i<films.length;i++){
        
        var film = films[i];

        var context = {

            titolo : film.title,
            titolo_orig : film.original_title,
            lingua : film.original_language,
            valutazione : film.vote_average

        }

        var html = template(context);
        listaFilm.append(html);
    }
}
