import express from 'express';
import routes from './routes/router.js';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();
const pathFiles = path.join(__dirname, './public/imgs');

const fileUploadConfig = fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
    abortOnLimit: true,
    responseOnLimit: "El tamaño del archivo ha sobrepasado el límite especificado.",
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploadConfig); // Integración de express-fileupload

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
