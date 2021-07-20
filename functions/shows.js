/**
 * Shows Function.
 *
 * Note use of cache of computed data, to improve performance and
 * reduce the number of hitss down against the external API we are consuming.
 */
const axios = require("axios");

const API_BASE_URL = "https://api.reelgood.com/v2";
const HEADERS = { "Cache-Control": "public, s-maxage=1800" };

async function request(url) {
  const resp = await axios.get(url);

  return {
    statusCode: resp.status,
    body: JSON.stringify(resp.data),
    headers: HEADERS,
  };
}

exports.handler = async function (event) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      body: "Missing param: 'url'",
    };
  }

  if (!API_BASE_URL.startsWith(API_BASE_URL)) {
    return {
      statusCode: 400,
      body: `Domain not allowed - only: ${API_BASE_URL}`,
    };
  }

  return await request(url);
};
