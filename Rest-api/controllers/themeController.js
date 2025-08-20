const { themeModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate('userId')
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { themeName, postText } = req.body;
    const { _id: userId } = req.user;

    themeModel.create({ themeName, userId, subscribers: [userId] })
        .then(theme => {
            newPost(postText, userId, theme._id)
                .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

function deleteTheme(req, res, next) {

    console.log('delete theme called, params', req.params, 'user:', req.user)
    const { themeId } = req.params;
    const userId = req.user._id;
    
    themeModel.findById(themeId)
        .then(theme => {
            if(!theme) return res.status(404).json({ message: 'Theme not found'});
            if (theme.userId.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'Not allowed to delete this theme!'})
            }
            return theme.remove()
            .then(() => res.status(200).json({message: 'Theme deleted succesfully'}))
        })
        .catch(next); // за errors
}

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
    deleteTheme
}
