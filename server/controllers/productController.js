const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');

router.post('/add-product', async (req, res) => {
    let { merchant, total, vault, category, description, report } = req.body;
    if (total <= 0) throw { message: 'Total should be a positive number' };

    let productData = {
        merchant, total, vault, category, description, report: Boolean(report)
    }
    try {
        await productService.create(productData, req.user._id);
        res.redirect('/');
    } catch (error) {
        res.render('create', { error });
    }
});

// router.get('/:id/report', async (req, res) => {
//     let product = await productService.getSpecific(req.params.id, req.user._id);
//     res.render('report', { title: 'Report', product })
// });

// router.get('/:id/stop', async (req, res) => {
//     try {
//         await productService.deleteProduct(req.params.id, req.user._id);
//         res.redirect(`/`);
//     } catch (error) {
//         res.render('report', { error })
//     }
// });



module.exports = router;