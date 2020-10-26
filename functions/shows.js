const axios = require('axios')

const API_BASE_URL = 'https://api.reelgood.com/v2';

exports.handler = async (event) => {
  const url = event.queryStringParameters.name

  if (!url) {
    return {
      statusCode: 400,
      body: 'Missing param: url'
    }
  }
  if (!API_BASE_URL.startsWith(API_BASE_URL)) {
    return {
      statusCode: 400,
      body: `Domain not allowed - only: ${API_BASE_URL}`
    }
  }

  const res = await axios.get(url)

  return {
    statusCode: res.status,
    body: JSON.stringify(res.data)
  }
}
