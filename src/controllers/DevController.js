const axios = require('axios')
const devModel = require('../models/Dev')

module.exports = {
    async store(req, res){
        const { username } = req.body

        const response = await axios.get(`https://api.github.com/users/${username}`)

        const {name, bio, avatar_url: avatar} = response.data

        const dev = await devModel.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json({dev})
    },

    async index(req, res){
        const { user } = req.headers

        const loggedDev = await devModel.findById(user)

        const users = await devModel.find({
            $and: [
                {_id: {$ne: user}},
                { _id: {$nin: loggedDev.likes}},
                { _id: {$nin: loggedDev.dislikes}}
            ]
        })

        return res.json(users)
    }
}