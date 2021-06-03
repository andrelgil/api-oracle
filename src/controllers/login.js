const { getConnection } = require('../config/database')

// Utilizado para exportar metodos e objetos JavaScript
module.exports = {
    async consulta (req, res) {
        const data = req.body;
        let conn;

        try {

            const conn = await getConnection();
            //const query = `SELECT PCK_INTEGRACAO_RPA.FUN_AUTENTICA_USUARIO(${data.usuario}, ${data.senha})`
            const query = `SELECT * 
                             FROM users
                            WHERE UPPER(username) = '${String(data.usuario).toUpperCase()}'
                              AND password = '${data.senha}'`;
            
            const resposta = await conn.execute(query);

            if (resposta.rows.length > 0) {

                const usuario = resposta.rows[0];                
                
                const query2 = `
                        SELECT id codigo, 
                               name descricao, 
                               username token 
                          FROM users 
                         WHERE id = :id`
                const resposta2 = await conn.execute(query2, { id: usuario.ID });

                const resultado = [
                    {
                        servidor: "192.168.0.25",
                        bases: {
                            Database: resposta2.rows
                            /*
                            {
                                codigo: 12,
                                descricao: 'NOME DA EMPRESA',
                                token: '14as-ads32-dfasd-3234'                                
                            }*/
                        }
                    } 
                ]

                return res.send(resultado); 
            } 
            return res.status(400).send({
                StatusCode: '-1',
                Message: 'Favor informar um usuário e senha válido!',
                JsonField: "usuario"
            });            

        } catch (err) {

            console.log(err)
            return res.status(500).send('Não conectado no banco!');
        
        } finally {
            if (conn) {
                conn.close();
            }
        } 

    },


}