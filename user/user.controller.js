const User = require('./user.model');
const mongoose = require('mongoose');
const settings = require('../settings');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup_controller = (req, res, next) => {
    // Перевірка чи юзер із email вже зареєстрований
    User.find({email: req.body.email}).exec()
        .then(user => {
            if(user.length>=1){
                return res.status(409).json({
                    message: 'Mail exists'
                })
            }else{
                bcrypt.hash(req.body.password, settings.BCRYPT_COUNT, (err, hash) => {
                    // Захешувати пароль
                    if(err){
                        return res.status(500).json({
                            error: err
                        })
                    }else{
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                return res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}

exports.login_controller = (req, res, next) => {
    User.find({email: req.body.email}).exec()
        .then(user => {

            // Перевіряємо чи масив що пройшов нам із бази даних не порожній
            // Якщо ж він прийшов порожні це значить що в нас немає юзерів із заданих емейлом
            if(user.length < 1){
                return res.status(404).json({
                    message: 'Mail not found'
                });
            }

            // Перевірка параля на правильність
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {

                if(result){
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        settings.JWT_SECRET, 
                        {
                            expiresIn: "1h"
                        }
                    );
                    const decoded = jwt.verify(token, settings.JWT_SECRET);
                    console.log(decoded.userId);
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                    });
                }
                return res.status(500).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}