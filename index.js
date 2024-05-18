const express = require('express');
const admin = require('firebase-admin');
var serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

const app = express();

const taskRoutes = require('./routes/taskRoutes')(db);

app.use('/tasks', taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));