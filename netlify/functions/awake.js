import React from "react";

const url = process.env.REACT_APP_AK_LINK;
awake();

async function awake() {
  setInterval(() => {
    try {
      const res=await fetch(url);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }, 1000 * 60 * 30);
}
