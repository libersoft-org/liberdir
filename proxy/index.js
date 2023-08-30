const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const sites = {
  'liberlandorg': 'https://api.liberland.org/news?lang=en&page=1&limit=2&order=-published',
}

app.get('/:site', async (req, resp) => {
  await fetch(sites[req.params.site])
    .then((data) => data.json())
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => console.log(err));
});

app.listen(8088, () => {
  console.info('proxy server is running on port 8088')
})