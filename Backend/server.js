const express = require('express');
const mysql = require('mysql2')
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "saanvi22",
    database : "flashcards_db"
})

app.get('/',(req,res)=>{
    return (res.json("Response from backend"));
})
app.get('/flashcards', (req,res)=>{
    const sql = "SELECT * FROM flashcards";
    db.query(sql, (err, result)=>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    })
})
app.post('/flashcards', (req, res) => {
    const sql = 'INSERT INTO flashcards (question, answer) VALUES (?)';
    const values = [req.body.newQuestion, req.body.newAnswer];
    db.query(sql, [values], (err) => {
        if (err) throw err;
        res.send('Flashcard added');
    });
});

app.delete('/flashcards/:index', (req, res) => {
    const id = req.params.index;
    db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.send('Flashcard deleted');
    });
});
app.put('/flashcards/:id', (req, res) => {
    const id = req.params.id;
    const { updatedQuestion, updatedAnswer } = req.body;

    const sql = "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?";
    db.query(sql, [updatedQuestion, updatedAnswer, id], (err, result) => {
        if (err) {
            console.error("Error updating flashcard:", err);
            return res.status(500).json({ error: "Failed to update flashcard" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        res.json({ message: "Flashcard updated successfully" });
    });
});
app.listen(8081,()=>{
    console.log("listening");
})