import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../App';
import GoBackArrow from "../goBackArrow.png"
import styles from './Tickets.module.css'
import { Link } from 'react-router-dom'
import TicketCard from '../Components/TicketCard.jsx';


export default function Tickets() {

    // HÄTAR DET GLABALA STATET MED ORDERN //
    const [globalData,] = useContext(GlobalContext);

    // SKAPAR TVÅ NYA STATE, ETT FÖR INDEX(page) OCH ETT FÖR NÄR VARJE EVENT VISAS SEPARAT (ticket) //
    const [page, setPage] = useState(0)

    const [ticket, setTicket] = useState([globalData[0]]) // GLOBALDATA FÖR ATT HA ETT INITIALT STATE //
   
    // NÄR STATET PAGE SÄTTS SKAPAS EN KOPIA AV HELA ORDERN MED NYTT INDEX FRÅN PAGE //
    useEffect(() => {
        let data = [...globalData]
        let chosenTicket = data[page]
        setTicket([chosenTicket])
        updateButtons();
    }, [page]);

    // OM VÅR ORDER ÄR LÄNGRE ÄN 1 KALLAS UpdateUI() //
    function updateButtons() {
        if (globalData.length > 1) {
            updateUI();
        }     
    }
    
    // BEROENDE PÅ STATET PAGE MANIPULERAS DOM:EN // 
    function updateUI() {
        let orderLength = (globalData.length -1 ); //- 1 FÖR ATT PAGE BÖRJAR PÅ 0
        if  (page === 0) {
            document.getElementById('nextBtn').style.visibility = "visible"
            document.getElementById('prevBtn').style.visibility = "hidden"
        } else if (page === orderLength) {
            document.getElementById('nextBtn').style.visibility = "hidden"
            document.getElementById('prevBtn').style.visibility = "visible"
        } else if (page >= 1) {
            document.getElementById('prevBtn').style.visibility = "visible"
            document.getElementById('nextBtn').style.visibility = "visible"
        } 
    }


    return (
        <section className={styles.ticketsPage} >
            <Link to="/Events"><img className={styles.goBack} src={GoBackArrow} alt="Go-back" /></Link>
            <section className={styles.ticketWrap}>
                {

                    ticket.map((ticket, i) => (
                        <TicketCard ticket={ticket} key={i} />
                    ))

                }
            </section>
            <section className={styles.btnWrap}>
            <button id="prevBtn" className={styles.prevBtn} onClick={() => setPage(prevNum => Math.max(prevNum - 1, 0))}>Föregående biljett</button>
            <button id="nextBtn" className={styles.nextBtn} onClick={() => setPage(prevNum => Math.min(prevNum + 1, globalData.length - 1))}>Nästa biljett</button>
            </section>
        </section>
    )
}
