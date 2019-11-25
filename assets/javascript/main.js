$( document ).ready(function(){

$(".user-search").click(function(){ //funzione che al click esegue una ricerca

    var userInput = $(".user-input").val(); //variabile che determina il valore dell'input dell'utente

    console.log(userInput); //debug



    $.ajax({

        url : "https://api.themoviedb.org/3/movie/550?api_key=4592ff2ae6081cad0b67fb362589cc1a",

        method : "GET",

        success : function(data) {

            var itemResponse = data.title;

            console.log(itemResponse);

            
        },
        error : function(){

            alert("errore")

        }

    })

    $(".user-input").val("")//ripulisco l'inputfield
    


})

})