import React from 'react'
import styles from "./Box.module.css"
import { useState } from 'react'

export default function Box() {
    let [box, setBox] = useState([true])
    
    function handleClick(ind) {
        if (box[ind] === true) {
            box.fill(true)
        }
        box[ind] = !box[ind]
        setBox([...box])
    }
    return (
        <div className={styles.bigBox}>
            
            <div className={styles.container}>
                {
                    box.map((ele, ind) =>
                        <div className={box[ind] ? styles.box1 : styles.box2} onClick={() => handleClick(ind)} key={ind*10000}>
                            {ind + 1}
                        </div>)
                }
            </div>
            <div>
                <button className={styles.remBtn} onClick={()=>{box.pop(); setBox([...box])}}>Remove</button>
                <button className={styles.addBtn} onClick={()=>{box.unshift(true);setBox([...box])}}>ADD</button>
            </div>
        </div>
    )
}