const axios = require('axios')

exports.handler = async (event, context) => {
   const body = JSON.parse(event.body)

   const res = await axios.get(body.url)

   return {
      statusCode: res.status,
      body: JSON.stringify(res.data)
   }
}
