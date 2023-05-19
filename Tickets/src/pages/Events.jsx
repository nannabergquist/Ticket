import React, { useState, useEffect } from 'react'
import EventsCard from '../Components/EventsCard';
import styles from './Events.module.css';

export default function Events() {


    let [events, setEvents] = useState([]);
    let [filterEvents, setFilterEvents] = useState([]); //behövs när vi ska skapa en ny array 
    const [search, setSearch] = useState([]); //behövs en tom state när vi ska få träff på events

    const url = "https://my-json-server.typicode.com/majazocom/events/events";



    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setEvents(data))
    }, []);

    useEffect(() => { //när jag använde toLowerCase i filter metoden rad31, så retunerades sidan tom, därför skapade jag en ny function för att dela upp dessa två. 
        function compareStrings(string1, string2) {
            //Checkar om en variabel är en string. 
            // https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
            if ((typeof string1 === 'string' || string1 instanceof String) && (typeof string2 === 'string' || string2 instanceof String)) {
                const str1 = string1.toLowerCase()
                const str2 = string2.toLowerCase()
                return str1.includes(str2) //The includes() method returns true if a string contains a specified string.
            }
            //för att visa alla sökresultat innan fetchen är färdig(events är undefiend från start)
            return true
        }
        // använder filter metoden för att skapar en ny array som pushar in i sökresultatet
        setFilterEvents(events.filter(event => compareStrings(event.name, search) || compareStrings(event.where, search)));

    }, [search, events])

    function showSearchResults() {
        if (filterEvents) {
            return filterEvents.map((event, index) => (
                <EventsCard event={event} key={index} />
            ))
        } else {
            return <p>Search not found</p>
        }
    }

    return (
        <section className={styles.container} >
            <h1 className={styles.mainName} >Events</h1>
            <input className={styles.inputfield} onChange={e => setSearch(e.target.value)}></input>

            {
                showSearchResults()
            };
        </section>
    )
}
