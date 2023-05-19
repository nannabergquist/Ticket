import React, { useEffect, useState, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom';
import OrderCard from '../Components/OrderCard';
import styles from "./Order.module.css";
import { GlobalContext } from '../App';
import GoBackArrow from "../goBackArrow.png"


export default function Order() {

    //SKAPAR STATE SOM HÅLLER DET TOTALA VÄRDET PÅ ORDERN //
    let [total, setTotal] = useState(0)

    // TAR EMOT EVENTDATA FRÅN Event.jsx //
    let location = useLocation();
    const addedEvent = location.state;

    // HÄMTAR DET GLOBALA STATET DÄR ALLA ARTIKLAR SKA SPARAS //
    const [globalData, setGlobalData] = useContext(GlobalContext)

    // NÄR SIDAN LADDAS IN SÄTTS DATAN FRÅN addedEvents I globalData //
    useEffect(() => {
        let orderList = [...globalData];
        orderList.push(addedEvent);
        setGlobalData(orderList);
    }, []);


    //När statet order ändras kallas funktionen totalAmount
    useEffect(() => {
        totalAmount();
    }, [globalData]);


    // HÄR KALKULERAS VÄRDET AV ALLA BILJETTER OCH SÄTTER STATET total //
    function totalAmount() {
        let calcTotal = 0;

        globalData.map((order) => {
            calcTotal += order.ticketAmount * order.price
        })
        setTotal(calcTotal);
    };

    // FUNKTION SOM SKICKAS IN I BARNET OrderCard FÖR ATT HÄMTA DATA //
    //HÄR UPPDATERAS globalData MED DE NYA ANTALET BILJETTER//
    function updateCount(eventCount, event) {
        let updatedOrderList = [...globalData];
        let matchingEvent = updatedOrderList.find(order => order.name === event.name);
        matchingEvent = {
            ...matchingEvent,
            ticketAmount: eventCount
        }

        const index = updatedOrderList.map(object =>
            object.name).indexOf(matchingEvent.name);

        if (eventCount > 0) {
            updatedOrderList.splice(index, 1, matchingEvent);
        } else {
            updatedOrderList.splice(index, 1);
        }
        setGlobalData(updatedOrderList);
    }


    return (
        <section className={styles.bigWrap}>
            <Link to="/Events"><img className={styles.goBack} src={GoBackArrow} alt="Go-back" /></Link>
            <h1>Order</h1>
            <section className={styles.smallerWrap}>
                <section className={styles.articleContainer}>
                    {
                        globalData.map((order, index) => (
                            <OrderCard updateCount={updateCount} key={index} order={order} />
                        ))
                    }
                </section>

                <section>
                    <p className={styles.subheading}>Totalt värde på order</p>
                    <h2 className={styles.amount}>{total} SEK</h2>
                </section>

                <Link className={styles.btnLink} to="/Tickets" > 
                    <input className={styles.button} type="button" value="Skicka order" />
                </Link>
            </section>
        </section>
    )
}
