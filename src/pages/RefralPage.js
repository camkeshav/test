import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
} from "react-share";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function RefralPage() {
  const nav = useNavigate();
  const { changeUser } = useContext(UserContext);
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    setCurrUser(JSON.parse(localStorage.getItem("currUser")));
  }, [changeUser]);

  return (
    <div>
      {currUser.refralCount >= 10 ? (
        <>
          <div>Your have completed your Refrals</div>
          <button
            onClick={() => {
              nav("/");
            }}
          >
            Spin the wheel again
          </button>
        </>
      ) : (
        <>
          You have currently {currUser.refralCount} refral, share
          <WhatsappShareButton
            url={`${process.env.REACT_APP_CLIENT_URL}/login/${currUser.uid}`}
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TwitterShareButton
            url={`${process.env.REACT_APP_CLIENT_URL}/login/${currUser.uid}`}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton
            url={`${process.env.REACT_APP_CLIENT_URL}/login/${currUser.uid}`}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </>
      )}
    </div>
  );
}

export default RefralPage;
