'use strict';

/**
 * flavor service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flavor.flavor');
