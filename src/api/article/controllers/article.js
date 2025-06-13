'use strict';
/**
 *  article controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) =>  ({
  async find(ctx) {
    // some custom logic here
    ctx.query = { 
      ...ctx.query, 
      populate: {
        blocks: {
          populate: {
            files: {
              populate: true
            }
          }
        }
      } 
    };
    
    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    return { data, meta };
  },

  async findOne(ctx) {
    ctx.query = { 
      ...ctx.query, 
      populate: {
        blocks: {
          populate: {
            files: {
              populate: true
            }
          }
        }
      } 
    };
    
    // Calling the default core action
    const { data, meta } = await super.findOne(ctx);

    // some more custom logic
    return { data, meta };
  }
}));
