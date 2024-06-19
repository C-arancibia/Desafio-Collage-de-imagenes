import path from 'path';
import { unlink } from 'fs/promises';

const __dirname = path.resolve();
const pathFiles = path.join(__dirname, './public/imgs');

const home = (req, res) => {
    res.sendFile(path.join(__dirname, './views/formulario.html'));
}

const addImg = async (req, res) => {
    const file = req.files.target_file;
    const numero = req.body.posicion;

    if (!req.files || !req.files.target_file) {
        res.sendFile(path.join(__dirname, './views/formulario.html'));
        res.status(400);
        return;
    }

    try {
        await file.mv(path.join(pathFiles, `imagen-${numero}.jpg`));
        res.sendFile(path.join(__dirname, './views/collage.html'));
        res.status(200);
    } catch (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(400).send("El tamaño del archivo ha sobrepasado el límite especificado.");
        } else {
            res.status(500).send("Error al subir la imagen");
        }
    }
}

const deleteImg = async (req, res) => {
    const nameFile = req.params.nombre;

    try {
        await unlink(path.join(pathFiles, nameFile));
        res.sendFile(path.join(__dirname, './views/collage.html'));
    } catch (error) {
        res.status(500).send("Error al eliminar la imagen");
    }
}

export {
    home,
    addImg,
    deleteImg,
};
