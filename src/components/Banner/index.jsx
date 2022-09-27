import React from 'react'
import styles from "./Banner.module.sass"
import animatch from "../../assets/Animatch.png"

const Banner = () => {
  return (
    <div className={styles.container}>
      <img src={animatch} alt="dog"/>
    </div>
  )
}

export default Banner
