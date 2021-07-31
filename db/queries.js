const knex = require('./knex')

module.exports = {
    getAllCriminals(){
        return knex('criminals');
    },

    getAllCrimes(){
        return knex('crimes');
    },

    addConsumer(consumer){
        return knex('consumer').insert(consumer);
    },

    singleConsumerForLogin(username){
        return knex('consumer');
    },

    addCriminal(criminal){
        return knex('criminals').insert(criminal);
    },

    addCrimeEvent(crimeEvent){
        return knex('crimes').insert(crimeEvent);
    },

    addDataEntry(evidence){
        return knex('data').insert(evidence);
    },

    addCommentOnCriminal(commentary){
        return knex('comments1').insert(commentary);
    },

    addCommentOnCrimeEvent(commentary){
        return knex('comments2').insert(commentary);
    },

    addCommentOnDataEntry(commentary){
        return knex('comments3').insert(commentary);
    },

    commentaryForCriminal(criminalId){
        return knex('comments1').where('criminalId', criminalId);
    },
    
    commentaryForCrimeEvent(crimeEventId){
        return knex('comments2').where('crimeId', crimeEventId);
    },

    commentaryForDataEntry(dataEntryId){
        return knex('comments3').where('dataId', dataEntryId);
    },

    criminalSearchLegalName(legalName){
        return knex('criminals').where('legalName', legalName);
    },

    criminalSearchLastFirst(firstName, lastName){
        return knex('criminals').where('lastName', lastName).where('firstName', firstName);
    },

    criminalSearchLastMiddleFirst(firstName, middleName, lastName){
        return knex('criminals').where('lastName', lastName).where('firstName', firstName).where('middleName', middleName);
    },

    dataForCrimeId(crimeEventId){
        return knex('data').where('crimeId', crimeEventId);
    },

    crimesForCriminal(criminalId){
        return knex('crimes').where('criminalId', criminalId);
    },

    incrementCriminalViews(criminalId){
        return knex('criminals').where('criminalId', criminalId).increment({profileViews: 1});
    },

    incrementEventViews(crimeEventId){
        return knex('crimes').where('crimeId', crimeEventId).increment({eventViews: 1});
    },
    
    incrementEvidenceViews(evidenceId){
        return knex('data').where('dataId', evidenceId).increment({itemViews: 1});
    },

    incrementCriminalDepravity(criminalId){
        return knex('criminals').where('criminalId', criminalId).increment({depravityScore: 1});
    },

    incrementDepravityScoreEvent(crimeEventId){
        return knex('crimes').where('crimeId', crimeEventId).increment({depravityScore: 1});
    },
    
    incrementJusticeScoreEvent(crimeEventId){
        return knex('crimes').where('crimeId', crimeEventId).increment({justiceScore: 1});
    },
    
    incrementEvidenceRelevance(evidenceId){
        return knex('data').where('dataId', evidenceId).increment({relevancyScore: 1});
    },

    incrementCriminalCommentRelevancy(criminalCommentId){
        return knex('comments1').where('comments1Id', criminalCommentId).increment({relevancyScore: 1});
    },

    incrementCriminalCommentDepravity(criminalCommentId){
        return knex('comments1').where('comments1Id', criminalCommentId).increment({depravityScore: 1});
    },

    incrementCrimeEventCommentRelevancy(crimeEventCommentId){
        return knex('comments2').where('comments2Id', crimeEventCommentId).increment({relevancyScore: 1});
    },

    incrementCrimeEventCommentDepravity(crimeEventCommentId){
        return knex('comments2').where('comments2Id', crimeEventCommentId).increment({depravityScore: 1});
    },

    incrementEvidenceCommentRelevancy(evidenceCommentId){
        return knex('comments3').where('comments3Id', evidenceCommentId).increment({relevancyScore: 1});
    },

    incrementEvidenceCommentDepravity(evidenceCommentId){
        return knex('comments3').where('comments3Id', evidenceCommentId).increment({depravityScore: 1});
    },

    decrementCriminalDepravity(criminalId){
        return knex('criminals').where('criminalId', criminalId).decrement({depravityScore: 1});
    },

    decrementJusticeScoreEvent(crimeEventId){
        return knex('crimes').where('crimeId', crimeEventId).decrement({justiceScore: 1});
    },

    decrementDepravityScoreEvent(crimeEventId){
        return knex('crimes').where('crimeId', crimeEventId).decrement({depravityScore: 1});
    },

    decrementEvidenceRelevance(evidenceId){
        return knex('data').where('dataId', evidenceId).decrement({relevancyScore: 1});
    },

    decrementCriminalCommentRelevancy(criminalCommentId){
        return knex('comments1').where('comments1Id', criminalCommentId).decrement({relevancyScore: 1});
    },

    decrementCriminalCommentDepravity(criminalCommentId){
        return knex('comments1').where('comments1Id', criminalCommentId).decrement({depravityScore: 1});
    },

    decrementCrimeEventCommentRelevancy(crimeEventCommentId){
        return knex('comments2').where('comments2Id', crimeEventCommentId).decrement({relevancyScore: 1});
    },

    decrementCrimeEventCommentDepravity(crimeEventCommentId){
        return knex('comments2').where('comments2Id', crimeEventCommentId).decrement({depravityScore: 1});
    },

    decrementEvidenceCommentRelevancy(evidenceCommentId){
        return knex('comments3').where('comments3Id', evidenceCommentId).decrement({relevancyScore: 1});
    },

    decrementEvidenceCommentDepravity(evidenceCommentId){
        return knex('comments3').where('comments3Id', evidenceCommentId).decrement({depravityScore: 1});
    },

    getCrimForChain(criminalId){
        return knex('criminals').where('criminalId', criminalId);
    }

}