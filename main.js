const API_BASE_URL = 'https://api.reelgood.com/v2',
    API_QUERY_URL = `${API_BASE_URL}/browse/source/netflix?sort=4&sources=netflix&take=250`,
    IMG_BASE_URL = 'https://img.reelgood.com/content',
    IMG_PLACEHOLDER_BASE_URL = 'https://via.placeholder.com';

const TV = 'show',
    MOVIE = 'movie';

/** Return URL for poster image or placeholder image. **/
function makeImageUrl(hasPoster, type, id, large) {
    var pixels = large ? 342 : 92;

    var url;
    if (hasPoster) {
        url = `${IMG_BASE_URL}/${type}/${id}/poster-${pixels}.webp`;
    }
    else {
        url = `${IMG_PLACEHOLDER_BASE_URL}/${pixels}x${pixels * 1.5}?text=No+image`;
    }

    return url;
}

/** Extract useful fields from a show and also add image URLs. **/
function parseShow(show) {
    var isMovie = show.content_type == 'm';
    var type = isMovie ? MOVIE : TV;
    var id = show.id;
    var imgLarge = makeImageUrl(show.has_poster, type, id, true);
    var imgSmall = makeImageUrl(show.has_poster, type, id, false);

    return {
        id: id,
        type: type,
        image_large: imgLarge,
        image_small: imgSmall,
        slug: show.slug,
        title: show.title,
        overview: show.overview,
        released_on: show.released_on,
        genres: show.genres,
        season_count: show.season_count
    };
}

function getData() {
    return $.getJSON(API_QUERY_URL).then(result => result.map(parseShow));
}

/** Fetch data and add it to the HTML using templating. **/
function render() {
    getData().then(data => {
        var content = {
            shows: data
        };
        var template = $('#shows').html();
        var html = Mustache.to_html(template, content);
        $('#target-output').html(html);
    });
}
