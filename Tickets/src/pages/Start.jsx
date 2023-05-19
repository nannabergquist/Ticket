import styles from "./Start.module.css";
import { Link } from 'react-router-dom';

export default function Start() {
    return (
        <Link to="/Events">
            <section className={styles.containerStart} >
                <img className={styles.logoImg} src="https://media.discordapp.net/attachments/953309864900296734/954050322958000208/logo.png?width=600&height=587" alt="logo" />
                <h1 className={styles.logoName} >Where It's @</h1>
                <h3 className={styles.logoSlogan} >Ticketing made easy</h3>
            </section>
        </Link>
    )
}
