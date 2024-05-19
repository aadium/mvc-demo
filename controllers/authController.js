module.exports = function(admin) {
    return {
        signup: (req, res) => {
            admin.auth().createUser({
                email: req.body.email,
                password: req.body.password
            })
            .then((userRecord) => {
                console.log('Successfully created new user:', userRecord.uid);
                res.status(201).send({ uid: userRecord.uid });
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
                res.status(500).send(error);
            });
        },

        signin: (req, res) => {
            admin.auth().getUserByEmail(req.body.email)
            .then((userRecord) => {
                console.log('Successfully fetched user data:', userRecord.toJSON());
                res.status(200).send(userRecord.toJSON());
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
                res.status(500).send(error);
            });
        }
    };
};