import { Trash, Pencil,Save } from 'lucide-react';
import {useRef, useState} from "react";
import axios from "axios";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Dashboard = ({cards, setCards})=>{
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [updatedAnswer, setUpdatedAnswer] = useState('');
    const [updatedQuestion, setUpdatedQuestion] = useState('');
    const inputRef = useRef(null);
    const addFlashcard =  ()=>{
       axios.post('http://localhost:8081/flashcards',{newQuestion, newAnswer}).then((res)=>{
           console.log(res.data);
       }).catch((err)=>{
           console.log(err);
       })
    }
    const deleteFlashcard = (index)=>{
        axios.delete('http://localhost:8081/flashcards/'+index).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{console.log(err)})
    }
    const updateFlashcard = (index)=>{
        console.log(updatedAnswer, updatedQuestion ,"updated values");
        console.log("updating");
        const values = {
            updatedAnswer : "hello",
            updatedQuestion : "hello"
        }
        axios.put('http://localhost:8081/flashcards/'+index , values).then((res)=>{
            console.log(updatedQuestion, updatedAnswer,"updated") ;
            console.log(res.data, "update");
        }).catch((Err)=>{
            console.log(Err);
        })
    }
    return (<>
        <h1 className="text-center font-bold text-4xl fixed bg-white w-full top-7 ">Admin's View</h1>
        <div>
            <div className=" w-1/2 mb-4 p-4 bg-white shadow-md rounded-lg mt-[80px]  mx-auto">
                <input
                    type="text"
                    placeholder="Question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={addFlashcard}
                    className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Add Flashcard
                </button>
                <button
                    onClick= {
                        ()=>{
                            window.location.href = '/';
                        }
                    }
                    className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 mt-2"
                >
                    View All Flashcards
                </button>
            </div>
            <table className="min-w-3/4 mx-auto mt-10 bg-gray-100 border-collapse">
                <thead>
                <tr className="bg-gray-800 text-white">
                    <th className="p-4 text-left">Question</th>
                    <th className="p-4 text-left">Answer</th>
                    <th className="p-4 text-center">Actions</th>
                    <th className="p-4 text-center">Delete</th>
                </tr>
                </thead>
                <tbody>
                {cards.map((card, i) => (
                    <tr key={i} className="bg-white border-b hover:bg-gray-50">
                        <td className="p-4">{card.question}</td>
                        <td className="p-4">{card.answer}</td>
                        <td className="p-4 text-center">
                            {isEditable ? (
                                <button onClick={() => {
                                    setIsEditable(false);
                                    updateFlashcard(card.id, updatedAnswer, updatedQuestion);
                                }} className="text-green-500 hover:text-green-700">
                                    Save
                                </button>
                            ) : (
                                <button onClick={() => {
                                    setIsEditable(true);
                                }} className="text-blue-500 hover:text-blue-700">
                                    Edit
                                </button>
                            )}
                        </td>
                        <td className="p-4 text-center">
                            <button onClick={() => {
                                console.log(card.id);
                                deleteFlashcard(card.id);
                            }} className="text-red-500 hover:text-red-700">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


        </div>
    </>)
}
export default Dashboard