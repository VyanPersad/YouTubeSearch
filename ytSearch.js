
//Searchbar
$(function () {
    var searchField = $('#query');
    var searchIcon = $('#searchBtn');

    //Focus Event
    $(searchField).on('focus', function () {
        $(this).animate({
            width: '100%'
        }, 400);
        $(searchIcon).animate({
            right: '10px'
        }, 400);
    });

    //Blur Event
    $(searchField).on('blur', function () {
        if (searchField.val() == '') {
            $(searchField).animate({
                width: '45%'
            }, 400, function () { });
            $(searchIcon).animate({
                right: '360px'
            }, 400, function () { });
        }
    });

    $('#searchForm').submit(function (e) {
        e.preventDefault();
    });
})

function search() {
    //Clear results
    $('#results').html('');
    $('#buttons').html('');

    //Get form input
    q = $('#query').val();
    //Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        type: 'video',
        key: 'Your API key here'
    },
        function (data) {
            var nextPGtoken = data.nextPageToken;
            var prevPGtoken = data.prevPageToken;

            //console.log(data);

            $.each(data.items, function (i, item) {
                var output = getOutput(item);
                //Display results
                $('#searchResults').append(output);
            });

            var buttons = getButtons(prevPGtoken, nextPGtoken);
            //Display Buttons
            $('#buttons').append(buttons);
        }
    );
}

//Next Function
function nextPG() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    //Clear results
    $('#searchResults').html('');
    $('#buttons').html('');

    //Get form input
    q = $('#query').val();
    //Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        pageToken: token,
        type: 'video',
        key: 'AIzaSyA184FzL2R1MlQTk2BVPITCA25ulXBi23I'
    },
        function (data) {
            var nextPGtoken = data.nextPageToken;
            var prevPGtoken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function (i, item) {
                var output = getOutput(item);
                //Display results
                $('#searchResults').append(output);
            });

            var buttons = getButtons(prevPGtoken, nextPGtoken);
            //Display Buttons
            $('#buttons').append(buttons);
        }
    );
}

//Prev Function
function prevPG() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    //Clear results
    $('#searchResults').html('');
    $('#buttons').html('');

    //Get form input
    q = $('#query').val();
    //Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        pageToken: token,
        type: 'video',
        key: 'AIzaSyA184FzL2R1MlQTk2BVPITCA25ulXBi23I'
    },
        function (data) {
            var nextPGtoken = data.nextPageToken;
            var prevPGtoken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function (i, item) {
                var output = getOutput(item);
                //Display results
                $('#searchResults').append(output);
            });

            var buttons = getButtons(prevPGtoken, nextPGtoken);
            //Display Buttons
            $('#buttons').append(buttons);
        }
    );
}

function getOutput(item) {

    //These ids come from referencing the object that produced from the 
    //console logging of data from the search function.

    var videoId = item.id.videoId;
    var vidTitle = item.snippet.title;
    var vidDesc = item.snippet.description;
    var vidThumbnail = item.snippet.thumbnails.high.url;
    var vidchannelTitle = item.snippet.channelTitle;
    var vidPub = item.snippet.publishedAt;

    //Build Output String
    var output = '<li>' +
        '<div class="list-left">' +
        '<img src="' + vidThumbnail + '">' +
        '</div>' +
        '<div class="list-right">' +
        '<h3> <a class="fancybox fancybox-iframe" href="http://www.youtube.com/embed/' + videoId + '">' + vidTitle + '</a></h3>' +
        '<small>By  <span class="cTitle">' + vidchannelTitle + '</span> on ' + vidPub + '</small>' +
        '<p>' + vidDesc + '</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearFix"></div>' + '';

    return output;
}

//Build Buttons
function getButtons(prevPGtoken, nextPGtoken) {
    if (!prevPGtoken) {
        var outputBtn = '<div class="button-container">' +
            '<button id="next-button" class="pagin-btn" data-token="' + nextPGtoken + '" data-query="' + q + '"' +
            'onclick="nextPG();">Next Page</button></div>';
    } else {
        var outputBtn = '<div class="button-container">' +
            '<button id="prev-button" class="pagin-btn" data-token="' + prevPGtoken + '" data-query="' + q + '"' +
            'onclick="prevPG();">Prev Page</button>' +
            '<button id="next-button" class="pagin-btn" data-token="' + nextPGtoken + '" data-query="' + q + '"' +
            'onclick="nextPG();">Next Page</button></div>';
    }

    return outputBtn;
}

