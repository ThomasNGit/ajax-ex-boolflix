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

        var voto = films[i].vote_average;

        var votoInt = parseInt(voto);
        console.log(votoInt);

        var stelle = 0;

        if(votoInt <= 2){
            stelle = " <i class='fas fa-star stella'></i>";
        } else if(votoInt <= 4){
            stelle = " <i class='fas fa-star stella'></i><i class='fas fa-star stella'></i>";
        } else if(votoInt <= 6){
            stelle = " <i class='fas fa-star stella'></i><i class='fas fa-star stella'></i><i class='fas fa-star stella'></i>";
        } else if(votoInt <= 8){
            stelle = " <i class='fas fa-star stella'></i><i class='fas fa-star stella'></i><i class='fas fa-star stella'></i><i class='fas fa-star stella'></i>";
        } else if(votoInt <= 10){
            stelle = " <i class='fas fa-star stella'></i><i class='fas fa-star stella'></i><i class='fas fa-star stella'></i><i class='fas fa-star stella'></i><i class='fas fa-star stella'></i>";
        }
        
        var context = {

            titolo : film.title,
            titolo_orig : film.original_title,
            lingua : film.original_language,
            valutazione : votoInt,
            stelle : stelle
        };

   

        var html = template(context);
        listaFilm.append(html);
    }
}
