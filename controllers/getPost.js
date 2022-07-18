const MenuPost = require('../database/models/Menu')

module.exports = async (req, res) => {
    const menupost = await MenuPost.findById(req.params.id);
    res.render("post", {
        menupost
    });
}