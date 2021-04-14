
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('пользователь', user => {
        user.increments('пользовательИД');
        user.string('емейл',255).defaultsTo(null);
        user.string('парольшиш');
        user.string('имя', 255).notNullable().unique();
        user.timestamp('создано_на', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('потребитель', user => {
        user.increments('потребительИД');
        user.string('емейл',255).defaultsTo(null);
        user.string('парольшиш');
        user.string('имя', 255).notNullable().unique();
        user.string('странаИСО2', 2).notNullable()
        user.timestamp('создано_на', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('преступники', record => {
        record.increments('преступникИД');
        record.timestamp('создано_на', { useTz: true }).defaultTo(knex.fn.now());
        record.string('legalName', 255).notNullable();
        record.string('probableLocation',255).defaultTo(null);
        record.integer('estimatedAge',3).defaultTo(null);
        record.timestamp('dateOfBirth', { useTz: true }).defaultTo(knex.fn.now());
        record.string('pictureURL',128).defaultTo(null);
        record.boolean('hasFamily').defaultTo(false);
        record.boolean('alive').defaultTo(true);
        record.boolean('atLarge').defaultTo(true);
        record.boolean('chargesFiled').defaultTo(false);
        record.boolean('onBail').defaultTo(false);
        record.boolean('acquitted').defaultTo(false);
        record.boolean('convicted').defaultTo(false);
        record.boolean('sentenced').defaultTo(false);
        record.boolean('appeal').defaultTo(false);
        record.boolean('incarcerated').defaultTo(false);
        record.boolean('reformed').defaultTo(false);
        record.string('highestLevelOfEdu',400).defaultTo(null);
        record.string('primaryEdu',400).defaultTo(null);
        record.string('secondaryEdu',400).defaultTo(null);
        record.string('primaryEmployment',800).defaultTo(null);
        record.string('secondaryEmployment',800).defaultTo(null);
        record.string('historicEmployment', 1200).defaultTo(null);
        record.string('trade',800).defaultTo(null);
        record.string('awardsAccolades',8000).defaultTo(null);
        record.string('languagesSpoken', 255).defaultTo(null);
        record.string('nationality',128).defaultTo(null);
        record.string('socioeconomicBG',8000).defaultTo(null);
        record.string('demographicBG',8000).defaultTo(null);
        record.string('biography',8000).defaultTo(null);
        record.bigInteger('profileViews').defaultTo(0);
        record.bigInteger('depravityScore').defaultTo(0);
        record.string('offenderComment', 8000).defaultTo(null);
    })
    .createTable('события', record => {
        record.increments('событиеИД');
        record.timestamp('создано_на', { useTz: true }).defaultTo(knex.fn.now());
        record.integer('преступникИД')
            .unsigned()
            .notNullable()
            .references('преступникИД')
            .inTable('преступники')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.boolean('isolatedEvent').defaultTo(true);
        record.boolean('reportedToLocalPolice').defaultTo(false);
        record.boolean('beingInvestigated').defaultTo(false);
        record.boolean('caseClosed').defaultTo(false);
        record.boolean('chargesBrought').defaultTo(false);
        record.boolean('chargesDropped').defaultTo(false);
        record.boolean('convictionLevied').defaultTo(false);
        record.boolean('convicted').defaultTo(false);
        record.boolean('appealedConviction').defaultTo(false);
        record.boolean('inBlockchain').defaultTo(false);
        record.string('complaintCategory').defaultTo(null);
        record.string('statusCode', 255).defaultTo(null);
        record.bigInteger('eventViews').defaultTo(0);
        record.bigInteger('justiceScore').defaultTo(0);
        record.bigInteger('depravityScore').defaultTo(0);
        record.timestamp('firstOccurrenceDateTime', { useTz: true }).defaultTo(null);
        record.timestamp('secondOccurrenceDateTime', { useTz: true }).defaultTo(null);
        record.timestamp('thirdOccurrenceDateTime', { useTz: true }).defaultTo(null);
        record.timestamp('lastOccurrenceDateTime', { useTz: true }).defaultTo(null);
        record.string('venueOfIncident',255).defaultTo(null);
        record.string('occurredAtLocation',255).defaultTo(null);
        record.string('occuredInCity',128).defaultTo(null);
        record.string('occuredInRegion', 128).defaultTo(null);
        record.string('occurredInCountry',128).defaultTo(null);
        record.string('offenderComment', 8000).defaultTo(null);
        record.string('offenderTestimony', 8000).defaultTo(null);
        record.string('victimSocioeconomicBG', 8000).defaultTo(null);
        record.string('victimDemographicBG', 8000).defaultTo(null);
        record.string('victimBiography', 8000).defaultTo(null);
        record.string('descriptionOfInjury',10000).defaultTo(null);
        record.string('perpetratorBiography', 8000).defaultTo(null);
        record.string('eventDescriptionNarrative',10000).defaultTo(null);
        record.string('victimCapacityAtTime', 8000).defaultTo(null);
        record.string('perpetratorCapacityAtTime', 8000).defaultTo(null);
        record.string('legalResolutionCriminal',10000).defaultTo(null);
        record.string('legalResolutionCivil', 10000).defaultTo(null);
    })
    .createTable('данные', record => {
        record.increments('данныеИД');
        record.integer('событиеИД')
            .unsigned()
            .notNullable()
            .references('событиеИД')
            .inTable('события')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.timestamp('создано_на', { useTz: true }).defaultTo(knex.fn.now());
        record.bigInteger('itemViews').defaultTo(0);
        record.bigInteger('relevancyScore').defaultTo(0);
        record.string('title', 255).defaultTo(null);
        record.string('description', 10000).defaultTo(null);
        record.string('link', 400).defaultTo(null);
        record.string('shortDescription',400).defaultTo(null);
        record.string('category', 128).defaultTo(null);
    })
    .createTable('суждения1', record => {
        record.increments('суждения1ИД');
        record.integer('потребительИД')
            .unsigned()
            .notNullable()
            .references('потребительИД')
            .inTable('потребитель')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.integer('преступникИД')
            .unsigned()
            .notNullable()
            .references('преступникИД')
            .inTable('преступники')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.timestamp('создано_на', { useTz: true }).defaultTo(knex.fn.now());
        record.bigInteger('relevancyScore').defaultTo(0);
        record.bigInteger('depravityScore').defaultTo(0);
        record.string('contentText', 10000).defaultTo(null);
    })
    .createTable('суждения2', record => {
        record.increments('суждения2ИД');
        record.integer('потребительИД')
            .unsigned()
            .notNullable()
            .references('потребительИД')
            .inTable('потребитель')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.integer('событиеИД')
            .unsigned()
            .notNullable()
            .references('событиеИД')
            .inTable('события')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.timestamp('создано_на', { useTz: true }).defaultTo(knex.fn.now());
        record.bigInteger('relevancyScore').defaultTo(0);
        record.bigInteger('depravityScore').defaultTo(0);
        record.string('contentText', 10000).defaultTo(null);
    })
    .createTable('суждения3', record => {
        record.increments('суждения3ИД');
        record.integer('потребительИД')
            .unsigned()
            .notNullable()
            .references('потребительИД')
            .inTable('потребитель')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.integer('данныеИД')
            .unsigned()
            .notNullable()
            .references('данныеИД')
            .inTable('данные')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.timestamp('создано_на', { useTz: true }).defaultTo(knex.fn.now());
        record.bigInteger('relevancyScore').defaultTo(0);
        record.bigInteger('depravityScore').defaultTo(0);
        record.string('contentText', 10000).defaultTo(null);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('суждения3')
        .dropTableIfExists('суждения2')
        .dropTableIfExists('суждения1')
        .dropTableIfExists('данные')
        .dropTableIfExists('события')
        .dropTableIfExists('преступники')
        .dropTableIfExists('потребитель')
        .dropTableIfExists('пользователь');
};
