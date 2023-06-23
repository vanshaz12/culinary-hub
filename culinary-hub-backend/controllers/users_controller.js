const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/', (req, res) => {
    const { name, email, password } = req.body

    const passwordDigest = bcrypt.hashSync(password, bcrypt.genSaltSync(12), null)

    User
        .create(name, email, passwordDigest)
        .then(email => res.json(email))
})

module.exports = router 