$( document ).ready(function(){

var cerca = $(".user-search");

cerca.click(ajaxCall);

function ajaxCall(){

    console.clear() //pulisco la console a ogni click

    var userInput = $(".user-input").val(); //variabile che determina il valore dell'input dell'utente

    console.log(userInput);
    
        $.ajax({ //creo la chiamata Ajax

            url : "https://api.themoviedb.org/3/search/movie?api_key=9a6350f5129ed4894bf272b898b287df&query=" + userInput,

            method : "GET",

            success : function(data){

                console.log(data);

                var films = data.results //variabile che mi indica l'elenco dei film

                console.log("I film nel database sono: " + films);

                var filmItem;

                var film = $(".result");

                film.append('<div>Il film che hai cercato è : ' + userInput + '. Ecco i risultati della tua ricerca:</div>' + "<br>")

                films.forEach(filmItem =>{
                    console.log("Titolo: " + filmItem.title);
                    film.append('<div>Titolo: ' + filmItem.title + '</div>');
                    console.log("Titolo originale: " + filmItem.original_title);
                    film.append('<div>Titolo originale: ' + filmItem.original_title + '</div>');
                    console.log("Lingua originale: " + filmItem.original_language);
                    film.append('<div>Lingua originale: ' + filmItem.original_language + '</div>');
                    console.log("Valutazione: " + filmItem.vote_average);
                    film.append('<div>Valutazione: ' + filmItem.vote_average + '</div>');
                    console.log("---------");
                    film.append('<div>-------------------</div>');
                    
                })
                
                $(".user-input").val(""); //resetto l'input field
            },
            error : function(richiesta, stato, errori){

                alert("E' avvenuto un errore. " + " " + richiesta + " " + stato + " " + errori);

            }
        })
}


})