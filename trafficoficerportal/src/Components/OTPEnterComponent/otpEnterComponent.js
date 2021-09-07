// import axios from "axios";
// import React, { useState, useEffect, useContext } from "react";
// import firebase from "../../firebase/firebase";
// import { UserContext } from "../../App";
// import { useParams } from "react-router";

// export default function OtpEnterComponent() {
//   const { state, dispatch } = useContext(UserContext);
//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:9000/trafficOfficer/officerreg/${id}`)
//       .then(async (result) => {
//         alert("awa", id);
//         console.log("officer two details : ", result.data);
//         localStorage.setItem("officerTwo", result.data._id);
//         await onSignInSubmit(result.data.mobile).then(() => {
//           //   toast.success("Login Success", {
//           //     position: toast.POSITION.TOP_RIGHT,
//           //   });
//           //   setTimeout(() => {
//           //     // history.push("/createFine");
//           //     // dispatch({ type: "USER", payload: true });
//           //   }, 5000);
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   function configureCaptcha() {
//     alert("ss");
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//       "sign-in-button",
//       {
//         size: "invisible",
//         callback: (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//           onSignInSubmit();
//         },
//       }
//     );
//   }

//   async function onSignInSubmit(mobile) {
//     alert(mobile);
//     configureCaptcha();
//     const phoneNumber = `+94${mobile}`;
//     console.log(phoneNumber);
//     const appVerifier = window.recaptchaVerifier;

//     firebase
//       .auth()
//       .signInWithPhoneNumber(phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         window.confirmationResult = confirmationResult;

//         alert("OTP has been sent");
//       })
//       .catch((error) => {
//         // Error; SMS not sent
//         // ...
//       });
//   }
//   return <div className="container">hi</div>;
// }
