import React, { useState } from 'react'
import styles from "./Home.module.css"

export default function Home() {
    const [data,setData]=useState({
        left:-200,
        top:-200
    })

    function Drag(e){
        e.preventDefault();
        let x=document.getElementById("box").clientWidth
        let y=document.getElementById("box").clientHeight
        setData({
            left:window.event.clientX-(x/2),
            top:window.event.clientY-(y/2)
        })
        // console.log(JSON.stringify(data))
    }
    return (
        <div className={styles.BigBox} onMouseMove={Drag}>
            <div className={styles.box} id='box' style={data}/>
        </div>
    )
}
