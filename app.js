const express = require('express'),
    bodyParser = require("body-parser")
const app = express(),
    { validator, writeResponseToFile }
        = require("./lib/functions.js");
    //logger = require('./lib/logger');

app.use(bodyParser.urlencoded({ extended: true }));

// setup post request; create api endpoint that takes a post and provides report
//TODO: accept get calls as well 
app.post('/api', api)

//separated for testing purposes
async function api(req, res) {
    let shopIDs = req.body.shopIDs
    //VALIDATION create loop for each shopID (parse shopIDs)
    shopIDs = JSON.parse(shopIDs);
    if (validator(shopIDs, res)) {
        let promises = []
        for (let i = 0; i < shopIDs.length; i++) {
            promises[i] = writeResponseToFile(shopIDs[i]);
        }
        await Promise.all(promises).then((x) => {
            let msg = ""
            x.forEach(y => { msg += y })
            res.send(msg.replace(/\n/gi, "<br>"));
        });
    }

}

app.listen(80, function(){
    console.log("I am listening on 80");
})

module.exports = app
