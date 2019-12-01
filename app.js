const request = require('request');
const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    const URL = 'https://www.imdb.com/title/tt0910936/?ref_=tt_sims_tti';

    request(URL, (error, response, body) => {
        if (error) {
            console.log("Failure");
        } else {
            //console.log(body);
            const json = { title : "", release : "", rating : ""};
            const $ = cheerio.load(body);
            const data = $('.title_wrapper h1').text();
            const rating = $('.ratingValue').text();
            const year = $('.title_wrapper h1 #titleYear').text();
            json.title = data;
            json.rating = rating;
            json.release = year;
            console.log(json)
            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

                console.log('File successfully written! - Check your project directory for the output.json file');
            
            })
            res.json("Done");
        }
    })
})

app.listen(3000, () => {
    console.log("3000")
})