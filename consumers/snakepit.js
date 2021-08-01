const consu = require('express').Router()
var yescape = require('escape-html')
var bouncer = require('express-bouncer')(500,900000)
const restricted = require('../middleware/restricted.js')
const hostNameGuard = require('../middleware/hostNameGuard.js')
const { addCriminal, addCrimeEvent, addDataEntry, addCommentOnCriminal, addCommentOnCrimeEvent, addCommentOnDataEntry, criminalSearchLegalName, criminalSearchLastFirst, criminalSearchLastMiddleFirst, commentaryForCriminal, commentaryForCrimeEvent, commentaryForDataEntry, crimesForCriminal, dataForCrimeId, incrementCriminalDepravity, decrementCriminalDepravity, incrementCriminalViews, incrementEventViews, incrementEvidenceViews, decrementDepravityScoreEvent, incrementDepravityScoreEvent, decrementJusticeScoreEvent, incrementJusticeScoreEvent, decrementEvidenceRelevance, incrementEvidenceRelevance, incrementCriminalCommentRelevancy, incrementCriminalCommentDepravity, decrementCriminalCommentRelevancy, decrementCriminalCommentDepravity, incrementCrimeEventCommentRelevancy, incrementCrimeEventCommentDepravity, decrementCrimeEventCommentRelevancy, decrementCrimeEventCommentDepravity, incrementEvidenceCommentRelevancy, incrementEvidenceCommentDepravity, decrementEvidenceCommentRelevancy, decrementEvidenceCommentDepravity } = require('../db/queries.js')


// blackballing crims is truly thankless work,
// as you can see it literally does not track attribution


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
            crimeId: parseInt(yescape(req.body.todisteet.crimeId), 10),
            // strs
            title: yescape(req.body.todisteet.title),
            description: yescape(req.body.todisteet.description),
            link: yescape(req.body.todisteet.link),
            shortDescription: yescape(req.body.todisteet.shortDescription),
            category: yescape(req.body.todisteet.category),
        }
        const addedEvidence = await addDataEntry(evidence)
        bouncer.reset(req)
        res.status(201).json({message:'Added Evidence Successfully', addedEvidence: addedEvidence})
    } catch (err) {
        console.log('addEvidence Error', err)
        res.status(400).json({message:'Error Adding Evidence', err:err})
    }
})


consu.post('/addCommentCriminal', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.skazat1 strs incl: contentText. criminalId, consumerId, kirjoittanut
    try {
        let commentary = {
            kirjoittanut: req.decodedToken.username,
            consumerId: req.decodedToken.consumerId,
            преступникИД: parseInt(yescape(req.body.skazat1.преступникИД), 10),
            contentText: yescape(req.body.skazat1.contentText)
        }
        const addedCommentCriminal = await addCommentOnCriminal(commentary)
        bouncer.reset(req)
        res.status(201).json({message:'Added Comment Criminal Successfully', addedCommentCriminal: addedCommentCriminal})
    } catch (err) {
        console.log('addComment Criminal Error', err)
        res.status(400).json({message:'Error Adding Comment Criminal', err:err})
    }
})


consu.post('/addCommentCrimeEvent', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.skazat2 strs incl: contentText. crimieEventId, consumerId, kirjoittanut
    try {
        let commentary = {
            kirjoittanut: req.decodedToken.username,
            consumerId: req.decodedToken.consumerId,
            crimeId: parseInt(yescape(req.body.skazat2.crimeId), 10),
            contentText: yescape(req.body.skazat2.contentText)
        }
        const addedCommentCrimeEvent = await addCommentOnCrimeEvent(commentary)
        bouncer.reset(req)
        res.status(201).json({message:'Added Comment Crime Event Successfully', addedCommentCrimeEvent: addedCommentCrimeEvent})
    } catch (err) {
        console.log('addComment Crime Event Error', err)
        res.status(400).json({message:'Error Adding Comment Crime Event', err:err})
    }
})


