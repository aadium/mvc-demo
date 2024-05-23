firebase.initializeApp(firebaseConfig);

function signUp(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User signed up:', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Error signing up:', errorCode, errorMessage);
        });
}

function signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            window.location.href = '../index.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
            alert(errorMessage);
        });
}

function signOut() {
    firebase.auth().signOut()
        .then(() => {
            console.log('User signed out');
            alert('You have been signed out');
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
}

function checkLogin() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'html/signin.html';
        }
    });
}

function getUser() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user.uid);
            } else {
                console.log('User is signed out');
                reject('No user signed in');
            }
        });
    });
}

async function fetchUID() {
    try {
        const uid = await getUser();
        return uid;
    } catch (error) {
        console.error('Error getting user:', error);
    }
}