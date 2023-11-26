import React, { useState, useEffect, useContext } from "react";
import loginBg from "../images/backgrounds/bg.jpg";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import UserContext from "../context/UserContext";
import { db } from "../firebase.config";

const Address = () => {
  const nav = useNavigate();
  const { changeUser, setChangeUser } = useContext(UserContext);
  const [currUser, setCurrUser] = useState({});
  useEffect(() => {
    setCurrUser(JSON.parse(localStorage.getItem("currUser")));
  }, [changeUser]);
  const [msg, setMsg] = useState(false);

  const [userInfo, setUserInfo] = useState({
    Name: "",
    Mobile: "",
    Address: "",
    City: "",
    State: "",
    Pincode: "",
  });

  async function update(userInfo) {
    const userRef = doc(db, "user", currUser.uid);

    await updateDoc(userRef, {
      mobile: userInfo.Mobile,
      address: userInfo.Address,
      city: userInfo.City,
      state: userInfo.State,
      pincode: userInfo.Pincode,
    });
  }

  const submitData = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    if (
      userInfo.Name &&
      userInfo.Address &&
      userInfo.City &&
      userInfo.Mobile &&
      userInfo.Pincode &&
      userInfo.State
    ) {
      await update(userInfo);
      const userRef = doc(db, "user", currUser.uid);
      let userSnap = await getDoc(userRef);
      localStorage.setItem("currUser", JSON.stringify(userSnap.data()));
      setChangeUser(!changeUser);
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
        nav("/refralPage");
      }, 2000);
    }
  };
  return (
    <>
      <div
        className="w-screen h-screen flex justify-center items-center mx-auto"
        style={{
          background: `url(${loginBg}) no-repeat right`,
          backgroundSize: "cover",
        }}
      >
        {msg ? <b>Submitted Successfully</b> : <></>}
        <div className="bg-black w-screen h-screen absolute opacity-80"></div>
        <form
          className="w-3/4 md:w-2/4 py-12 px-12 flex flex-col gap-12 rounded-xl backdrop-blur bg-white/30 z-10"
          action="/"
          onSubmit={submitData}
        >
          <div className="text-4xl font-black text-center">
            Delivery Address
          </div>
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-x-8">
              <div className="relative group mb-8 w-full">
                <input
                  required
                  type="text"
                  id="name"
                  className="peer border-b-2 border-neutral-400 outline-none w-full bg-transparent"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, Name: e.target.value });
                  }}
                />
                <label
                  for="name"
                  className="absolute left-0 group-focus-within:-translate-y-6 peer-valid:-translate-y-6 duration-300 ease-in-out"
                >
                  <span className="">Name</span>
                </label>
              </div>
              <div className="relative group mb-8 w-full">
                <input
                  required
                  type="text"
                  id="mobile"
                  className="peer border-b-2 border-neutral-400 outline-none w-full bg-transparent"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, Mobile: e.target.value });
                  }}
                />
                <label
                  for="name"
                  className="absolute left-0 group-focus-within:-translate-y-6 peer-valid:-translate-y-6 duration-300 ease-in-out"
                >
                  <span className="">Mobile</span>
                </label>
              </div>
            </div>
            <div className="relative group mb-8 col-span-2 w-full">
              <input
                required
                type="text"
                id="address"
                className="peer border-b-2 border-neutral-400 outline-none w-full bg-transparent"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, Address: e.target.value });
                }}
              />
              <label
                for="name"
                className="absolute left-0 group-focus-within:-translate-y-6 peer-valid:-translate-y-6 duration-300 ease-in-out"
              >
                <span className="">Address</span>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-x-8">
              <div className="relative group mb-8 w-full">
                <input
                  required
                  type="text"
                  id="city"
                  className="peer border-b-2 border-neutral-400 outline-none w-full bg-transparent"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, City: e.target.value });
                  }}
                />
                <label
                  for="name"
                  className="absolute left-0 group-focus-within:-translate-y-6 peer-valid:-translate-y-6 duration-300 ease-in-out"
                >
                  <span className="">City</span>
                </label>
              </div>
              <div className="relative group mb-8 w-full">
                <input
                  required
                  type="text"
                  id="state"
                  className="peer border-b-2 border-neutral-400 outline-none w-full bg-transparent"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, State: e.target.value });
                  }}
                />
                <label
                  for="name"
                  className="absolute left-0 group-focus-within:-translate-y-6 peer-valid:-translate-y-6 duration-300 ease-in-out"
                >
                  <span className="">State</span>
                </label>
              </div>
            </div>
            <div flex gap-8>
              <div className="relative group mb-8 w-full">
                <input
                  required
                  type="text"
                  id="pincode"
                  className="peer border-b-2 border-neutral-400 outline-none w-full bg-transparent"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, Pincode: e.target.value });
                  }}
                />
                <label
                  for="name"
                  className="absolute left-0 group-focus-within:-translate-y-6 peer-valid:-translate-y-6 duration-300 ease-in-out"
                >
                  <span className="">Pincode</span>
                </label>
              </div>
              <div>
                <button
                  className="py-2 px-4 bg-green-700 rounded-xl text-xl text-white"
                  value="submit"
                  type="submit"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Address;
