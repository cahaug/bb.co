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
        return knex('потребитель').where('имя', username);
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

}