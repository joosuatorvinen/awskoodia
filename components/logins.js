const express = require('express');
const router = express.Router();

//  Some fixed example data of dogs 
let userData = {
    logins: [{
        loginId: 1,
        userName: "joosua_torvinen",
        loginInOut: "ulos",
        loginDateTime: new Date("2018-03 - 25T12: 00: 00-06: 00"),
        picture: "https://www.dropbox.com/home/Apps/kasvojentunnistus-api?preview=kuva0001.jpg"
    },
    {
        loginId: 2,
        userName: "sami_jouppila",
        loginInOut: "ulos",
        loginDateTime: new Date("2018-03 - 25T12: 00: 00-06: 00"),
        picture: "https://www.dropbox.com/home/Apps/kasvojentunnistus-api?preview=kuva0001.jpg"
    },
    {
        loginId: 3,
        userName: "eero_sova",
        loginInOut: "ulos",
        loginDateTime: new Date("2018-03 - 25T12: 00: 00-06: 00"),
        picture: "https://www.dropbox.com/home/Apps/kasvojentunnistus-api?preview=kuva0001.jpg"
    },
    ]
}

//  Return all dog information 
router.get('/', (req, res) => { res.json(loginData) });

//  Return information of a single dog 
router.get('/:id', (req, res) => {
    const resultUser = loginData.logins.find(d => {
        if (d.loginId == req.params.id) {
            return true;
        }
        else {
            return false;
        }
    });
    if (resultUser === undefined) {
        res.sendStatus(404)
    }
    else {
        res.json(resultUser);
    }
})

/* Create a new dog 
    Expects the following data format
    {
        name: string, 
        image: string - whole url to image
    }
*/
router.post('/', (req, res) => {

    userData.logins.push({
        loginId: userData.logins.length + 1,
        userName: req.body.userName,
        loginInOut: req.body.loginInOut,
        loginDateTime: req.body.loginDateTime,
        picture: req.body.picture
    })

    res.sendStatus(201);
});

router.delete('/:id', (req, res) => {
    userData.logins = userData.logins.filter(logins => logins.loginId != req.params.id);
    res.sendStatus(200);
})

module.exports = router;