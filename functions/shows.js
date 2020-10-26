const axios = require('axios')

exports.handler = async (event) => {
  const url = event.queryStringParameters.name

  if (!url) {
    return {
      statusCode: '400',
      body: 'Missing param: url'
    }
  }

  const res = await axios.get(url)

  return {
    statusCode: res.status,
    body: JSON.stringify(res.data)
  }
}
