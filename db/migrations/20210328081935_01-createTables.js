
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('administrator', user => {
        user.increments('userId');
        user.string('email',255).defaultsTo(null);
        user.string('passwordHash');
        user.string('username', 255).notNullable().unique();
        user.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('consumer', user => {
        user.increments('consumerId');
        user.string('email',255).defaultsTo(null);
        user.string('passwordHash');
        user.string('username', 255).notNullable().unique();
        user.string('countryCode', 2).notNullable()
        user.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('criminals', record => {
        record.increments('criminalId');
        record.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
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
    .createTable('crimes', record => {
        record.increments('crimeId');
        record.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        record.integer('criminalId')
            .unsigned()
            .notNullable()
            .references('criminalId')
            .inTable('criminals')
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
    .createTable('data', record => {
        record.increments('dataId');
        record.integer('crimeId')
            .unsigned()
            .notNullable()
            .references('crimeId')
            .inTable('crimes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        record.bigInteger('itemViews').defaultTo(0);
        record.bigInteger('relevancyScore').defaultTo(0);
        record.string('title', 255).defaultTo(null);
        record.string('description', 10000).defaultTo(null);
        record.string('link', 400).defaultTo(null);
        record.string('shortDescription',400).defaultTo(null);
        record.string('category', 128).defaultTo(null);
    })
    .createTable('comments1', record => {
        record.increments('comments1Id');
        record.integer('consumerId')
            .unsigned()
            .notNullable()
            .references('consumerId')
            .inTable('consumer')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.integer('criminalId')
            .unsigned()
            .notNullable()
            .references('criminalId')
            .inTable('criminals')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        record.bigInteger('relevancyScore').defaultTo(0);
        record.bigInteger('depravityScore').defaultTo(0);
        record.string('contentText', 10000).defaultTo(null);
    })
    .createTable('comments2', record => {
        record.increments('comments2Id');
        record.integer('consumerId')
            .unsigned()
            .notNullable()
            .references('consumerId')
            .inTable('consumer')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.integer('crimeId')
            .unsigned()
            .notNullable()
            .references('crimeId')
            .inTable('crimes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        record.bigInteger('relevancyScore').defaultTo(0);
        record.bigInteger('depravityScore').defaultTo(0);
        record.string('contentText', 10000).defaultTo(null);
    })
    .createTable('comments3', record => {
        record.increments('comments3Id');
        record.integer('consumerId')
            .unsigned()
            .notNullable()
            .references('consumerId')
            .inTable('consumer')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.integer('dataId')
            .unsigned()
            .notNullable()
            .references('dataId')
            .inTable('data')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        record.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        record.bigInteger('relevancyScore').defaultTo(0);
        record.bigInteger('depravityScore').defaultTo(0);
        record.string('contentText', 10000).defaultTo(null);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('comments3')
        .dropTableIfExists('comments2')
        .dropTableIfExists('comments1')
        .dropTableIfExists('data')
        .dropTableIfExists('crimes')
        .dropTableIfExists('criminals')
        .dropTableIfExists('consumer')
        .dropTableIfExists('administrator');
};
