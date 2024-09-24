    // server/server.js
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const sequelize = require('./config/db');
    const userRoutes = require('./routes/userRoutes');
    const uploadRoutes = require('./routes/uploadRoutes');

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use('/uploads', express.static('uploads'));

    app.use('/api/users', userRoutes);
    app.use('/api/upload', uploadRoutes);

    sequelize.sync().then(() => {
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });