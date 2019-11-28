$(document).ready(function() {
	$("#user-search").click(search);
});
function reset() {
	$(".elementi").html('');
}
function search() {
	reset();
	var urlMovie = 'https://api.themoviedb.org/3/search/movie';
	var urlTv = 'https://api.themoviedb.org/3/search/tv';
	var ricerca = $("#user-input").val();
	getData(urlMovie, ricerca, 'movie');
	getData(urlTv, ricerca, 'tv');
}
function getData(url, query, type) {
	var apiKey = '9a6350f5129ed4894bf272b898b287df';
	$.ajax({
		url: url,
		method: "GET",
		data: {
			api_key: apiKey,
			query: query,
			language: "it-IT"
		},
		success: function(data) {
            var elements = data.results;
            console.log(elements);
            
			print(type, elements);
		},
		error: function(err) {
			console.log(err);
		}
	});
}
function print(type, elems) {
    var Film = $("#films");
    var serieTV = $("#serie-tv");
	var source = $("#elem-template").html();
	var template = Handlebars.compile(source);
	for (var i=0;i<elems.length;i++) {
		var elem = elems[i];
		var title = (type == "movie" ? elem.title : elem.name);
		var originalTitle = (type == "movie" ? elem.original_title : elem.original_name);
		var poster = '';
		if (elem.poster_path) {
			var src = 'https://image.tmdb.org/t/p/w342/' + elem.poster_path;
			poster = "<img class= 'filmimg' src='" + src + "'>";
		} else {
            var noImg = 'https://a.wattpad.com/cover/128474680-352-k398092.jpg'
            poster = "<img class= 'filmimg' src='" + noImg + "'>";
        }
		var context = {
			titolo: title,
			TitoloOrig: originalTitle,
			lingua: flagLingua(elem.original_language),
            valutazione: elem.vote_average,
            star: stars(elem.vote_average),
			poster: poster,
			type: type
		};
		var html = template(context);
        if(type == "movie")
        Film.append(html);
        else {
            serieTV.append(html);
        }
	}
	function stars(vote) {
		vote = Math.floor(vote / 2);
		var stars = '';
		for (var i = 1; i <= 5; i++)
	    stars += i <= vote ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
		return stars;
	}
	function flagLingua(lang) {
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

    function inputReset(){

        $("#user-input").val("");
    }
}

