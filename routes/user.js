const express = require('express');
const router = express.Router();


const {userById, read, update,signup, signin, signout, requireSignin, isAuth  } = require('../controllers/user');
const { userSignupValidator} = require("../validator")
router.get('/secret', requireSignin, (req, res) => {
    res.json({
        user: 'got here yay'
    });
});
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/signout", signout);

// User
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);

router.param('userId', userById);

module.exports = router;