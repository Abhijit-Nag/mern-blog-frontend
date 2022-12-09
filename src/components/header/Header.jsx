import React from 'react'
import Slider from '../slider/Slider'
import "./header.css"

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className='headerTitleSm'>React & Node</span>
            <span className='headerTitleLg'>Blog</span>
        </div>
        {/* <img src="https://www.wallpapertip.com/wmimgs/2-21891_hd-large-nature-wallpapers-natural-full-hd-large.jpg" alt="" className='headerImg' /> */}
        <Slider/>
    </div>
  )
}
