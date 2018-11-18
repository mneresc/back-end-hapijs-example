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
        return queryInterface.bulkInsert('tb_tipo_contato', [
            {
                id_tipo_contato: 1,
                no_tipo_contato: 'Email',
                st_tipo_contato: true
            },
            {
                id_tipo_contato: 2,
                no_tipo_contato: 'Telefone',
                st_tipo_contato: true
            }
        ], {
            schema:'comum'
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('tb_tipo_contato', [1,2], { schema:'comum'});
    }
};
