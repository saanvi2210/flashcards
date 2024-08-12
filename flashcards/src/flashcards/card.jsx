import {useState} from "react";
import './card.css'
const Card = ({question, answer})=>{
    const [ isFlipped , setIsFlipped] = useState(false);
    return (
        <>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front flex justify-center items-center text-xl rounded-xl p-2">
                        {question}
                    </div>
                    <div className="flip-card-back flex justify-center items-center text-xl rounded-xl p-2">
                        {answer}
                    </div>
                </div>
            </div>

        </>
    )
}
export default Card;