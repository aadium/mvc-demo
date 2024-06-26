const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
const taskRoutes = require('./routes/taskRoutes')(db);

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));