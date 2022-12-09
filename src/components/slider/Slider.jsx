import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import styled from 'styled-components';
import { data } from "./sliderImages";
// import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons"

const Continer=styled.div`
    overflow: hidden;
    z-index: -1;
    width: 100vw;
    background-color: #d8a64a;
`

// const Arrow=styled.div`
//     left: ${props=>props.direction === "left" && "10px"};
//     right: ${props=>props.direction === "right" && "10px"};
// `

const Wrapper = styled.div`
    padding: 20px 0px;
    display: flex;
    width: 100vw;
    /* transform: translateX(-1000px); */
    /* transform: translateX(${(props) => props.sliderIndex * (-100)}vw); */
    transform: translateX(${props=> (props.sliderIndex)*(-100)}vw);
    transition: all 1s ease;

    `

const ImgContainer = styled.div`
    width: 100vw;
    height: 450px;
    margin: 0;
`

export default function Slider() {
    const [sliderIndex, setSliderIndex] = useState(0);
    // useEffect(()=>{
        
    //     console.log(sliderIndex);

    //     // run();
    //     return ()=>{
    //         clearInterval(run)
    //     }
    // },[sliderIndex]);

    useEffect(()=>{
        if(sliderIndex === 4) setSliderIndex(0);
        else{
            const res=setInterval(() => {
                setSliderIndex((prev)=>prev+1)
            }, 3000);
            return ()=>{
            clearInterval(res);
        }
        }
        console.log(sliderIndex);
        
        
    },[sliderIndex]);
    return (
        <Continer>
            {/* <Arrow direction="left"><KeyboardArrowLeft/> </Arrow> */}
            {/* <Arrow direction="right"><KeyboardArrowRight/> </Arrow> */}

        <Wrapper sliderIndex={sliderIndex} >
            {data.map((d) => (
                <ImgContainer>
                    <img style={{width:"100vw", height:"auto", objectFit:"cover", marginTop:"46px", borderRadius:"10px"}} src={d.img} alt="" />
                </ImgContainer>
            ))}
        </Wrapper>
            </Continer>
    )
}
