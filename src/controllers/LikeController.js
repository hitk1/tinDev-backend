const devModel = require('../models/Dev')

module.exports = {
    async store(req, res){

        const { user } = req.headers
        const { devId } = req.params

        const loggedDev = await devModel.findById(user)
        const targetDev = await devModel.findById(devId)

        if(!targetDev){
            return res.status(400).json({error: 'Dev do not exists'})
        }

        if(targetDev.likes.includes(user)){
            console.log('Deu match')
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save()

        return res.json({loggedDev})
    }
}