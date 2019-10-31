const path = require('path');
const fs = require('fs');
const rmdir = require('rimraf');
const con = require('../db_connection');

module.exports = {
    allPosts(req, res) {
        con.query("SELECT * FROM tbl_posts", function(err, result, fields) {
            if(err) throw err;
            res.send(result);
        });
    },
    getImage(req, res) {
        const file_name = req.params.name;
        const file_path = path.resolve(`${__dirname}\\..\\uploads\\imagens\\${file_name}`);
        res.sendFile(file_path);
    },
    newImage(req, res) {
        const io = req.app.get("socketio");

        const body = req.body;
        const nome = body.nome;

        const file_path = req.file.path;
        const file_name = file_path.split("\\").pop();

        // Salvando no banco o nome do usuário e somente o nome da imagem
        const sql = "INSERT INTO tbl_posts(nome, foto) VALUES('"+nome+"', '"+file_name+"')";
        
        con.query(sql, function(err, result){
            // Mandando os dados para todos os dispositivos conectados ao site via WebSocket
            io.sockets.emit('newPost', {nome: nome, foto: file_name});
            res.sendStatus(201); // Created
        });
    },
    delete(req, res){
        const sql = "DELETE FROM tbl_posts WHERE id_posts > 0";

        // Excluindo todos os registros do banco
        con.query(sql, function() {
            const pass = req.body.pass;

            if(pass === "instanaietop"){
                const file_path = path.resolve(`${__dirname}\\..\\uploads\\imagens`);
                
                rmdir(file_path, function(error) { // Excluindo diretório do servidor
                    if(error) throw error;

                    if(!fs.existsSync(file_path)) {
                        fs.mkdirSync(file_path); // Recriando diretor

                        

                        res.sendStatus(200);
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    }
}