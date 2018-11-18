'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkInsert('Person', [{
         name: 'John Doe',
         isBetaMember: false
         }], {});
         */
        return queryInterface.bulkInsert('tb_recurso', [
            {
                id_recurso: '1',
                no_recurso: 'Acessar Rota de Teste',
                ds_url_recurso: '/teste',
                id_metodo: '1'
            }
        ], {});
    },

    down: function (queryInterface, Sequelize) {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkDelete('Person', null, {});
         */
         return queryInterface.bulkDelete('tb_recurso', null, {});
    }
};
