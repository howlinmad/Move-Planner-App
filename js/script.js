
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
    var imageTag = $('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + street +', ' + city + '">');
    $body.append(imageTag);
    
    var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + street + '&sort=newest&api-key=94bb2b0ea75d663f25744ea977a9cab0:12:73719015';
    $.getJSON(nytimesURL, function(data) {
    //console.log(data);
        $nytHeaderElem.text('New York Times Articles About ' + city);
        
        //object holding the data returned by the nytimes api
        articles = data.response.docs;
        for(var i = 0; i <articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>' + '<p>' +article.snippet + '/<p>' +'</li>'); 
        };
    }).error(function(e){
             $nytHeaderElem.text('New York TImes Articles Could Not Be Loaded');
    });

    
    return false;
};

$('#form-container').submit(loadData);

// loadData();
