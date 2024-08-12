import {useEffect, useState} from 'react'
import './App.css'
import Card from "./flashcards/card.jsx";
import CardsList from "./flashcards/cardsList.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./flashcards/dashboard.jsx";
import axios from "axios";

function App() {
  const [cards, setCards] = useState([
  ])
    const [isAdmin , setIsAdmin]= useState(true);
    useEffect(() => {
        setInterval(()=>{
            axios.get("http://localhost:8081/flashcards").then((res)=>{
                setCards(res.data);
                console.log(res.data);
            })
        }, 2000)

    }, []);

  return (
    <>
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<CardsList cards={cards}/>} />
                    <Route path="/dashboard" element={<Dashboard cards={cards} setCards={setCards}/>} />
                </Routes>
            </div>
        </Router>


    </>
  )
}

export default App
