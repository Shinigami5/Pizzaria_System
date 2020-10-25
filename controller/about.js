const { render } = require("ejs")


exports.get = (req, res) => {
    res.render('about');
}