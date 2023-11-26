import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import GoogleLogIn from "./GoogleLogIn";
import loginBg from "../images/backgrounds/bg.jpg";
import { useParams } from "react-router-dom";

const PhoneLogIn = () => {
  const [phone, setPhone] = useState("");
  const [hasFilled, setHasFilled] = useState(false);
  // const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { refralCode } = useParams();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {});
  };

  const sendOtp = (event) => {
    event.preventDefault();
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        alert("SMS Sent!");
        setHasFilled(true);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  // const sendOtp = async () => {
  //   const recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
  //   await firebase.auth().signInWithPhoneNumber(phone, recaptcha);
  //   // try {
  //   //   const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
  //   //   const userCredential = await signInWithPhoneNumber(auth, phone, recaptcha);
  //   //   setUser(userCredential.user);
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }
  // };

  const verifyOtp = (event) => {
    // event.preventDefault();

    if (otp.length === 6) {
      // verify otp
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          let user = result.user;
          console.log(user);
          alert("User signed in successfully");
          navigate("/");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("User couldn't sign in (bad verification code?)");
        });
    }
  };

  // const verifyOtp = async () => {
  //   await firebase.auth().verifyPhoneNumberConfirmationCode();
  //   // try {
  //   //   const credential = auth.PhoneAuthProvider.credential(user.phoneNumber, otp);
  //   //   const data = await user.reauthenticateWithCredential(credential);
  //   //   console.log(data);
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }
  // };
  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center bg-white"
      style={{
        background: `url(${loginBg}) no-repeat right`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-black w-screen h-screen absolute opacity-80"></div>
      <div className="py-12 px-12 flex flex-col gap-12 rounded-lg backdrop-blur bg-white/30 z-10">
        <div className="text-4xl font-black text-center">Register</div>
        {/* <div className="divide-y-2 divide-gray-300"> */}
        <div className="py-4">
          {!hasFilled ? (
            <div className="">
              {/* <div className="relative group mb-8 w-full">
              <input
                required
                maxLength={10}
                minLength={10}
                type="tel"
                className="peer border-b-2 border-black outline-none w-full bg-transparent"
                value={phone}
                onChange={(phone) => setPhone("+" + phone)}
              />
              <label
                className="absolute left-0 group-focus-within:-translate-y-6 peer-valid:-translate-y-6 duration-300 ease-in-out"
              >
                <span className="">Phone Number</span>
              </label>
            </div> */}
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(phone) => setPhone("+" + phone)}
              />
              <div className="m-12">
                <button
                  onClick={sendOtp}
                  type="button"
                  className="bg-blue-700 p-2 rounded-xl text-white flex justify-center w-full font-bold text-xl"
                >
                  Send OTP
                </button>
              </div>
              <div id="recaptcha"></div>
            </div>
          ) : (
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border-2 border-gray-00 p-2 rounded-lg outline-none"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="m-4">
                <button
                  onClick={verifyOtp}
                  type="button"
                  className="bg-green-700 p-2 rounded-xl text-white flex justify-center w-full text-xl font-bold"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="">
          <GoogleLogIn refralCode={refralCode}/>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default PhoneLogIn;
