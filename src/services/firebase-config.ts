import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgmM7mkaUOLz_gcCA9XO5eoaUoek9gOxU",
    authDomain: "newbie-firebase.firebaseapp.com",
    projectId: "newbie-firebase",
    storageBucket: "newbie-firebase.appspot.com",
    messagingSenderId: "418217826286",
    appId: "1:418217826286:web:01f9a3f230deb1af5aa0ff",
    measurementId: "G-PKTDMJXJNR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const NEWSPAPERS_COLLECTION = 'newspapers';