const ccB = require('express').Router()
var sha512 = require('js-sha512');
var fs = require('fs');
const superRestricted = require('../middleware/superRestricted.js')
const hostNameGuard = require('../middleware/hostNameGuard.js')
const { getCrimForChain } = require('../db/queries.js')

//remove 2nd layer protection hostnameguard when marking in crims 
ccB.post('/blast', hostNameGuard, superRestricted, async (req,res) => {
    // req.body.criminalId only str
    try{
        let criminalId = parseInt(req.body.criminalId, 10)
        const gotCrimForChain = await getCrimForChain(criminalId)
        let chain
        fs.readFile('/tmp/chain.txt', 'utf8', (err, data) => {
            if(err){
                console.log('err')
                return
            }
            chain = JSON.parse(data)
        })
        const lastBlock = chain[chain.length-1]
        const hashOfLastBlock = sha512(JSON.stringify(lastBlock))


    } catch(err){
        console.log('chain blast error')
        res.status(400).json({message:'chain blast error', err:err})
    }
})

// going to have to offload miner onto own server
// send package to miner in blast
// miner responds ok, mining action is callback after settimeout(callback, 1000) res.status(200).json({msg:'queued'})
// miner begins mining, while loop activated after message sent 
// receive package in receiver when mining complete for addition to chain
ccB.post('/receiver', hostNameGuard, superRestricted, async (req, res) => {
    // catch request from miner server
    // verify hashing is correct
    // add to chain
})

module.exports = ccB