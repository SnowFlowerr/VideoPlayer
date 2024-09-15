import React, { useEffect, useRef, useState } from 'react'
import styles from './Player.module.css'

export default function Player() {
    const [range, setRange] = useState(0)
    const [volume, setVolume] = useState(100)
    const [duration, setDuration] = useState(0)
    const [isplaying, setisplaying] = useState(true)
    const [isfullScreen, setisfullScreen] = useState(false)
    const videoRef = useRef(null)
    const playerRef = useRef(null)
    function handleRange(e) {
        setRange(e.target.value)
        if (videoRef.current) {
            videoRef.current.currentTime = e.target.value
        }
    }
    useEffect(() => {
        window.addEventListener('popstate', () => {
            console.log("jvawdjh")
        })
    }, [])
    const setScreenOrientation = () => {
        if (window.matchMedia("(orientation: portrait)").matches) {
            console.log('orientation: portrait');
            this.setState({
                screenOrientation: 'portrait'
            });
        }

        if (window.matchMedia("(orientation: landscape)").matches) {
            console.log('orientation: landscape');
            this.setState({
                screenOrientation: 'landscape'
            });
        }
    }
    function getDuration(duration) {
        duration = Math.floor(duration - 0);
        let sec = Math.floor(duration % 60);
        let min = Math.floor((duration % 3600) / 60);
        let hr = Math.floor(duration / 3600);
        sec = sec <= 9 ? "0" + sec : sec;
        min = min <= 9 ? "0" + min : min;
        if (hr) {
            return hr + ":" + min + ":" + sec;
        } else if (min) {
            return min + ":" + sec;
        } else {
            return min + ":" + sec;
        }
    }
    function handleVolume(e) {
        setVolume(e.target.value)
        if (videoRef.current) {
            videoRef.current.volume = (e.target.value) / 100
        }
    }
    function handlePlay() {
        if (videoRef.current && isplaying) {
            videoRef.current.play()
        }
        else if (videoRef.current && !isplaying) {
            videoRef.current.pause()
        }
        setisplaying(!isplaying)
    }

    async function handleFullScreen() {
        try {
            setisfullScreen(!isfullScreen)
            if (!isfullScreen) {
                // playerRef.current.requestFullscreen()
                if (playerRef.current.requestFullscreen) {
                    playerRef.current.requestFullscreen();
                } else if (playerRef.current.webkitRequestFullscreen) { /* Safari */
                    playerRef.current.webkitRequestFullscreen();
                } else if (playerRef.current.msRequestFullscreen) { /* IE11 */
                    playerRef.current.msRequestFullscreen();
                }
                if (window.screen.orientation) {
                    window.screen.orientation.lock('landscape').then(()=>console.log("")).catch((err)=>console.log(err));
                }
            }
            else {
                // playerRef.current.exitFullscreen()
                document.exitFullscreen();
                // document.webkitExitFullscreen();
                // document.msExitFullscreen();
                // if (window.screen.orientation) {
                    // window.screen.orientation.unlock().then(()=>{}).catch((err)=>console.log(err));
                // }
            }
            setisfullScreen(!isfullScreen)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className={isfullScreen ? styles.mainBox2 : styles.mainBox} ref={playerRef}>
                <video src="https://res.cloudinary.com/dl5gqrtf0/video/upload/v1726324708/Videos/lrqcedcxkwqlnskuepax.mp4" height={"100%"} width={"100%"} ref={videoRef} onTimeUpdate={() => setRange(videoRef.current.currentTime)} onClick={handlePlay} onDurationChange={() => setDuration(videoRef.current?.duration)} onEnded={handlePlay} ></video>

                <div className={styles.controls}>
                    <div className={styles.range}>
                        <div className={styles.totalRange}></div>
                        <div className={styles.passedRange} style={{ width: `${(range * 100) / duration}%` }}></div>
                        <input type="range" name="" id="" min={0} max={duration} step={0.001} value={range} onChange={handleRange} className={styles.slider} />
                    </div>
                    <div className={styles.features}>
                        <div className={styles.first}>
                            <div onClick={handlePlay}>
                                {isplaying ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Z" /></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M556.67-200v-560h170v560h-170Zm-323.34 0v-560h170v560h-170Z" /></svg>
                                }
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M673.33-240v-480H740v480h-66.67ZM220-240v-480l350.67 240L220-240Z" /></svg>
                            </div>
                            <div className={styles.volume}>
                                {volume === "0" ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M806-56 677.67-184.33q-27 18.66-58 32.16-31 13.5-64.34 21.17v-68.67q20-6.33 38.84-13.66 18.83-7.34 35.5-19l-154.34-155V-160l-200-200h-160v-240H262L51.33-810.67 98.67-858l754.66 754L806-56Zm-26.67-232-48-48q19-33 28.17-69.67 9.17-36.66 9.17-75.33 0-100-58.34-179-58.33-79-155-102.33V-831q124 28 202 125.5t78 224.5q0 51.67-14.16 100.67-14.17 49-41.84 92.33Zm-134-134-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5t-7.5 28.5Zm-170-170-104-104 104-104v208Z" /></svg>
                                    :
                                    volume <= 50 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M200-360v-240h160l200-200v640L360-360H200Zm440 40v-322q45 21 72.5 65t27.5 97q0 53-27.5 96T640-320Z" /></svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z" /></svg>
                                }
                                <input type="range" name="" id="" min={0} max={100} value={volume} className={styles.volumeRange} onChange={handleVolume} />
                            </div>
                            <div>
                                {getDuration(range)} / {getDuration(duration)}
                            </div>
                        </div>
                        <div className={styles.first}>
                            <div title='full screen' onClick={handleFullScreen}>
                                {isfullScreen ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M220-86v-134H86v-126h260v260H220Zm395 0v-260h259v126H741v134H615ZM86-615v-126h134v-133h126v259H86Zm529 0v-259h126v133h133v126H615Z" /></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M86-86v-260h126v134h134v126H86Zm529 0v-126h133v-134h126v260H615ZM86-615v-259h260v126H212v133H86Zm662 0v-133H615v-126h259v259H748Z" /></svg>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {range} <br />
            {volume}
        </>
    )
}
