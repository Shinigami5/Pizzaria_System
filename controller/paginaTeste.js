const { getDataHomeByDate } = require('../db/db');

exports.get = (req, res) => {
    res.render('teste');
}

exports.get2 = (req, res) => {
    const promise = getDataHomeByDate('2020-09-01', '2020-09-30');
    setTimeout(() => {
        promise.then((results) => {
            res.json(results);
        })
    }, 100);

    //res.send('sucess teste');
}