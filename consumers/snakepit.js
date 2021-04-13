const consu = require('express').Router()
var yescape = require('escape-html')
var bouncer = require('express-bouncer')(500,900000)
const restricted = require('../middleware/restricted.js')
const hostNameGuard = require('../middleware/hostNameGuard.js')
const { addCriminal, addCrimeEvent, addDataEntry, addCommentOnCriminal, addCommentOnCrimeEvent, addCommentOnDataEntry } = require('../db/queries.js')


// blackballing crims is truly thankless work,
// as you can see it literally does not track attribution
// iss true Bommunism B hope y'all like it
// already know you won't 
// XD LMAO :')
// -cah/Link-In.Bio Ltd


consu.post('/addCriminal', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.ochko strs incl: legalName, probableLocation, estimatedAge, pictureURL, estimatedAge(int)
    //              highestLevelOfEdu, primaryEdu, secondaryEdu, primaryEmployment,
    //              secondaryEmployment, historicEmployment, trade, awardsAccolades,
    //              languagesSpoken, nationality, socioeconomicBG, demographicBG, biography
    //              firstName, middleName, lastName
    // req.body.ochko bools incl: hasFamily, alive, atLarge, chargesFiled, onBail, acquitted,
    //              convicted, sentenced, appeal, incarcerated, reformed
    try {
        let criminal = {
            // strs
            legalName: yescape(req.body.ochko.legalName),
            firstName: yescape(req.body.ochko.firstName),
            middleName: yescape(req.body.ochko.middleName),
            lastName: yescape(req.body.ochko.lastName),
            probableLocation: yescape(req.body.ochko.probableLocation),
            estimatedAge: parseInt(yescape(req.body.ochko.estimatedAge), 10),
            // dateOfBirth: '',//timestamp
            pictureURL: yescape(req.body.ochko.pictureURL),
            highestLevelOfEdu: yescape(req.body.ochko.highestLevelOfEdu),
            primaryEdu: yescape(req.body.ochko.primaryEdu),
            secondaryEdu: yescape(req.body.ochko.secondaryEdu),
            primaryEmployment: yescape(req.body.ochko.primaryEmployment),
            secondaryEmployment: yescape(req.body.ochko.secondaryEmployment),
            historicEmployment: yescape(req.body.ochko.historicEmployment),
            trade: yescape(req.body.ochko.trade),
            awardsAccolades: yescape(req.body.ochko.awardsAccolades),
            languagesSpoken: yescape(req.body.ochko.languagesSpoken),
            nationality: yescape(req.body.ochko.nationality),
            socioeconomicBG: yescape(req.body.ochko.socioeconomicBG),
            demographicBG: yescape(req.body.ochko.demographicBG),
            biography: yescape(req.body.ochko.biography),
            //bools
            hasFamily: !!req.body.ochko.hasFamily,
            alive: !!req.body.ochko.alive,
            atLarge: !!req.body.ochko.atLarge,
            chargesFiled: !!req.body.ochko.chargesFiled,
            onBail: !!req.body.ochko.onBail,
            acquitted: !!req.body.ochko.acquitted,
            convicted: !!req.body.ochko.convicted,
            sentenced: !!req.body.ochko.sentenced,
            appeal: !!req.body.ochko.appeal,
            incarcerated: !!req.body.ochko.incarcerated,
            reformed: !!req.body.ochko.reformed,
        }
        const addedCrim = await addCriminal(criminal)
        bouncer.reset(req)
        res.status(201).json({message:'Added Criminal Successfully', addedCrim: addedCrim})
    } catch (err) {
        console.log('addCriminal Error', err)
        res.status(400).json({message:'Error Adding Criminal', err:err})
    }
})


