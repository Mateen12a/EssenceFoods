const MenuPost  = require('../database/models/Menu');

module.exports = async (req, res) => {
const menuposts = await MenuPost.find({});


    res.render('index', {
        menuposts
    });
};