require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false,
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos PostgreSQL');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

testConnection();

module.exports = sequelize;
