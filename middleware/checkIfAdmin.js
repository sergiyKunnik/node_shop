const jwt = require('jsonwebtoken');
const settings = require('../settings');
const User = require('../user/user.model')
module.exports = (req, res, next) => {
    try{
        const token = jwt.verify(req.headers.token, settings.JWT_SECRET);
        req.userData = token;
        const userId = token.userId;
        User.findById(userId).exec()
            .then(result => {
                if(result.is_admin){
                    next();
                }else{
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
            })
            .catch(err => {
                return res.status(404).json({
                    error: err
                });
            })
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}