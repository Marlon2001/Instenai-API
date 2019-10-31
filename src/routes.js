const express = require('express');
const PostController = require('./controllers/PostController');
const multer = require('./middleware/multer');
const routes = express.Router();

//Buscar todos os "posts" do servidor
routes.get('/all-posts', PostController.allPosts);
//Rota para mostrar uma imagem da api
routes.get('/image/:name', PostController.getImage);
//Rota para excluir todos os registros e imagens do servidor
routes.delete('/floresdocampo', PostController.delete);
//Se houver sucesso ao mover a imagem, chama o metodo 'newImage'
routes.post('/new-image', multer.single('image'), PostController.newImage);

module.exports = routes;