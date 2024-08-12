import Card from "./card.jsx";
import {useState} from "react";

const CardsList = ({cards})=>{
    const [currentCard, setCurrentCard] = useState(0);
    const handlePrev = ()=>{
        setCurrentCard((card)=> card===0 ? cards.length-1 : card-1)
    }
    const handleNext = ()=>{
        setCurrentCard((card)=> card===cards.length-1 ? 0 : card+1)
    }
    console.log(cards.length, cards[0])
    return (<>
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center justify-center">
                <Card {...cards[currentCard]}/>
                <div className="flex justify-between items-center mt-4 gap-10">
                    {currentCard !== 0 && (
                        <button
                            onClick={handlePrev}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
                        >
                            Prev
                        </button>
                    )}
                    {currentCard !== cards.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
                        >
                            Next
                        </button>
                    )}
                </div>
                <button  className=" mt-4  px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
                    onClick={() => {
                    window.location.href = '/dashboard';
                }}>Admin's View
                </button>

            </div>


        </div>

    </>)
}
export default CardsList