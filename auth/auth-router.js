const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../user/user-model.js');

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;
    // console.log('register')
    // this takes the req.body and creates the hash
    const hash = bcrypt.hashSync(user.password, 8);
    // this takes the user password and assigns it to the hash. AKA, replaces the password with the hash. 
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log('login')

    Users.findBy({ username })
        .first()
        .then(user => {
        	console.log('login findBy')
            if (user && bcrypt.compareSync(password, user.password)) {
                // const token = genToken(user);
                req.session.user = username;
                res.status(200).json({ 
                    message: `Welcome ${user.username}!`,
                    token,  
                });
            } else {
                res.status(401).json({ message: 'You shall not pass!' });
            }
        })
        .catch(error => {
           
            res.status(500).json(error);
        });
});

module.exports = router;