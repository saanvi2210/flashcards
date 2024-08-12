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
    width: 'full',
    maxWidth: 'md',
    bgcolor: 'background.paper',
    borderRadius: 'lg',
    boxShadow: 24,
    p: 4,
};

const Dashboard = ({cards, setCards})=>{
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [updatedAnswer, setUpdatedAnswer] = useState('');
    const [updatedQuestion, setUpdatedQuestion] = useState('');
    const [updatedID, setUpdatedID] = useState(0);
    const inputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const addFlashcard =  ()=>{
       axios.post('http://localhost:8081/flashcards',{newQuestion, newAnswer}).then((res)=>{
           console.log(res.data);
       }).catch((err)=>{
           console.log(err);
       })
        setNewQuestion('');
       setNewAnswer('');
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
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!updatedQuestion || !updatedAnswer) {
            setError('Both question and answer are required.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8081/flashcards/${updatedID}`, {
                updatedQuestion,
                updatedAnswer
            });

            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError('Failed to update flashcard.');
            console.log('Error updating flashcard:', err);
        }
        setUpdatedQuestion('');
        setUpdatedAnswer('');
    };
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


                                <button onClick={() => {
                                    setIsEditable(true);
                                    setUpdatedQuestion(card.question);
                                    setUpdatedAnswer(card.answer);
                                    setUpdatedID(card.id);
                                }} className="text-blue-500 hover:text-blue-700">
                                    Edit
                                </button>

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
            <Modal
                open={isEditable}
                onClose={() => {
                    setIsEditable(false);
                    setMessage('');
                    setError('');
                }}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style} className="bg-white rounded-lg shadow-lg p-6 mx-4 md:mx-auto max-w-lg">
                    <h2 className="text-xl font-semibold mb-4">Update Flashcard</h2>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Question:</label>
                            <input
                                type="text"
                                value={updatedQuestion}
                                onChange={(e) => setUpdatedQuestion(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Answer:</label>
                            <input
                                type="text"
                                value={updatedAnswer}
                                onChange={(e) => setUpdatedAnswer(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </form>
                    {message && <p className="text-green-600 mt-2">{message}</p>}
                    {error && <p className="text-red-600 mt-2">{error}</p>}
                </Box>
            </Modal>


        </div>
    </>)
}
export default Dashboard