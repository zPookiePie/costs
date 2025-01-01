import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from './Footer.module.css'

function Footer() {
    return(
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <a href="https://www.linkedin.com/in/%C3%A1gata-rafaela-ab1006227/" target="_blank"><FaLinkedin/></a>
                </li>
                <li>
                    <a href="https://github.com/zPookiePie" target="_blank"><FaGithub /></a>
                </li>
                <li>
                    <a href="mailto:agatadevv@gmail.com" target="_blank"><MdEmail/></a>
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>Costs</span> &copy; 2024
            </p>
        </footer>
    )
}

export default Footer