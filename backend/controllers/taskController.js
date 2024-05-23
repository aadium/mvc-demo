const { get } = require("http");

module.exports = function (db) {
    return {
        addTask: function (task) {
            if (typeof task === 'object' && task !== null && !Array.isArray(task)) {
                return db.collection('tasks').add(task);
            } else {
                console.log(task)
                throw new Error('Task is not a valid object');
            }
        },

        deleteTask: function (taskId) {
            return db.collection('tasks').doc(taskId).delete();
        },

        updateTask: function (taskId, updatedTask) {
            return db.collection('tasks').doc(taskId).update(updatedTask);
        },

        getTask: function (taskId) {
            return db.collection('tasks').doc(taskId).get();
        },

        getAllTasks: function (userId) {
            return db.collection('tasks').where('user', '==', userId).get();
        }
    };
};