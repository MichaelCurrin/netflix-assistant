const CORS_PREFIX = 'https://cors.io/';
const API_BASE_URL = `${CORS_PREFIX}?https://api.reelgood.com/v2/browse/source/netflix?sort=4&sources=netflix&take=250`;
const IMG_BASE_URL = 'https://img.reelgood.com/content';
const IMG_PLACEHOLDER_BASE_URL = 'https://via.placeholder.com';
const TV = 'show';
const MOVIE = 'movie';


function makeImageUrl(hasPoster, type, id, large) {
    var pixels = large ? 342 : 92;

    if (hasPoster) {
        return `${IMG_BASE_URL}/${type}/${id}/poster-${pixels}.webp`;
    } else {
        return `${IMG_PLACEHOLDER_BASE_URL}/${pixels}x${pixels*1.5}?text=No+image`;
    }
}


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
        season_count: show.season_count,
    };
}


function getData() {
    var url = API_BASE_URL;

    return $.getJSON(url)
        .then(result => result.map(parseShow))
}


function render() {
    getData()
        .then(function (data) {
            var content = {
                "shows": data
            }
            var template = $("#shows").html();
            var html = Mustache.to_html(template, content);
            $('#target-output').html(html);
        })
}
