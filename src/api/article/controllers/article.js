'use strict';
/**
 *  article controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) =>  ({
  async find(ctx) {
    // Prosta i uniwersalna metoda populacji dla dynamicznej strefy
    ctx.query.populate = {
      cover: true,
      blocks: {
        populate: '*' // Kluczowa zmiana: populujemy wszystkie komponenty w 'blocks'
      }
    };
    
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    // Ta sama prosta logika dla pojedynczego artykułu
    ctx.query.populate = {
      cover: true,
      blocks: {
        populate: '*' // Kluczowa zmiana: populujemy wszystkie komponenty w 'blocks'
      }
    };
    
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  }
}));
