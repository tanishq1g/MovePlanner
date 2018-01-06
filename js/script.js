
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;

    $('#greeting').text('So you wanna live at ' + address + ' !!');

    var streetviewurl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '?';

    $('body').append('<img class="bgimg" src="' + streetviewurl + '">');



    var nytimesurl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=6bee3e0117e04d80b5ef820e9911a528';

    $.getJSON(nytimesurl, function(data){
        $('#nytimes-header').text('New York Articles About ', city);
        articles = data.response.docs;
        for (let i = 0,len = articles.length; i < len; i++) {
            var article = articles[i];
            $('#nytimes-articles').append('<li class="article"><a href="' + article.web_url + '">' + article.headline.main + "</a>" + '<p>' + article.snippet + '</p></li>');
        }
    }).error(function(e){
        $('#nytimes-header').text('New York Times articles could not be found . ');
    });


    var wikiurl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    var wikirequesttimeout = setTimeout(function(){
        $('#wikipedia-links').text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiurl,
        dataType : 'jsonp',
        success: function(response){
            var articleList = response[1];
            for (let i = 0,len = articleList.length; i < len; i++){
                article = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + article ;
                $('#wikipedia-links').append('<li><a href="' + url + '">' + article + '</a></li>');
            }
            clearTimeout(wikirequesttimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
