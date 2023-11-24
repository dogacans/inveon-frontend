import React from 'react'
import AboutTop from './AboutTop'
import Functionality from './Functionality'
import {useSelector, useDispatch}  from "react-redux";

const AboutComponent = () => {
    
    const userInfo = useSelector((state) => state.user)
    console.log('userInfo: ', userInfo);
    

    return (
        <>
           <AboutTop/> 
           <Functionality/>
           
          
        </>
    )
}

export default AboutComponent
