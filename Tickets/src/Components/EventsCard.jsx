import React from 'react'
import styles from './EventsCard.module.css'
import { Link } from 'react-router-dom'

export default function EventsCard(props) {
    let events = props.event;
    
    return (
        <Link to="/Event" state={events}>
        <article className={styles.eventsContainer} >
            <h3 className={styles.dateEvents}>{events.when.date}</h3>
            <h2 className={styles.nameEvents}>{events.name}</h2>
            <h3 className={styles.priceEvents}>{events.price} SEK </h3>
            <h3 className={styles.whereEvents}>{events.where}</h3>
            <h3 className={styles.hourEvents}>{events.when.from} - {events.when.to}</h3>
        </article>
        </Link>
    )
}
