const knex = require('./knex')

module.exports = {
    getAllCriminals(){
        return knex('преступники');
    },

    getAllCrimes(){
        return knex('события');
    },

    addConsumer(consumer){
        return knex('потребитель').insert(consumer);
    },

    singleConsumerForLogin(username){
        // return knex('потребитель').where('имя', username);
        return knex('потребитель');
    },

    addCriminal(criminal){
        return knex('преступники').insert(criminal);
    },

    addCrimeEvent(crimeEvent){
        return knex('события').insert(crimeEvent);
    },

    addDataEntry(evidence){
        return knex('данные').insert(evidence);
    },

    addCommentOnCriminal(commentary){
        return knex('суждения1').insert(commentary);
    },

    addCommentOnCrimeEvent(commentary){
        return knex('суждения2').insert(commentary);
    },

    addCommentOnDataEntry(commentary){
        return knex('суждения3').insert(commentary);
    },

    commentaryForCriminal(criminalId){
        return knex('суждения1').where('преступникИД', criminalId);
    },
    
    commentaryForCrimeEvent(crimeEventId){
        return knex('суждения2').where('потребительИД', crimeEventId);
    },

    commentaryForDataEntry(dataEntryId){
        return knex('суждения3').where('данныеИД', dataEntryId);
    },

    criminalSearchLegalName(legalName){
        return knex('преступники').where('legalName', legalName);
    },

    criminalSearchLastFirst(firstName, lastName){
        return knex('преступники').where('lastName', lastName).where('firstName', firstName);
    },

    criminalSearchLastMiddleFirst(firstName, middleName, lastName){
        return knex('преступники').where('lastName', lastName).where('firstName', firstName).where('middleName', middleName);
    },

    dataForCrimeId(crimeEventId){
        return knex('данные').where('событиеИД', crimeEventId);
    },

    crimesForCriminal(criminalId){
        return knex('события').where('преступникИД', criminalId);
    },

    incrementCriminalViews(criminalId){
        return knex('преступники').where('преступникИД', criminalId).increment({profileViews: 1});
    },

    incrementEventViews(crimeEventId){
        return knex('события').where('событиеИД', crimeEventId).increment({eventViews: 1});
    },
    
    incrementEvidenceViews(evidenceId){
        return knex('данные').where('данныеИД', evidenceId).increment({itemViews: 1});
    },

    incrementCriminalDepravity(criminalId){
        return knex('преступники').where('преступникИД', criminalId).increment({depravityScore: 1});
    },

    incrementDepravityScoreEvent(crimeEventId){
        return knex('события').where('событиеИД', crimeEventId).increment({depravityScore: 1});
    },
    
    incrementJusticeScoreEvent(crimeEventId){
        return knex('события').where('событиеИД', crimeEventId).increment({justiceScore: 1});
    },
    
    incrementEvidenceRelevance(evidenceId){
        return knex('данные').where('данныеИД', evidenceId).increment({relevancyScore: 1});
    },

    incrementCriminalCommentRelevancy(criminalCommentId){
        return knex('суждения1').where('суждения1ИД', criminalCommentId).increment({relevancyScore: 1});
    },

    incrementCriminalCommentDepravity(criminalCommentId){
        return knex('суждения1').where('суждения1ИД', criminalCommentId).increment({depravityScore: 1});
    },

    incrementCrimeEventCommentRelevancy(crimeEventCommentId){
        return knex('суждения2').where('суждения2ИД', crimeEventCommentId).increment({relevancyScore: 1});
    },

    incrementCrimeEventCommentDepravity(crimeEventCommentId){
        return knex('суждения2').where('суждения2ИД', crimeEventCommentId).increment({depravityScore: 1});
    },

    incrementEvidenceCommentRelevancy(evidenceCommentId){
        return knex('суждения3').where('суждения3ИД', evidenceCommentId).increment({relevancyScore: 1});
    },

    incrementEvidenceCommentDepravity(evidenceCommentId){
        return knex('суждения3').where('суждения3ИД', evidenceCommentId).increment({depravityScore: 1});
    },

    decrementCriminalDepravity(criminalId){
        return knex('преступники').where('преступникИД', criminalId).decrement({depravityScore: 1});
    },

    decrementJusticeScoreEvent(crimeEventId){
        return knex('события').where('событиеИД', crimeEventId).decrement({justiceScore: 1});
    },

    decrementDepravityScoreEvent(crimeEventId){
        return knex('события').where('событиеИД', crimeEventId).decrement({depravityScore: 1});
    },

    decrementEvidenceRelevance(evidenceId){
        return knex('данные').where('данныеИД', evidenceId).decrement({relevancyScore: 1});
    },

    decrementCriminalCommentRelevancy(criminalCommentId){
        return knex('суждения1').where('суждения1ИД', criminalCommentId).decrement({relevancyScore: 1});
    },

    decrementCriminalCommentDepravity(criminalCommentId){
        return knex('суждения1').where('суждения1ИД', criminalCommentId).decrement({depravityScore: 1});
    },

    decrementCrimeEventCommentRelevancy(crimeEventCommentId){
        return knex('суждения2').where('суждения2ИД', crimeEventCommentId).decrement({relevancyScore: 1});
    },

    decrementCrimeEventCommentDepravity(crimeEventCommentId){
        return knex('суждения2').where('суждения2ИД', crimeEventCommentId).decrement({depravityScore: 1});
    },

    decrementEvidenceCommentRelevancy(evidenceCommentId){
        return knex('суждения3').where('суждения3ИД', evidenceCommentId).decrement({relevancyScore: 1});
    },

    decrementEvidenceCommentDepravity(evidenceCommentId){
        return knex('суждения3').where('суждения3ИД', evidenceCommentId).decrement({depravityScore: 1});
    },

    getCrimForChain(criminalId){
        return knex('преступники').where('преступникИД', criminalId);
    }

}