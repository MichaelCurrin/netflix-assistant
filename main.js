const API_BASE_URL = 'https://api.reelgood.com/v2/browse/source/netflix?sort=4&sources=netflix&take=250';
const IMG_BASE_URL = 'https://img.reelgood.com/content';
const TV = 'show';
const MOVIE = 'movie';


function imageUrl(type, id_, large = true) {
    var width = large ? 342 : 92;
    return `${IMG_BASE_URL}/${type}/${id_}/poster-${width}.webp`
}


function parse(item) {
    var is_movie = item.content_type == 'm';
    var type = is_movie ? MOVIE : TV;
    var id = item.id;

    return {
        id: id,
        type: type,
        img: imageUrl(type, id),
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
