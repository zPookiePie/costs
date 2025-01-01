import React, {useState} from 'react'
import { Link, Links } from "react-router-dom"

import Container from "./Container"
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'
import { FaBars, FaWindowMinimize } from 'react-icons/fa'

function Navbar() {

    const[menu, setMenu] = useState(false)

    const openMenu = () => {
        setMenu(true)
    }

    const closeMenu = () => {
        setMenu(false)
    }

    return(
        <nav className={styles.navbar}>
                <Link to="/"><img src={logo} alt="Costs" /></Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Empresa</Link>
                    </li>
                </ul>
                <div className={styles.sidebar}>
            <FaBars className={styles.openIcon} onClick={openMenu} />

            {menu && (
                <div className={styles.sidebar_container}>

                <div className={styles.wrapIcon}>
                    <FaWindowMinimize onClick={closeMenu} className={styles.closeIcon} />
                </div>

                <ul className={styles.sidebar_list}>
                    <Link to="/" className={styles.li} onClick={closeMenu}>Home</Link>
                    <Link to="/projects" className={styles.li} onClick={closeMenu}>Projetos</Link>
                    <Link to="/company" className={styles.li} onClick={closeMenu}>Empresa</Link>
                    <Link to="/contact" className={styles.li} onClick={closeMenu}>Contato</Link>
                </ul>
                </div>
            )}
            </div>
        </nav>
    )
}

export default Navbar