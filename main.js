const CORS_PREFIX = 'https://cors.io/';
const API_BASE_URL = `${CORS_PREFIX}?https://api.reelgood.com/v2/browse/source/netflix?sort=4&sources=netflix&take=250`;
const IMG_BASE_URL = 'https://img.reelgood.com/content';
const IMG_PLACEHOLDER_BASE_URL = 'https://via.placeholder.com';
const TV = 'show';
const MOVIE = 'movie';


function makeImageUrl(hasPoster, type, id_, large = true) {
    var pixels = large ? 342 : 92;

    if (hasPoster) {
        return `${IMG_BASE_URL}/${type}/${id_}/poster-${pixels}.webp`;
    } else {
        return `${IMG_PLACEHOLDER_BASE_URL}/${pixels}x${pixels*1.5}?text=No+image`;
    }
}


function parse(item) {
    var is_movie = item.content_type == 'm';
    var type = is_movie ? MOVIE : TV;
    var id_ = item.id;
    var imageUrl = makeImageUrl(item.has_poster, type, id_);

    return {
        id: id_,
        type: type,
        image_url: imageUrl,
        slug: item.slug,
        title: item.title,
        overview: item.overview,
        released_on: item.released_on,
        genres: item.genres,
        season_count: item.season_count,
    };
}


function getJson(url) {
    return new Promise(function (resolve) {
        fetch(url)
            .then(body => body.json())
            .then(result => result.map(parse))
            .then(parsedItems => resolve(parsedItems));
    })
}


function getData() {
    var url = API_BASE_URL;
    return getJson(url);
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
