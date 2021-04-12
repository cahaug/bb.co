const authen = require('express').Router();
const bcrypt = require('bcryptjs');
const generateTokenConsumer = require('../middleware/generateTokenConsumer.js')
const hostNameGuard = require('../middleware/hostNameGuard.js')
var bouncer = require('express-bouncer')(500,900000)
const { addConsumer, singleConsumerForLogin } = require('../database/queries.js');
var yescape = require('escape-html')


authen.post('/loginConsumer', hostNameGuard, bouncer.block, async (req, res) => {
    // takes in body of {nimi:'', parol:''}
    try {
        const parol = req.body.parol
        let singleConsumerForLoginRet = singleConsumerForLogin(yescape(req.body.nimi))
        if(singleConsumerForLoginRet.length > 0){
            if(singleConsumerForLoginRet[0] && bcrypt.compareSync(parol, singleConsumerForLoginRet[0].парольшиш)){
                //valid user, give token
                const token = generateTokenConsumer(singleConsumerForLoginRet[0])
                res.status(201).json({
                    message:'login success',
                    uid:singleConsumerForLoginRet[0].потребительИД,
                    token:token,
                    imya:singleConsumerForLoginRet[0].имя
                })
                bouncer.reset(req)
                console.log(`Consumer: ${singleConsumerForLoginRet[0].имя} : Login Request Complete`)
            } else {
                //invalid password
                console.log(`Consumer: ${singleConsumerForLoginRet[0].имя} : Invalid Password Attempted`)
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
        let consumer = {емейл:yescape(req.body.email), имя:yescape(req.body.nimi), странаИСО2:yescape(req.body.iso2digCC)}
        console.log('incoming consumer registration', consumer)
        const парольшиш = bcrypt.hashSync(req.body.parol, 8)
        consumer = {...consumer, парольшиш:парольшиш}
        console.log('na shish', consumer)
        const insertedConsumer = await addConsumer(consumer)
        console.log('insertedConsumer', insertedConsumer)
        let singleConsumerForLoginRet = singleConsumerForLogin(yescape(req.body.nimi))
        const token = generateTokenConsumer(singleConsumerForLoginRet[0])
        res.status(201).json({
            message:'account created',
            uid:singleConsumerForLoginRet[0].потребительИД,
            token:token,
            imya:singleConsumerForLoginRet[0].имя
        })
        bouncer.reset(req)
        console.log(`Consumer: ${singleConsumerForLoginRet[0].имя} : Registration Request Complete`)

    } catch (err) {
        console.log('registerConsumerErr', err)
        res.status(400).json({message:'err', err:err})
    }
})

module.exports = authen