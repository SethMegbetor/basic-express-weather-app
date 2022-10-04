const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // res.send(`Server up and running`);

  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  // console.log(req.body.placeName);
  console.log('Post request received');

  const place = req.body.placeName;
  const apiKey = '1f57f82010894270292cb06be36fd13f';
  const unit = 'metric';

  const url =
    'https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=' +
    apiKey +
    '&q=' +
    place +
    '&units=' +
    unit;

  // 'https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1f57f82010894270292cb06be36fd13f&q=Ghana&units=metric';

  https.get(url, function (response) {
    console.log(response.statusCode);
    var data = '';
    response
      .on('data', function (chunk) {
        data += chunk.toString();
      })
      .on('end', function () {
        console.log(data);
        /* Rest of your code */
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const main = weatherData.list[0].main;
        console.log(main);
        const temp = weatherData.list[0].main.temp;
        console.log(temp);

        const weatherDescription = weatherData.list[0].weather[0].description;
        console.log(weatherDescription);

        const weatherIcon = weatherData.list[0].weather[0].icon;
        console.log(weatherIcon);

        res.write(
          `<h1>The temparature in ${place} is: ${temp} degree celcius</h1>`
        );
        res.write(`<p> The weather is currently ${weatherDescription}</p>`);
        // res.write(`<img id="wIcon" src="" alt="">`);

        const weatherImage =
          'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
        console.log(weatherImage);
        res.write(`<img id="wIcon" src="${weatherImage}" alt="">`);

        res.send();
      });
  });
});

app.listen(PORT, function () {
  console.log(`Server started. Listening on port ${PORT}`);
});
