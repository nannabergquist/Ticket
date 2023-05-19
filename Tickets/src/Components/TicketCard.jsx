import React from 'react'
import styles from './TicketCard.module.css';

export default function TicketCard(props) {

    let ticket = props.ticket;

    return (

        <section className={styles.backgroundColor}>
            {/* denna används för att kunna se hur många tickets man har.CSS:a detta kanske? */}
            <p className={styles.ticketsAmount} >{ticket.ticketAmount} st biljett(er) till</p>
            <h2 className={styles.ticketsName}>{ticket.name}</h2>
            <p className={styles.ticketsWhereMain}>WHERE</p>
            <h3 className={styles.ticketsWhere} >{ticket.where}</h3>
            <article className={styles.gridContainer}>
                <p className={styles.ticketsMainWhen}>WHEN</p>
                <h3 className={styles.ticketsWhen}>{ticket.when.date}</h3>
                <p className={styles.ticketsFromMain} >FROM</p>
                <h3 className={styles.ticketsFrom} >{ticket.when.from}</h3>
                <p className={styles.ticketsToMain} >TO</p>
                <h3 className={styles.ticketsTo}>{ticket.when.to}</h3>

            </article>

            <p className={styles.ticketsSection}>INFO</p>
            <p className={styles.ticketsSection} >Section C - seat 233, bring umbrella.</p>
            <img className={styles.ticketsImg} src="https://media.discordapp.net/attachments/953309864900296734/954364445612736582/Skarmbild_205.png" alt="ticketsID" />
        </section>
    )
}
