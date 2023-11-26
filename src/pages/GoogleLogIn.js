import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase.config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import UserContext from "../context/UserContext";

const GoogleLogIn = (props) => {
  const { changeUser, setChangeUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function saveUser(userCredential) {
    const newUser = {
      uid: userCredential.user.uid,
      name: userCredential.user.displayName,
      email: userCredential.user.email,
      photo: userCredential.user.photoURL,
      refralCount: 0,
      mobile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      createdAt: new Date().getTime(),
    };
    const res = await setDoc(doc(db, "user", newUser.uid), newUser);
  }

  const googleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, "user", userCredential.user.uid);
      let userSnap = await getDoc(userRef);

      if (userSnap.data() == undefined) {
        await saveUser(userCredential);
      }

      userSnap = await getDoc(userRef);
      console.log(userSnap.data());

      localStorage.setItem("currUser", JSON.stringify(userSnap.data()));
      
      if (userCredential?.user?.uid !== props?.refralCode && props.refralCode) {
        console.log(props.refralCode);
        const docRef = doc(db, "user", props.refralCode);
        const docSnap = await getDoc(docRef);
        await updateDoc(docRef, {
          refralCount: docSnap.data().refralCount + 1,
        });
      }
      setChangeUser(!changeUser);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(`Failed to log in: ${error}`);
      setError(null);
    }
  }, [error]);

  return (
    <div className="flex justify-center">
      <button onClick={googleSignIn}>
        <span className="flex gap-2 items-center border-2 border-blue-600 rounded-lg bg-blue-600 text-blue-600 group">
          <span className="bg-white p-2 rounded-l-lg">
            <i className="fa-brands fa-google fa-lg p-2"></i>
          </span>
          <span className="text-white p-1 text-2xl font-bold">
            Sign In With Google
          </span>
        </span>
      </button>
    </div>
  );
};

export default GoogleLogIn;
