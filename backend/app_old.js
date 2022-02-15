const { default: axios } = require('axios');
const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    var client_id = '9dc11dbdee4c4f65903e462cc159b0fc'; // Your client id
    var client_secret = 'f550e143f61b45c4afa6503f9cd2535d'; // Your secret
    var authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        params: {
          grant_type: 'client_credentials'
        },
       // json: true
      };
    const spotifyApiResponse = await axios(authOptions)
    console.log(spotifyApiResponse.data);

    res.send(JSON.stringify(spotifyApiResponse));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})