var router = require('express').Router()
var faker = require('faker')
var Product = require('../models/product')

router.get('/add-product', function(req, res, next) {
    res.render('main/add-product')
})

router.post('/add-product', function(req, res, next) {
    var product = new Product()

    product.categoryName = req.body.categoryName
    product.productName = req.body.productName
    product.productid = req.body.productid
    product.categoryid = req.body.categoryid

    product.save(function(err) {
        if (err) throw err
        res.redirect('/add-product')
    })
})


router.get('/products/:page', function(req, res, next) {
    var perPage = 9
    var page = req.params.page || 1

    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            Product.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('main/products', {
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})


router.get('/', function(req, res, next) {
    res.render('index')
})

module.exports = router