consu.post('/addCommentEvidence', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.skazat3 strs incl: contentText. crimieEventId, consumerId, kirjoittanut
    try {
        let commentary = {
            kirjoittanut: req.decodedToken.username,
            consumerId: req.decodedToken.consumerId,
            dataId: parseInt(yescape(req.body.skazat3.dataId), 10),
            contentText: yescape(req.body.skazat3.contentText)
        }
        const addedCommentEvidence = await addCommentOnDataEntry(commentary)
        bouncer.reset(req)
        res.status(201).json({message:'Added Comment Evidence Successfully', addedCommentEvidence: addedCommentEvidence})
    } catch (err) {
        console.log('addComment Evidence Error', err)
        res.status(400).json({message:'Error Adding Comment Evidence', err:err})
    }
})


consu.post('/searchCrimsLegalName', hostNameGuard, bouncer.block, async (req, res) => {
    // req.body.legalName only str
    try {
        let legalName = yescape(req.body.legalName)
        const searchedForCrimLegalName = await criminalSearchLegalName(legalName)
        bouncer.reset(req)
        res.status(200).json({message:'queried LegalName', searchedForCrimLegalName: searchedForCrimLegalName})
    } catch (err) {
        console.log('SearchCrims LegalName Error', err)
        res.status(400).json({message:'Error Querying LegalName', err:err})
    }
})


consu.post('/searchCrimsLastFirst', hostNameGuard, bouncer.block, async (req, res) => {
    // req.body.firstName, req.body.lastName only strs
    try {
        let firstName = yescape(req.body.firstName)
        let lastName = yescape(req.body.lastName)
        const searchedForCrimLastFirst = await criminalSearchLastFirst(firstName, lastName)
        bouncer.reset(req)
        res.status(200).json({message:'queried lastFirst', searchedForCrimLastFirst: searchedForCrimLastFirst})
    } catch (err) {
        console.log('SearchCrims LastFirst Error', err)
        res.status(400).json({message:'Error Querying LastFirst', err:err})
    }
})


consu.post('/searchCrimsWithMid', hostNameGuard, bouncer.block, async (req, res) => {
    // req.body.firstName, req.body.middleName, req.body.lastName only strs
    try {
        let firstName = yescape(req.body.firstName)
        let middleName = yescape(req.body.middleName)
        let lastName = yescape(req.body.lastName)
        const searchedForCrimWithMid = await criminalSearchLastMiddleFirst(firstName, middleName, lastName)
        bouncer.reset(req)
        res.status(200).json({message:'queried WthMid', searchedForCrimWithMid: searchedForCrimWithMid})
    } catch (err) {
        console.log('SearchCrims LastFirst Error', err)
        res.status(400).json({message:'Error Querying WithMid', err:err})
    }
})


consu.post('/commentaryForCriminal', hostNameGuard, bouncer.block, async (req, res) => {
    // req.body.criminalId only str
    try {
        let criminalId = parseInt(yescape(req.body.criminalId), 10)
        const commentaryForCrim = await commentaryForCriminal(criminalId)
        bouncer.reset(req)
        res.status(200).json({message:'Commentary Criminal', commentaryForCrim: commentaryForCrim})
    } catch (err) {
        console.log('Commentary Criminal Error', err)
        res.status(400).json({message:'Error Get Commentary Criminal', err:err})
    }
})


consu.post('/commentaryForCrimeEvent', hostNameGuard, bouncer.block, async (req, res) => {
    // req.body.crimeEventId only str
    try {
        let crimeEventId = parseInt(yescape(req.body.crimeEventId), 10)
        const commentaryForCrimeEv = await commentaryForCrimeEvent(crimeEventId)
        bouncer.reset(req)
        res.status(200).json({message:'Commentary CrimeEvent', commentaryForCrimeEv: commentaryForCrimeEv})
    } catch (err) {
        console.log('Commentary CrimeEvent Error', err)
        res.status(400).json({message:'Error Get Commentary CrimeEvent', err:err})
    }
})


