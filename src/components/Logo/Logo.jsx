import logoImage from '../../assets/image/Union.svg'
import styles from './Logo.module.css'
function Logo() {
    return (
        <div className={styles.container}>
            <a href="#" className={styles.logo}><img src={logoImage} alt="" /></a>
        </div>
    )
}

export default Logo