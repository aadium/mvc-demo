module.exports = function (db) {
    return {
        addTask: function (task) {
            return db.collection('tasks').add(task);
        },

        deleteTask: function (taskId) {
            return db.collection('tasks').doc(taskId).delete();
        },

        updateTask: function (taskId, updatedTask) {
            return db.collection('tasks').doc(taskId).update(updatedTask);
        },

        getTask: function (taskId) {
            return db.collection('tasks').doc(taskId).get();
        }
    };
};