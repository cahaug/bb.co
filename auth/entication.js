const authen = require('express').Router();
const bcrypt = require('bcryptjs');
const generateTokenConsumer = require('../middleware/generateTokenConsumer.js')
const hostNameGuard = require('../middleware/hostNameGuard.js')
var bouncer = require('express-bouncer')(500,900000)
const { addConsumer, singleConsumerForLogin } = require('../db/queries.js');
var yescape = require('escape-html')

// All hatred stems from hatred itself.  Nip it in the bud.

authen.post('/loginConsumer', hostNameGuard, bouncer.block, async (req, res) => {
    // takes in body of {nimi:'', parol:''}
    try {
        const parol = req.body.parol
        let singleConsumerForLoginRet = await singleConsumerForLogin(yescape(req.body.nimi))
        console.log('single consumer ret', singleConsumerForLoginRet)
        if(singleConsumerForLoginRet.length > 0){
            if(singleConsumerForLoginRet[0] && bcrypt.compareSync(parol, singleConsumerForLoginRet[0].passwordHash)){
                //valid user, give token
                const token = generateTokenConsumer(singleConsumerForLoginRet[0])
                res.status(201).json({
                    message:'login success',
                    uid:singleConsumerForLoginRet[0].consumerId,
                    token:token,
                    imya:singleConsumerForLoginRet[0].username
                })
                bouncer.reset(req)
                console.log(`Consumer: ${singleConsumerForLoginRet[0].username} : Login Request Complete`)
            } else {
                //invalid password
                console.log(`Consumer: ${singleConsumerForLoginRet[0].username} : Invalid Password Attempted`)
                res.status(400).json({message:'incorrect password or username'})
            }
        } else {
            //invalid username
            console.log(`Consumer: ${yescape(req.body.nimi)} : N/a Username Login Attempt`)
            res.status(400).json({message:'incorrect password or username'})
        }
    } catch (err) {
        console.log('loginConsumerErr', err)
        res.status(400).json({message:'err', err:err})
    }
})

authen.post('/registerConsumer', hostNameGuard, bouncer.block, async (req, res) => {
    // takes in body of {email: '', nimi:'', iso2digCC: '', parol:'' }
    try {
        let consumer = {email:yescape(req.body.email), username:yescape(req.body.nimi), countryCode:yescape(req.body.iso2digCC)}
        console.log('incoming consumer registration', consumer)
        const passwordHash = bcrypt.hashSync(req.body.parol, 8)
        consumer = {...consumer, passwordHash:passwordHash}
        console.log('na shish', consumer)
        const insertedConsumer = await addConsumer(consumer)
        console.log('insertedConsumer', insertedConsumer)
        let singleConsumerForLoginRet = await singleConsumerForLogin(yescape(req.body.nimi))
        console.log('consumer for login',singleConsumerForLoginRet)
        const token = generateTokenConsumer(singleConsumerForLoginRet[0])
        res.status(201).json({
            message:'account created',
            uid:singleConsumerForLoginRet[0].consumerId,
            token:token,
            imya:singleConsumerForLoginRet[0].username
        })
        bouncer.reset(req)
        console.log(`Consumer: ${singleConsumerForLoginRet[0].username} : Registration Request Complete`)

    } catch (err) {
        console.log('registerConsumerErr', err)
        res.status(400).json({message:'err', err:err})
    }
})

module.exports = authen