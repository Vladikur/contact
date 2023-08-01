import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
require('./server/index');
// import firebase from "firebase/compat"
// import "firebase/firestore"
// import "firebase/auth"
//
// firebase.initializeApp({
//     apiKey: "AIzaSyDzxV1BL21fcimWZGnTcrBuYSCd2cyDmZU",
//     authDomain: "contact-9ceb6.firebaseapp.com",
//     projectId: "contact-9ceb6",
//     storageBucket: "contact-9ceb6.appspot.com",
//     messagingSenderId: "862382104607",
//     appId: "1:862382104607:web:9e7210f69fc2ff422a752a"
// });
//
// const auth = firebase.auth()
// const firestore = firebase.firestore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
