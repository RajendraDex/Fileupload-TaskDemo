// import { HttpErrors } from '@loopback/rest';
// import { CountSchema } from '@loopback/repository';
// import Config from './Config';
//import * as firebase from 'firebase';
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
//require('firebase/auth');
const firebase = require('firebase');
const Config = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const admin = require("firebase-admin");
const serviceAccount = require(`../../fcmServiceAccountKey.json`);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: Config.FIREBASE_CONFIG.databaseURL
});

firebase.initializeApp(Config.FIREBASE_CONFIG);

//export async function createFirebase(email, password) {
const createFirebase = (email, password) => {
    const uid = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userRecord) => {
            return userRecord.user.uid;
        }).catch((error) => {
            throw new ApiError(httpStatus.BadRequest, error.message);
        });
    return uid;
}

//export async function updateFirebase(email, password, newPassword) {
const updateFirebase = (email, password, newPassword) => {
    const responseData = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            userCredential.user.updatePassword(newPassword)
            return true;
        }).catch((error) => {
            throw new ApiError(httpStatus.BadRequest, error.message);
        });
    return responseData;
}

// export async function writeUserData(uid, full_name) {
//   const db = admin.firestore();
//   await db.collection('users').doc(uid).update({
//     nickName: full_name,
//   }).catch((error) => {
//     console.log("**********", error);
//     throw new ApiError(httpStatus.BadRequest, error.message);
//   });
//   return true;
//}

// export async function readUserData(uid: any) {
//   const db = admin.firestore();
//   await db.collection("users_inbox").doc("VXBPzqfJ2NMnIoJhoc7yXpqy7iA3").collection("inbox_user").get()
//     .then((querySnapshot: any) => {
//       console.log("_______", querySnapshot);
//       querySnapshot.forEach((doc: any) => {
//         console.log(doc.id, " => ", doc.data());
//       });
//     });
//   return true;
// }

// export async function updateData(uids, status) {
//   const db = admin.firestore();
//   for (let i = 0; i < uids.length; i++) {
//     await db.collection('users').doc(uids[i]).update({
//       is_deleted: status,
//     }).then((response) => {
//       console.log("**********", response);
//     }).catch((error) => {
//       console.log("**********", error);
//       throw new ApiError(httpStatus.BadRequest, error.message);
//     });
//   }
//   return true;
//}

module.exports = {
    createFirebase,
    updateFirebase
}