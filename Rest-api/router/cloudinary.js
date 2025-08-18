// import express from 'express'
// const { themeModel } = require('../models');

// const app = express();

// app.post('/theme/:id/image', parser.single('image'), async(req,res,next) =>{
//     try{
//         const theme = await themeModel.findByIdAndUpdate(
//             req.params.id,
//             {Image: req.file.path}, // от clouda
//             {new: true}
//         );
//         res.json(theme)

//     } catch (err) {
//         next(err)
//     }
// })