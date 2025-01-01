import styles from './Company.module.css'

function Company() {
    return (
        <div className={styles.empresa}>
            <h1>Nossa Empresa</h1>
            <p>Empresa <span>fictícia</span> para fins acadêmicos.</p>
        </div>
    )
}

export default Company