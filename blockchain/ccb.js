const ccB = require('express').Router()
var sha512 = require('js-sha512');
var fs = require('fs');
const axios = require('axios')
const superRestricted = require('../middleware/superRestricted.js')
const hostNameGuard = require('../middleware/hostNameGuard.js')
const { getCrimForChain } = require('../db/queries.js')

//remove 2nd layer protection hostnameguard when marking in crims 
ccB.post('/blast', hostNameGuard, superRestricted, async (req,res) => {
    // req.body.criminalId only str
    try{
        let criminalId = parseInt(req.body.criminalId, 10)
        const gotCrimForChain = await getCrimForChain(criminalId)
        //verify gotCrimForChain Returns proper
        console.log(gotCrimForChain)
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
        const lastBlockIndex = chain.length-1
        const cyka = { lbi:lastBlockIndex, hashLB:hashOfLastBlock, badMon:gotCrimForChain[0]}
        const aloittaa = await axios.post('http://10.110.0.4/ccb/doMath', cyka, {headers:{ öäållåюячгфывацуфвшвызфыдюябчтсшыжтжйö: { bin:'1234' } } })
        console.log('did process begin res', aloittaa.data)
        res.status(200).json({message:`Chaining Begun for CriminalId: ${criminalId}`, bc: aloittaa})
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
    try {
        const cyka = { block:req.body.block, proof:req.body.proof }
        
        let chain
        fs.readFile('/tmp/chain.txt', 'utf16le', (err, data) => {
            if(err){
                console.log('err')
                return
            }
            chain = JSON.parse(data)
        })

        chain.push(cyka)
        
        fs.writeFile('/tmp/chain.txt', 'utf16le', chain, err => {
            if (err) {
                console.error(err)
                return
            }
            //file written successfully
        })
        console.log(`Block with Proof: ${cyka.proof} added to chain`)
        res.status(201).json({message:`Block with Proof: ${cyka.proof} added to chain`, block:cyka })
    } catch (err) {
        console.log('bot problema',err)
        res.status(400).json({message:'IZVINITE Sr. Robot, BOT PROBLEMA'})
    }
})

module.exports = ccB