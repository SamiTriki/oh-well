'use strict';

const fs = require('fs');
const Converter = require('csvtojson').Converter;
const csvFileName = __dirname + "/history.csv";

exports.json = function (fn) {

    const csvConverter = new Converter({ delimiter: ',' });

    csvConverter.on("end_parsed", (json) => fn(json));

    fs.createReadStream(csvFileName).pipe(csvConverter);
};
