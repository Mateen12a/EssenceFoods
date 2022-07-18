module.exports = (req, res, next) => {
    if (!req.files.image || !req.body.adminname || !req.body.title || !req.body.description || !req.body.content || !req.body.pricing) {
        return res.redirect('/post/new');
    }

    next();
}
