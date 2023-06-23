const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/', (req, res) => {
    const { email, password } = req.body

    User
        .findByEmail(email)
        .then(user => {
            const isValidPassword = bcrypt.compareSync(password, user.password_digest)

            if (user && isValidPassword) {
                req.session.userId = user.id
                res.json({ email: user.email })
            } else {
                res.status(401).json({ error: 'Invalid credentials' })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        })
})

router.get('/', (req, res) => {
    const userId = req.session.userId
    if (userId) {
        User
            .findById(userId)
            .then(email => res.json({ result: 'successful', email: email }))
    } else {
        res.json({})
    }
})

module.exports = router

router.delete('/', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Error destroying sessions:', err)
        }
    })
    res.json({ result: 'logged out successfully' })
})