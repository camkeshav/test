import "./App.css";
import video from "./video/video.mp4";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase.config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import UserContext from "./context/UserContext";
import WheelComponent from "react-wheel-of-prizes";

function App() {
  const nav = useNavigate();
  const { changeUser, setChangeUser } = useContext(UserContext);
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    setCurrUser(JSON.parse(localStorage.getItem("currUser")));
  }, [changeUser]);

  const segments = [
    "Try Again",
    "Ipad",
    "Try Again",
    "Iphone",
    "Try Again",
    "Ipod",
    "Try Again",
    "macBook",
    "Try Again",
    "watch",
  ];
  const map = {
    0: "Try Again",
    1: "Ipad",
    2: "Try Again",
    3: "Iphone",
    4: "Try Again",
    5: "Ipod",
    6: "Try Again",
    7: "macBook",
    8: "Try Again",
    9: "watch",
  };
  const segColors = [
    "#909a8c",
    "#cd4548",
    "#909a8c",
    "#ffa20f",
    "#909a8c",
    "#7b6bb7",
    "#909a8c",
    "#7a1f1f",
    "#909a8c",
    "#114a96",
  ];

  const onFinished = async (winner) => {
    console.log(winner);
    const curr = JSON.parse(localStorage.getItem("currUser"));
    const currId = curr.uid;
    const userRef = doc(db, "user", currId);
    let userSnap = await getDoc(userRef);
    await updateDoc(userRef, {
      winning: winner,
    });
    localStorage.setItem("currUser", JSON.stringify(userSnap.data()));
    setChangeUser(!changeUser);
    setTimeout(() => {
      nav("/address");
    }, 1000);
  };

  return (
    <div>
      <div className="titleBar">
        <h1>GAME OF WHEEL</h1>
      </div>
      <div className="userName">
        {currUser ? <h1>Hello {currUser.name}</h1> : <h1>Hello</h1>}
      </div>
      <div className="body">
        <div>
          {currUser ? (
            <>
              <div className="wheelCont">
                <WheelComponent
                  segments={segments}
                  segColors={segColors}
                  winningSegment="Iphone"
                  onFinished={(winner) => onFinished(winner)}
                  primaryColor="red"
                  contrastColor="white"
                  buttonText="Spin"
                  isOnlyOnce={false}
                  size={190}
                  upDuration={500}
                  downDuration={600}
                  fontFamily="Helvetica"
                  height="500"
                />
              </div>
            </>
          ) : (
            <>
              <div className="videoCont">
                <video
                  src={video}
                  type="video/mp4"
                  autoplay="autoplay"
                  muted
                  loop
                  className="videoPlayer"
                ></video>
              </div>
              <div className="buttonDiv">
                <button className="loginButton" onClick={() => nav("/login")}>
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
