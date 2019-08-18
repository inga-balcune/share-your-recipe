import firebase from 'firebase'
import 'firebase/database'

let firebaseConfig = {
    apiKey: "AIzaSyAl5iJAnHm3G6HKxmkkJ-XHLrNF2KRPjKU",
    authDomain: "share-your-recipe.firebaseapp.com",
    databaseURL: "https://share-your-recipe.firebaseio.com",
    projectId: "share-your-recipe",
    storageBucket: "share-your-recipe.appspot.com",
    messagingSenderId: "1046625592077",
    appId: "1:1046625592077:web:5513861ae4dd8ce1"
  };

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export const database = firebase.database()