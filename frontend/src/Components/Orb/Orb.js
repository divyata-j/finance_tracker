import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {

    const {width, height} = useWindowSize()

    console.log(width, height)

    // const moveOrb = keyframes`
    //     0%{
    //         transform: translate(0, 0);
    //     }
    //     50%{
    //         transform: translate(${width}px, ${height/2}px);
    //     }
    //     100%{
    //         transform: translate(0, 0);
    //     }
    // `

    const OrbStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        filter: blur(0px);
        
    `;
    const SecondOrbStyled = styled.div`
    width: 70vh; /* Adjust size as needed */
    height: 78vh; /* Adjust size as needed */
    // margin-right: -30vh;
    // margin-bottom:-30vh;
    margin-right: -37vh;
    margin-bottom: -37vh;
    position: fixed;
    background: linear-gradient(210deg,  #F2994A  0%, #F56692 100%); /* Change the color as needed */
    border-radius: 50%;
    top: 73%; /* Adjust the vertical position as needed */
    right: 0; /* Adjust the horizontal position as needed */


    // width: 35vh;
    // height: 35vh;
    // // position: sta\\;
    // background: linear-gradient(210deg, #F2994A 0%, #F56692 100%);
    //  /* Adjust the border-radius for a quarter circle */
    //  border-radius:  100% 0 0 0;
    //  margin-right: -37vh;
    //  margin-bottom: -37vh;
    //  position: fixed;
  
    @media screen and (max-width: 750px) {
      width: 35vh;
      height: 35vh;
      border-radius: 0 0 100% 0;
      position: absolute;
      margin-right:-78vh;
      margin-top:-935vh;
      background: linear-gradient(210deg, #F2994A 0%, #F56692 100%);
      filter: blur(3px);
      border-radius: 100% 0 0 0; /* Adjust the border-radius for a quarter circle */
    }
    
  `;

    return (
        <>
        <OrbStyled/>
        <SecondOrbStyled/>
        </>
    )
}

export default Orb