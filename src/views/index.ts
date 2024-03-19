import express from "express"
const frontendRoutes = express.Router();

frontendRoutes.get('/', (req, res) => {

    res.render('pages/index')

})

export default frontendRoutes;