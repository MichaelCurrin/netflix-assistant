const axios = require('axios')

const API_BASE_URL = 'https://api.reelgood.com/v2',
    API_QUERY_URL = `${API_BASE_URL}/browse/source/netflix?sort=4&sources=netflix&take=250`;


exports.handler = async (event, context) => {
   const res = await axios.get(API_QUERY_URL)

   return {
      statusCode: res.status,
      body: JSON.stringify(res.data)
   }
}