consu.post('/commentaryForEvidence', hostNameGuard, bouncer.block, async (req, res) => {
    // req.body.evidenceId only str
    try {
        let dataEntryId = parseInt(yescape(req.body.evidenceId), 10)
        const commentaryForEvi = await commentaryForDataEntry(dataEntryId)
        bouncer.reset(req)
        res.status(200).json({message:'Commentary Evidence', commentaryForEvi: commentaryForEvi})
    } catch (err) {
        console.log('Commentary Evidence Error', err)
        res.status(400).json({message:'Commentary Evidence Error', err:err})
    }
})


consu.post('/crimesForCrim', hostNameGuard, bouncer.block, async (req, res) => {
    // req.body.criminalId only str
    try {
        let criminalId = parseInt(yescape(req.body.criminalId), 10)
        const crimesForCrim = crimesForCriminal(criminalId)
        bouncer.reset(req)
        res.status(200).json({message:'Queried Crimes4Criminal', crimesForCrim: crimesForCrim})
    } catch (err) {
        console.log('Query Crimes4Crim Error', err)
        res.status(400).json({message:'Query Crimes4Crim Error', err:err})
    }
})


consu.post('/evidenceForCrimeEvent', hostNameGuard, bouncer.block, async (req, res) => {
    // req.body.crimeEventId only str
    try {
        let crimeEventId = parseInt(yescape(req.body.crimeEventId), 10)
        const evidenceForCrimeEvent = await dataForCrimeId(crimeEventId)
        bouncer.reset(req)
        res.status(200).json({message:'Query Evidence4CrimeEvent', evidenceForCrimeEvent: evidenceForCrimeEvent})
    } catch (err) {
        console.log('Query Evidence4CrimeEvent Error', err)
        res.status(400).json({message:'Query Evidence4CrimeEvent Error', err:err})
    }
})


consu.post('/guestbook', hostNameGuard, bouncer.block, async (req, res) => {
    try {
        // req.body.row -> ['pres','sobi','dany'], req.body.id -> ['x']Id
        // split by req variety: criminal, event, evidence
        if(req.body.row === 'pres'){
            let criminalId = parseInt(yescape(req.body.id), 10)
            const incrementedCriminalViews = await incrementCriminalViews(criminalId)
            bouncer.reset(req)
            res.status(200).json({message:'Criminal View Recorded, Thank You', db: incrementedCriminalViews})
        }
        else if (req.body.row === 'sobi'){
            let crimeEventId = parseInt(yescape(req.body.id), 10)
            const incrementedEventViews = await incrementEventViews(crimeEventId)
            bouncer.reset(req)
            res.status(200).json({message:'Event View Recorded, Thank You', db: incrementedEventViews})
        }
        else if (req.body.row === 'dany'){
            let evidenceId = parseInt(yescape(req.body.id), 10)
            const incrementedEvidenceViews = await incrementEvidenceViews(evidenceId)
            bouncer.reset(req)
            res.status(200).json({message:'Evidence View Recorded, Thank You', db: incrementedEvidenceViews})
        }
        else {
            res.status(400).json({message:'valid guestbook row required'})
        }
    } catch (err) {
        console.log('guestbook error', err)
        res.status(400).json({message:'guestbook error', err:err})
    }
})

consu.post('/depravityIndexCriminal', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.criminalId only str, req.body.increment bool
    try {
        let criminalId = parseInt(yescape(req.body.criminalId), 10)
        const isIncrement = !!req.body.increment
        if(isIncrement === false){
            const decrementedCriminalDepravity = await decrementCriminalDepravity(criminalId)
            bouncer.reset(req)
            res.status(200).json({message:`decremented depravityIndexCriminal for Criminal: ${criminalId}`, db: decrementedCriminalDepravity})
        } else {
            const incrementedCriminalDepravity = await incrementCriminalDepravity(criminalId) 
            bouncer.reset(req)
            res.status(200).json({message:`incremented depravityIndexCriminal for Criminal: ${criminalId}`, db: incrementedCriminalDepravity})
        }
    } catch (err) {
        console.log('adjustDepravityIndex Criminal Error', err)
        res.status(400).json({message:'adjustDepravityIndex Criminal Error', err:err})
    }
})

