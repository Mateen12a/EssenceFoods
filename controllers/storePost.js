const path = require('path')
const MenuPost = require('../database/models/Menu')
 
module.exports = (req, res) => {
    const {
        image
    } = req.files;
 
    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
        MenuPost.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, menupost) => {
            res.redirect("/");
        });
    });
}

