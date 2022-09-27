import React from 'react'
import FooterNav from '../FooterNav'
import styles from './Footer.module.sass'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>ANIMATCH</div>
      <div className={styles.footerContent}>
        <h3>Necesitas ayuda?</h3>
        <p>Contáctanos por correo electrónico en contacto@animatch.com</p>
        <FooterNav />
      </div>
    </footer>
  )
}

export default Footer
