const express = require('express');
const db = require('../db');
const router = express.Router();

//  Return all dog information 
router.get('/', (req, res) => { 
    db.query('SELECT * FROM loginEvent').then(results => {
        res.json(results)
    })
    .catch(() => {
        res.sendStatus(500);
    })    
});

router.get('/valid', (req, res) => { 
    db.query('SELECT * FROM loginEvent where loginInOut != "ei tunnistettu"').then(results => {
        res.json(results)
    })
    .catch(() => {
        res.sendStatus(500);
    })    
});

//  Return information of a single dog 
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM loginEvent where loginId = ?', [req.params.id])
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

router.get('/latest', (req, res) => {
    db.query('SELECT * FROM loginEvent where loginId = ?', [req.params.id])
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

/* Create a new dog 
    Expects the following data format
    {
        name: string, 
        image: string - whole url to image
    }
*/
router.post('/', (req, res) => {

    db.query('INSERT INTO loginEvent (userName, loginInOut, loginDateTime, image) VALUES (?,?,?,?)', [req.body.name, req.body.state, req.body.time, req.body.image])
    .then(results => {
        console.log(results);
        res.sendStatus(201);
    })
    .catch(() => {
        res.sendStatus(500);
    });
    
});

router.delete('/:id', (req, res) => {
    db.query('DELETE FROM loginEvent where loginId = ?', [req.params.id])
    .then(results => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

module.exports = router;
