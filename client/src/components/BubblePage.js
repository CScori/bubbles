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