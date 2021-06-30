// Since Functions is not set up locally, having the host as the remote supports local development.
// At the cost of hardcoding this.
const HOST = "https://netflix-assistant.netlify.com";
const LAMBDA_URL = "/.netlify/functions/shows";

const API_BASE_URL = "https://api.reelgood.com/v2",
  API_QUERY_URL = `${API_BASE_URL}/browse/source/netflix?sort=4&sources=netflix&take=250`;

const IMG_BASE_URL = "https://img.reelgood.com/content",
  IMG_PLACEHOLDER_BASE_URL = "https://via.placeholder.com";

const TV = "show",
  MOVIE = "movie";

/** Return URL for poster image or placeholder image. **/
function makeImageUrl(hasPoster, type, id, large) {
  const pixels = large ? 342 : 92;

  let url;

  if (hasPoster) {
    url = `${IMG_BASE_URL}/${type}/${id}/poster-${pixels}.webp`;
  } else {
    url = `${IMG_PLACEHOLDER_BASE_URL}/${pixels}x${pixels * 1.5}?text=No+image`;
  }

  return url;
}

/**
 * Extract useful fields from a show and also add image URLs.
 */
function parseShow(show) {
  const isMovie = show.content_type == "m";

  const imgLarge = makeImageUrl(show.has_poster, type, id, true);
  const imgSmall = makeImageUrl(show.has_poster, type, id, false);

  return {
    id: show.id,
    type: isMovie ? MOVIE : TV,

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

async function getData(url) {
  const params = { url };

  return $.getJSON(LAMBDA_URL, params).then((result) => result.map(parseShow));
}

/**
 * Fetch data and add it to the HTML using templating.
 */
function render() {
  getData(API_QUERY_URL).then((data) => {
    const template = $("#shows").html();

    const content = {
      shows: data,
    };

    const html = Mustache.to_html(template, content);
    $("#target-output").html(html);
  });
}
