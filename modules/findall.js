const User = require('../models/account');


module.exports = (socket, data) => {

    if (data.id !== undefined) {

        User.findById(data.id, /*"-password -salt -__v -created",*/(err, account) => {
            if (err) {
                throw err;
            }
            send(res, 200, account);
        });
    } else {
        User.findById(data.id, /*"-password -salt -__v -created",*/(err, account) => {
            if (err) {
                throw err;
            }
            send(res, 200, account);
        });
    }
};
