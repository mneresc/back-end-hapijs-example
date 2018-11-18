/**
 * Created by marcelo.cabral on 19/06/2017.
 */
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const UsuarioServer = require('../src/v1/Usuario/UsuarioService');
const expect = Lab.assertions.expect;

// var Usuario;

lab.experiment('UsuarioService', () => {

    lab.test('Testa se a lista esta retornando corretamente',
        (done) => {

            new Promise(function (resolve, reject) {
                return resolve(mockCadastroUsuario());
            }).then(function (Usuario) {
                new Promise(function (resolve, reject) {
                    return resolve(UsuarioServer.getUsuario(Usuario.idUsuario));
                }).then(function (UsuarioFind) {
                    expect(UsuarioFind.idUsuario).to.equal(Usuario.idUsuario);
                    done();
                });
            })
                .catch(function (error) {
                    // this makes sure any assertion errors are handled and reported by lab
                    done(error);
                });
        });

    lab.test('Testa o Cadastro de Usuário',
        (done) => {
            new Promise(function (resolve, reject) {
                var usuario = {
                    noPessoa: "Marcelo Neres",
                    dsEmail: "mneresc@gmail.com",
                    dsSenha: "pistols04"
                };
                return resolve(UsuarioServer.cadastrarUsuarioPessoaFisica(usuario));
            }).then(function (UsuarioCadastrado) {
                expect(UsuarioCadastrado).to.be.an.object();
                expect(UsuarioCadastrado).to.part.include("dataValues");
                done();
            })
                .catch(function (error) {
                    // this makes sure any assertion errors are handled and reported by lab
                    done(error);
                });
        });

    lab.test('Testa o Cadastro de Usuário',
        (done) => {
            new Promise(function (resolve, reject) {
                //cadastra o usuario de mock
                var usuario = {
                    noPessoa: "Marcelo Neres",
                    dsEmail: "mneresc@gmail.com",
                    dsSenha: "pistols04"
                };
                return resolve(UsuarioServer.cadastrarUsuarioPessoaFisica(usuario));
            }).then(function (UsuarioCadastrado) {
                var usuarioAtualizado = {
                    dsEmail: "mneresc1@gmail.com",
                };
                //atualiza o usuario e testa
                new Promise(function (resolve, reject) {
                    return resolve(UsuarioServer.atulizarUsuario(usuarioAtualizado, UsuarioCadastrado));
                }).then(function (UsuarioAtualizado) {
                    expect(UsuarioCadastrado).to.be.an.object();
                    expect(UsuarioCadastrado).to.part.include("dataValues");
                    done();
                });
            })
                .catch(function (error) {
                    // this makes sure any assertion errors are handled and reported by lab
                    done(error);
                });
        });

    lab.test('Testa a Lista de Usuário com paginacao',
        (done) => {

            new Promise(function (resolve, reject) {
                var page = 1;
                var perPage = 1;
                return resolve(UsuarioServer.listarUsuarios(page, perPage));
            }).then(function (UsuariosListados) {
                //Lista os dados
                expect(UsuariosListados.rows[0]).to.be.an.object();
                expect(UsuariosListados.rows[0]).to.part.include("dataValues");
                done();
            })
                .catch(function (error) {
                    // this makes sure any assertion errors are handled and reported by lab
                    done(error);
                });
        });
});


function mockCadastroUsuario() {
    var usuario = {
        noPessoa: "Marcelo Neres",
        dsEmail: "mneresc@gmail.com",
        dsSenha: "pistols04"
    };
    return UsuarioServer.cadastrarUsuarioPessoaFisica(usuario);
}