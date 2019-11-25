$( document ).ready(function(){

var cerca = $(".user-search");

cerca.click(ajaxCall);

function ajaxCall(){

    var userInput = $(".user-input").val(); //variabile che determina il valore dell'input dell'utente

    console.log(userInput);
    
        $.ajax({ //creo la chiamata Ajax

            url : "https://api.themoviedb.org/3/movie/550?api_key=9a6350f5129ed4894bf272b898b287df&query=" + userInput,

            method : "GET",

            success : function(data){

                console.log(data);

                var films = "I film nel database sono: " + data.title //variabile che mi indica l'elenco dei film

                console.log(films);

                var filmsItem;

                console.log("I film sono:");

                films.forEach(filmsItem =>{ //ciclo forEach per estrarre gli items dall'array

                    console.log(filmsItem);
                    
                
                    

                });
                
            },
            error : function(){

                alert("error");

            }
        })
}


})