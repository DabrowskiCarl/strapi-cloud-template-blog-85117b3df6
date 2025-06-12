// ścieżka: src/api/szkolenie-lead/controllers/szkolenie-lead.js

'use strict';

/**
 * szkolenie-lead controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::szkolenie-lead.szkolenie-lead', ({ strapi }) => ({
  /**
   * Rozszerzamy domyślną metodę 'create'
   */
  async create(ctx) {
    // Pobieramy dane z ciała zapytania
    const { data } = ctx.request.body;

    // 1. Sprawdzamy, czy nasze pole-pułapka (honeypot) zostało wypełnione.
    // Używamy nazwy 'website', tak jak w formularzu na froncie.
    if (data && data.website) {
      // Jeśli pole 'website' ma jakąkolwiek wartość, to prawdopodobnie bot.
      // Logujemy informację po stronie serwera (dla Ciebie)
      strapi.log.warn(`Honeypot field 'website' was filled. Rejecting submission.`);

      // Zwracamy odpowiedź sukcesu (status 200), aby zmylić bota.
      // Dane NIE zostaną zapisane w bazie.
      return {
        data: { 
            id: Date.now(), // Zwracamy fałszywe ID
            attributes: { ...data, createdAt: new Date().toISOString() } // Zwracamy przesłane dane
        }, 
        meta: {} 
      };
    }

    // 2. Jeśli pole-pułapka jest puste (prawdziwy użytkownik), kontynuujemy.
    // Wywołujemy domyślną metodę `create` z oryginalnego kontrolera,
    // która zajmie się walidacją i zapisem danych do bazy.
    const response = await super.create(ctx);

    // Zwracamy prawdziwą odpowiedź z serwera
    return response;
  }
}));