consu.post('/addCrimeEvent', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.rikös strs incl: complaintCategory, statusCode, firstOccurrenceDateTime, 
    //                   secondOccurrenceDateTime, thirdOccurrenceDateTime, lastOccurrenceDateTime
    //                  venueOfIncident, occurredAtLocation, occuredInCity, occuredInRegion,
    //                  occuredInCountry, offenderTestimony, victimSocioeconomicBG,
    //                  victimDemographicBG, victimBiography, descriptionOfInjury,
    //                  perpetratorBiography, eventDescriptionNarrative, victimCapacityAtTime,
    //                  perpetratorCapacityAtTime, legalResolutionCriminal, legalResolutionCivil
    // req.body bools incl: isolatedEvent, reportedToLocalPolice, beingInvestigated, caseClosed, inBlockchain
    //                  chargesBrought, chargesDropped, convictionLevied, convicted, appealedConviction
    try {
        let crimeEvent = {
            // strs
            complaintCategory: yescape(req.body.rikös.complaintCategory),
            statusCode: yescape(req.body.rikös.statusCode),
            firstOccurrenceDateTime: yescape(req.body.rikös.firstOccurrenceDateTime),
            secondOccurrenceDateTime: yescape(req.body.rikös.secondOccurrenceDateTime),
            thirdOccurrenceDateTime: yescape(req.body.rikös.thirdOccurrenceDateTime),
            lastOccurrenceDateTime: yescape(req.body.rikös.lastOccurrenceDateTime),
            venueOfIncident: yescape(req.body.rikös.venueOfIncident),
            occurredAtLocation: yescape(req.body.rikös.occurredAtLocation),
            occuredInCity: yescape(req.body.rikös.occuredInCity),
            occuredInRegion: yescape(req.body.rikös.occuredInRegion),
            occurredInCountry: yescape(req.body.rikös.occurredInCountry),
            offenderTestimony: yescape(req.body.rikös.offenderTestimony),
            victimSocioeconomicBG: yescape(req.body.rikös.victimSocioeconomicBG),
            victimDemographicBG: yescape(req.body.rikös.victimDemographicBG),
            victimBiography: yescape(req.body.rikös.victimBiography),
            descriptionOfInjury: yescape(req.body.rikös.descriptionOfInjury),
            perpetratorBiography: yescape(req.body.rikös.perpetratorBiography),
            eventDescriptionNarrative: yescape(req.body.rikös.eventDescriptionNarrative),
            victimCapacityAtTime: yescape(req.body.rikös.victimCapacityAtTime),
            perpetratorCapacityAtTime: yescape(req.body.rikös.perpetratorCapacityAtTime),
            legalResolutionCriminal: yescape(req.body.rikös.legalResolutionCriminal),
            legalResolutionCivil: yescape(req.body.rikös.legalResolutionCivil),
            // bools
            isolatedEvent: !!req.body.rikös.isolatedEvent,
            reportedToLocalPolice: !!req.body.rikös.reportedToLocalPolice,
            beingInvestigated: !!req.body.rikös.beingInvestigated,
            caseClosed: !!req.body.rikös.caseClosed,
            chargesBrought: !!req.body.rikös.chargesBrought,
            chargesDropped: !!req.body.rikös.chargesDropped,
            convictionLevied: !!req.body.rikös.convictionLevied,
            convicted: !!req.body.rikös.convicted,
            appealedConviction: !!req.body.rikös.appealedConviction,
            inBlockchain: !!req.body.rikös.inBlockchain,
        }
        const addedCrimeEvent = await addCrimeEvent(crimeEvent)
        bouncer.reset(req)
        res.status(201).json({message:'Added CrimeEvent Successfully', addedCrimeEvent: addedCrimeEvent})
    } catch (err) {
        console.log('addCrimeEvent Error', err)
        res.status(400).json({message:'Error Adding CrimeEvent', err:err})
    }
})


consu.post('/addEvidence', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.todisteet strs incl: title, description, link, shortDescription, category, crimeEventId
    try {
        let evidence = {
            // refs
            событиеИД: parseInt(yescape(req.body.todisteet.событиеИД), 10),
            // strs
            title: yescape(req.body.todisteet.title),
            description: yescape(req.body.todisteet.description),
            link: yescape(req.body.todisteet.link),
            shortDescription: yescape(req.body.todisteet.shortDescription),
            category: yescape(req.body.todisteet.category),
        }
        const addedEvidence = await addDataEntry(evidence)
        bouncer.reset(req)
        res.status(201).json({message:'Added Evidence Successfully', addedEvidence:addedEvidence})
    } catch (err) {
        console.log('addEvidence Error', err)
        res.status(400).json({message:'Error Adding Evidence', err:err})
    }
})


consu.post('/addCommentCriminal', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.skazat1 strs incl: contentText. criminalId, consumerId, kirjoittanut
    try {
        let commentary = {
            kirjoittanut: req.decodedToken.имя,
            потребительИД: req.decodedToken.потребительИД,
            преступникИД: parseInt(yescape(req.body.skazat1.преступникИД), 10),
            contentText: yescape(req.body.skazat1.contentText)
        }
        const addedCommentCriminal = await addCommentOnCriminal(commentary)
        bouncer.reset(req)
        res.status(201).json({message:'Added Comment Criminal Successfully', addedCommentCriminal:addedCommentCriminal})
    } catch (err) {
        console.log('addComment Criminal Error', err)
        res.status(400).json({message:'Error Adding Comment Criminal', err:err})
    }
})


consu.post('/addCommentCrimeEvent', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.skazat2 strs incl: contentText. crimieEventId, consumerId, kirjoittanut
    try {
        let commentary = {
            kirjoittanut: req.decodedToken.имя,
            потребительИД: req.decodedToken.потребительИД,
            событиеИД: parseInt(yescape(req.body.skazat2.событиеИД), 10),
            contentText: yescape(req.body.skazat2.contentText)
        }
        const addedCommentCrimeEvent = await addCommentOnCrimeEvent(commentary)
        bouncer.reset(req)
        res.status(201).json({message:'Added Comment Crime Event Successfully', addedCommentCrimeEvent:addedCommentCrimeEvent})
    } catch (err) {
        console.log('addComment Crime Event Error', err)
        res.status(400).json({message:'Error Adding Comment Crime Event', err:err})
    }
})


consu.post('/addCommentCrimeEvent', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.skazat3 strs incl: contentText. crimieEventId, consumerId, kirjoittanut
    try {
        let commentary = {
            kirjoittanut: req.decodedToken.имя,
            потребительИД: req.decodedToken.потребительИД,
            событиеИД: parseInt(yescape(req.body.skazat3.событиеИД), 10),
            contentText: yescape(req.body.skazat3.contentText)
        }
        const addedCommentCrimeEvent = await addCommentOnDataEntry(commentary)
        bouncer.reset(req)
        res.status(201).json({message:'Added Comment Crime Event Successfully', addedCommentCrimeEvent:addedCommentCrimeEvent})
    } catch (err) {
        console.log('addComment Crime Event Error', err)
        res.status(400).json({message:'Error Adding Comment Crime Event', err:err})
    }
})


module.exports = consu