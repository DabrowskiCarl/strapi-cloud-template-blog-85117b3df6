'use strict';
/**
 *  article controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) =>  ({
  async find(ctx) {
    // Poprawiona, bardziej precyzyjna logika populacji
    ctx.query.populate = {
      cover: true, // Dołączamy obraz okładki
      blocks: {
        // Używamy 'on', aby sprecyzować populację dla konkretnych komponentów
        on: {
          'shared.slider': { populate: 'files' },
          'shared.media': { populate: 'media' },
          'shared.quote': true,
          'shared.rich-text': true
          // Upewnij się, że nazwy komponentów (np. 'shared.slider') są poprawne
        }
      }
    };
    
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    // Ta sama precyzyjna logika dla pojedynczego artykułu
    ctx.query.populate = {
      cover: true,
      blocks: {
        on: {
          'shared.slider': { populate: 'files' },
          'shared.media': { populate: 'media' },
          'shared.quote': true,
          'shared.rich-text': true
        }
      }
    };
    
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  }
}));
