import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { Authios } from "../utils/Authios";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);


  useEffect(() => {
    Authios()
      .get('/api/colors')
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => console.log('Failed to get colors data', err))
      gsap.to(".gsap-circle", {duration: 2, rotation: 30, ease: "funWiggle"});

    return () => {
      
    }
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage