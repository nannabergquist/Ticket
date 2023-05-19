import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useLocation } from 'react-router';
import styles from "./Event.module.css";
import GoBackArrow from "../goBackArrow.png"


export default function Event(){ 

    // TAR EMOT EVENTET FRÅN Events.jsx //
    let location = useLocation()
    const pressedEvent = location.state;
   
    // SKAPAR STATES FÖR ANTAL BILJETTER, TOTATLSUMMA OCH 
    let [count, setCount] = useState(1) 
    let [amount, setAmount] = useState(pressedEvent.price)
    let [addedEvents] = useState(pressedEvent)//ANVÄNDS FÖR ATT SPARA EVENTCOUNTS TILL ORDER

    
    //LÄGGER TILL NY PROPERTY; TicketAmount MED VÄRDET AV ANTAL BILJETTER //
     function addCount() {
        addedEvents.ticketAmount = count;  
    }
    
    // VARJE GÅNG STATET COUNT ÄNDRAS SÄTTER VI AMOUNT MED PRIS*COUNT
    useEffect(() => {
        setAmount(pressedEvent.price * count)
    }, [count]);

    // ARROW FUNCTIONS PÅ +/- KNAPPARNA SOM SÄTTER COUNT +1 ELLER -1 //
    // KALLAR PÅ FUNKTIONEN addCount() NÄR KNAPPEN "LÄGG I VARUKORG" KLICKAS //
    // SKICKAR MED STATET addedEvents TILL Order.jsx //
    return (
        <section className={styles.sectionWrap} >
            <Link to="/Events"><img className={styles.goBack} src={GoBackArrow} alt="Go-back" /></Link>
            <h1 className={styles.heading}>Event</h1>
            <p className={styles.subheading}>You are about to score some tickets to</p>
            <article className={styles.infoWrap}>
                <h2 className={styles.eventName}>{pressedEvent.name}</h2>
                <h5 className={styles.when}>{pressedEvent.when.date} kl {pressedEvent.when.from} - {pressedEvent.when.to}</h5>
                <p className={styles.where}>@ {pressedEvent.where}</p>
            </article>
            <article className={styles.bigNumContainer}>
                <h3 className={styles.amount}>{amount} SEK</h3>
               <section className={styles.numContainer}>
                   <button onClick={() => setCount(prevCount => Math.max(prevCount - 1, 1))}>-</button>
                   <div className={styles.p}><p>{count}</p></div>
                   <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
               </section>
            </article>

           <Link className={styles.btnLink} to="/Order" state={addedEvents} >
                <button className={styles.button} onClick={addCount}>Lägg i varukorg</button>
                </Link>
         
        </section>
    )
}