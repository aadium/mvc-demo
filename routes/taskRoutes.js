module.exports = function(db) {
    const express = require('express');
    const router = express.Router();
    const taskController = require('../controllers/taskController')(db);

    router.post('/', (req, res) => {
        taskController.addTask(req.body)
            .then((docRef) => res.status(201).send({ id: docRef.id }))
            .catch((error) => res.status(500).send(error));
    });

    router.delete('/:id', (req, res) => {
        taskController.deleteTask(req.params.id)
            .then(() => res.status(204).send())
            .catch((error) => res.status(500).send(error));
    });

    router.put('/:id', (req, res) => {
        taskController.updateTask(req.params.id, req.body)
            .then(() => res.status(200).send())
            .catch((error) => res.status(500).send(error));
    });

    router.get('/:id', (req, res) => {
        taskController.getTask(req.params.id)
            .then((doc) => {
                if (!doc.exists) {
                    res.status(404).send();
                } else {
                    res.status(200).send(doc.data());
                }
            })
            .catch((error) => res.status(500).send(error));
    });

    return router;
};