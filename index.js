const express = require('express');
const admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

const app = express();
app.use(express.json());

const taskRoutes = require('./routes/taskRoutes')(db);
const authRoutes = require('./routes/authRoutes')(admin);

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));