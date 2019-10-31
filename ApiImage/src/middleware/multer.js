const multer = require('multer');
const path = require('path');

module.exports = (multer({
    //como deve ser o armazenamento dos aquivos ficará aqui
    storage: multer.diskStorage({
        //o qual deverá ser o destino deles
        destination:(req, file, cd)=>{
            //setando o destino do arquivo
            cd(null, path.join(__dirname,".",'../uploads/imagens'));
        },
        //qual deverá ser o nome do arquivo
        filename: (req, file, cd)=>{
            //setando o nome do aquivo no segundo parametro
            cd(null, Date.now().toString() + "_"+ file.originalname);
        }
    }),

    //como os arquivos serão filtrados, quais são aceitos/esperados
    fileFilter: (req, file, cd)=>{
        //essa função vai procurar a extenção e verificar se as imagens são do formato aceito
        const aceito = ['image/png', 'image/jpg','image/jpeg']
            .find(formatoAceito => formatoAceito == file.mimetype);

        // se o formato for aceito vai entrar aqui
        if(aceito){
            //execultando o callback com o segundo argumento true (o aquivo foi aceto)
            return cd(null, true);
        }

        //se o formato nao for aceito returna false (o arquivo não foi aceito)
        return cd(null, false);
    }
}));