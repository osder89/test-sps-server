const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Importamos CORS
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const User = require('./model/user');
const app = express();

dotenv.config();

app.use(cors()); 
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the SPS Server API');
});

sequelize.sync({ force: false })
    .then(async () => {
        console.log('Base de datos sincronizada');

        const adminUser = await User.findOne({ where: { email: 'admin@spsgroup.com.br' } });

        if (!adminUser) {
            await User.create({
                email: 'admin@spsgroup.com.br',
                name: 'admin',
                type: 'admin',
                password: '1234'
            });
            console.log('Usuario administrador creado');
        }

        app.listen(7000, () => {
            console.log('Servidor corriendo en el puerto 7000');
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });
