'use strict';
/**
 *  article controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) =>  ({
  async find(ctx) {
    // Bezpieczna, uproszczona logika do testowania
    ctx.query.populate = {
      cover: true, // Dołączamy obraz okładki
      blocks: {
        // Na razie próbujemy populować tylko komponent slidera
        on: {
          'shared.slider': {
            populate: 'files'
          }
        }
      }
    };
    
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    // Ta sama bezpieczna logika dla pojedynczego artykułu
    ctx.query.populate = {
      cover: true,
      blocks: {
        on: {
          'shared.slider': {
            populate: 'files'
          }
        }
      }
    };
    
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  }
}));
