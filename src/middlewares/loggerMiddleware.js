const fs = require('fs');
const path = require('path');

// Middleware para registrar actividad en las rutas
const loggerMiddleware = (req, res, next) => {
    // Extraer datos de la solicitud
    const queryStrings = JSON.stringify(req.query); // Parámetros de consulta
    const body = JSON.stringify(req.body); // Cuerpo de la solicitud
    const params = JSON.stringify(req.params); // Parámetros de ruta

    // Crear mensaje de log
    const logMessage = `
    ${new Date().toISOString()} - 
    Ruta: ${req.method} ${req.originalUrl} - 
    Consultas: ${queryStrings} - 
    Parámetros: ${params} - 
    Cuerpo: ${body} - 
    IP: ${req.ip}\n`;
    
    // Mostrar el registro en la consola
    console.log(logMessage);

    // Guardar el registro en un archivo
    const logFilePath = path.join(__dirname, 'logs.txt');
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de logs:', err);
        }
    });

    // Pasar al siguiente middleware o controlador
    next();
};

module.exports = {
    loggerMiddleware
};