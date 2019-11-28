//copia di Netflix in stile Boolean(frontEnd)

var start = $("#nome");

start.click(function(){

	$("#general-container").fadeIn(2000);
	
	$("#starter").hide()

})





$(document).ready(function() {
	$("#user-search").click(search); //funzione che esegue al click la ricerca
});

function reset() {
	$(".elementi").html(''); //funzione per resettare la pagina dei risultati a ogni nuova ricerca
}

function search() { //funzione che recupera i link dell'API da cui ricavare i dati di ricerca e che salva l'input dato dall'utente
	reset();
	var urlMovie = 'https://api.themoviedb.org/3/search/movie';
	var urlTv = 'https://api.themoviedb.org/3/search/tv';
	var ricerca = $("#user-input").val();
	getData(urlMovie, ricerca, 'movie');
	getData(urlTv, ricerca, 'tv');
}

function getData(url, query, type) { //funzione che recupera i dati dall'API key fornita per recuperare i dati personali
	var apiKey = '9a6350f5129ed4894bf272b898b287df';
	$.ajax({
		url: url,
		method: "GET",
		data: {
			api_key: apiKey,
			query: query,
			language: "it-IT"
		},
		success: function(data) { //in caso di successo faccio un log e stampo in pagina
            var elements = data.results;
            console.log(elements);
            
			print(type, elements);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function print(type, elems) { //funzione per stampare i risultati in pagina utilizzando un template Handlebars
    var Film = $("#films"); //variabile che stampa i film in un div apposito
    var serieTV = $("#serie-tv"); //variabile che stampa le serie tv in un div apposito
	var source = $("#elem-template").html(); 
	var template = Handlebars.compile(source);
	for (var i=0;i<elems.length;i++) { //ciclo per estrapolare ogni singolo elemento della nostra ricerca
		var elem = elems[i];
		var titolo = (type == "movie" ? elem.title : elem.name); //variabile che discerne se il tipo di risultato è un film o una serie tv(perché il titolo dell'elemento è diverso)
		var titoloOriginale = (type == "movie" ? elem.original_title : elem.original_name); //come sopra, ma col titolo in lingua originale
		var poster = '';
		if (elem.poster_path) {
			var src = 'https://image.tmdb.org/t/p/w342/' + elem.poster_path; // variabile che crea la copertina del film/serie tv
			poster = "<img class= 'filmimg' src='" + src + "'>"; // e ne crea una copia che verrà inserita nel template
		} else {
            var noImg = 'https://a.wattpad.com/cover/128474680-352-k398092.jpg' //se l'immagine di copertina non è presente nell'oggetto, recupero questa immagine generica
            poster = "<img class= 'filmimg' src='" + noImg + "'>";
        }
		var context = { //creazione della variabile context per riempire i placeholder di Handlebars
			titolo: titolo,
			titoloOrig: titoloOriginale,
			lingua: flagLingua(elem.original_language),
            valutazione: elem.vote_average,
            star: stars(elem.vote_average),
			poster: poster,
			type: type,
			panoramica: elem.overview
        };

        
		var html = template(context); //variabile che riempie il template con il context
        if(type == "movie") //se l'oggetto è ti type "movie" lo appende in un div dedicato,
        Film.append(html);
        else {
            serieTV.append(html); //altrimenti lo appende nel div per le serie tv
        }
	}
	function stars(vote) { //funzione per creare la votazione
		vote = Math.floor(vote / 2); 
		var stars = '';
		for (var i = 1; i <= 5; i++)
	    stars += i <= vote ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
		return stars;
	}
	function flagLingua(lang) { //funzione per inserire la bandiera del paese di provenienza al posto della lingua in formato testuale
		var availableLangs = [
			'en',
            'ja',
            'it',
            'cn',
            'fr',
            'uk'
		];
		if (availableLangs.includes(lang)) {
			return '<img src="assets/img/' + lang + '.png" alt="' + lang + '" class="lang">';
		}
		return lang;
    }

    inputReset();

    function inputReset(){ //funzione che resetta il campo di ricerca

        $("#user-input").val("");
    }
}