consu.post('/depravityIndexEvent', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.criminalEventId only str, req.body.increment bool
    try {
        let criminalEventId = parseInt(yescape(req.body.criminalEventId), 10)
        const isIncrement = !!req.body.increment
        if(isIncrement === false){
            const decrementedCriminalEventDepravity = await decrementDepravityScoreEvent(criminalEventId)
            bouncer.reset(req)
            res.status(200).json({message:`decremented depravityIndex for CriminalEventId: ${criminalEventId}`, db: decrementedCriminalEventDepravity})
        } else {
            const incrementedCriminalEventDepravity = await incrementDepravityScoreEvent(criminalEventId) 
            bouncer.reset(req)
            res.status(200).json({message:`incremented depravityIndex for CriminalEventId: ${criminalEventId}`, db: incrementedCriminalEventDepravity})
        }
    } catch (err) {
        console.log('adjustDepravityIndex CriminalEvent Error', err)
        res.status(400).json({message:'adjustDepravityIndex CriminalEvent Error', err:err})
    }
})


consu.post('/justiceScoreEvent', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.criminalEventId only str, req.body.increment bool
    try {
        let criminalEventId = parseInt(yescape(req.body.criminalEventId), 10)
        const isIncrement = !!req.body.increment
        if(isIncrement === true){
            const incrementJusticeScore = await incrementJusticeScoreEvent(criminalEventId)
            bouncer.reset(req)
            res.status(200).json({message:`incremented justiceScore for CriminalEventId: ${criminalEventId}`, db: incrementJusticeScore})
        } else {
            const decrementJusticeScore = await decrementJusticeScoreEvent(criminalEventId)
            bouncer.reset(req)
            res.status(200).json({message:`decremented justiceScore for CriminalEventId: ${criminalEventId}`, db: decrementJusticeScore})
        }
    } catch (err) {
        console.log('adjustJusticeScore CriminalEvent Error', err)
        res.status(400).json({message:'adjustJusticeScore CriminalEvent Error', err:err})
    }
})

consu.post('/relevancyEvidence', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.evidenceId only str, req.body.increment bool
    try {
        let evidenceId = parseInt(yescape(req.body.evidenceId), 10)
        const isIncrement = !!req.body.increment
        if(isIncrement === false){
            const decrementedEvidence = await decrementEvidenceRelevance(evidenceId)
            bouncer.reset(req)
            res.status(200).json({message:`decremented evidence relevance for evidenceId: ${evidenceId}`, db: decrementedEvidence})
        } else {
            const incrementedEvidence = await incrementEvidenceRelevance(evidenceId)
            bouncer.reset(req)
            res.status(200).json({message:`incremented evidence relevance for evidenceId: ${evidenceId}`, db: incrementedEvidence})
        }
    } catch (err) {
        console.log('adjustRelevancy Evidence', err)
        res.status(400).json({message:'adjustRelevance Evidence Error', err:err})
    }
})

