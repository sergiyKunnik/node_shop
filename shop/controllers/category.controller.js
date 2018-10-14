let mongoose = require('mongoose');
const Category = require('../models/category.model');

exports.getCategories = (req, res, next) => {
    Category.find({}).exec()
        .then(data => {
            return res.status(200).json({
                categories: data
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            });
        });
}

exports.createCategory = (req, res, next) => {
    const category = new Category({
        _id:  mongoose.Types.ObjectId(),
        name: req.body.name
    });
    category.save()
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            });
        });
}

exports.editCategory = (req, res, next) => {
    const id = req.params.categoryId;

    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Category.update( {_id: id}, { $set: updateOps})
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            })
        });
}

exports.deleteCategory = (req, res, next) => {
    const id = req.params.categoryId;
    Category.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            })
        });
}