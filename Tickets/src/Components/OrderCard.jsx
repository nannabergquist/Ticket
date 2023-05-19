import { useEffect, useState } from 'react';
import styles from './OrderCard.module.css';

export default function OrderCard(props) {

    // TAR EMOT EVENT MED PROPS OCH SPARAR DET I VARIABELN event //
    let event = props.order;

    // SKAPAR ETT STATE MED DET INITIALA MÄNGDEN BILJETTER //
    let [count, setCount] = useState(props.order.ticketAmount)

    // VARJE GÅNG count UPPDATERAS KALLAS FUNKTIONEN sendUpdatedCount //
     useEffect(() => {
        sendUpdatedCount(count, event);
     }, [count]); 

     // SKICKAR UPP DET NYA BILJETTANTALET TILL FÖRÄLDRAKOMPONENTEN Order.jsx //
     function sendUpdatedCount(count, event) {
         props.updateCount(count, event)
     }

    return (
        <article className={styles.articleWrap}>
            <h2 className={styles.name}>{event.name}</h2>
            <p className={styles.date}>{event.when.date} kl {event.when.from} - {event.when.to}</p>
            <section className={styles.countContainer}>
            <button className={styles.btn} value="remove" onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
                <div className={styles.p}><p>{count}</p></div>
                <button className={styles.btn} value="add" onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            </section>
        </article>
    )
}