consu.post('/referee', hostNameGuard, restricted, bouncer.block, async (req, res) => {
    // req.body.row -> ['a':c1,'b':c2,'c':c3], req.body.id -> ['x']Id, req.body.фю -> [я:incr,д:decr], req.body.ää -> [å:rel,ö:dep]
    try {
        if(req.body.row === 'a'){
            let criminalCommentId = parseInt(yescape(req.body.id), 10)
            if(req.body.фю === 'я'){
                if(req.body.ää === 'å'){
                    const incrementedCCRel = await incrementCriminalCommentRelevancy(criminalCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`incremented relevance comments criminal cid: ${criminalCommentId}`, db: incrementedCCRel})
                }
                else if(req.body.ää === 'ö'){
                    const incrementedCCDep = await incrementCriminalCommentDepravity(criminalCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`incremented depravity comments criminal cid: ${criminalCommentId}`, db: incrementedCCDep})
                }
                else {
                    res.status(400).json({message:'valid ref rows required'})
                }
            }
            else if(req.body.фю === 'д'){
                if(req.body.ää === 'å'){
                    const decrementedCCRel = await decrementCriminalCommentRelevancy(criminalCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`decremented relevance comments criminal cid: ${criminalCommentId}`, db: decrementedCCRel})
                }
                else if(req.body.ää === 'ö'){
                    const decrementedCCDep = await decrementCriminalCommentDepravity(criminalCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`decremented depravity comments criminal cid: ${criminalCommentId}`, db: decrementedCCDep})
                }
                else {
                    res.status(400).json({message:'valid ref rows required'})
                }
            }
            else {
                res.status(400).json({message:'valid ref rows required'})
            }
        }
        else if(req.body.row === 'b'){
            let crimeEventCommentId = parseInt(yescape(req.body.id), 10)
            if(req.body.фю === 'я'){
                if(req.body.ää === 'å'){
                    const incrementedCERel = await incrementCrimeEventCommentRelevancy(crimeEventCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`incremented relevance comments event cid: ${crimeEventCommentId}`, db: incrementedCERel})
                }
                else if(req.body.ää === 'ö'){
                    const incrementedCEDep = await incrementCrimeEventCommentDepravity(crimeEventCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`incremented depravity comments event cid: ${crimeEventCommentId}`, db: incrementedCEDep})
                }
                else {
                    res.status(400).json({message:'valid ref rows required'})
                }
            }
            else if(req.body.фю === 'д'){
                if(req.body.ää === 'å'){
                    const decrementedCERel = await decrementCrimeEventCommentRelevancy(crimeEventCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`decremented relevance comments event cid: ${crimeEventCommentId}`, db: decrementedCERel})
                }
                else if(req.body.ää === 'ö'){
                    const decrementedCEDep = await decrementCrimeEventCommentDepravity(crimeEventCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`decremented depravity comments event cid: ${crimeEventCommentId}`, db: decrementedCEDep})
                }
                else {
                    res.status(400).json({message:'valid ref rows required'})
                }
            }
            else {
                res.status(400).json({message:'valid ref rows required'})
            }
        }
        else if(req.body.row === 'c'){
            let evidenceCommentId = parseInt(yescape(req.body.id), 10)
            if(req.body.фю === 'я'){
                if(req.body.ää === 'å'){
                    const incrementedERel = await incrementEvidenceCommentRelevancy(evidenceCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`incremented relevance comment evidence cid: ${evidenceCommentId}`, db: incrementedERel})
                }
                else if(req.body.ää === 'ö'){
                    const incrementedEDep = await incrementEvidenceCommentDepravity(evidenceCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`incremented depravity comment evidence cid: ${evidenceCommentId}`, db: incrementedEDep})
                }
                else {
                    res.status(400).json({message:'valid ref rows required'})
                }
            }
            else if(req.body.фю === 'д'){
                if(req.body.ää === 'å'){
                    const decrementedERel = await decrementEvidenceCommentRelevancy(evidenceCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`decremented relevance comment evidence cid: ${evidenceCommentId}`, db: decrementedERel})
                }
                else if(req.body.ää === 'ö'){
                    const decrementedEDep = await decrementEvidenceCommentDepravity(evidenceCommentId)
                    bouncer.reset(req)
                    res.status(200).json({message:`decremented depravity comment evidence cid: ${evidenceCommentId}`, db: decrementedEDep})
                }
                else {
                    res.status(400).json({message:'valid ref rows required'})
                }
            }
            else {
                res.status(400).json({message:'valid ref rows required'})
            }
        }
        else {
            res.status(400).json({message:'valid ref rows required'})
        }
    } catch (err) {
        console.log('ref blew whistle', err)
        res.status(400).json({message:'commentScoring adjustment Error', err:err})
    }
})


module.exports = consu