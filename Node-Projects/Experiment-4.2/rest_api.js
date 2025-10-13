import express, { json } from "express";

// initialise express app
const app = express();
// middleware to parse JSON request bodies
app.use(json());

// In-memory data store
let cards = [
    { id: 1, suit: 'hearts', value: 'ace', collection: 'standard' },
    { id: 2, suit: 'spades', value: 'king', collection: 'vintage' }
];

// Helper to generate next ID
function nextId() {
    return cards.length + 1;
}

// CRUD Endpoints

// GET all cards
app.get('/api/cards', (req, res) => {
    res.json(cards);
});

// GET card by ID 
app.get('/api/cards/:id', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
});

// CREATE new card
app.post('/api/cards', (req, res) => {
    const { suit, value, collection } = req.body;
    if (!suit || !value || !collection) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const newCard = {
        id: nextId(),
        suit,
        value,
        collection
    };
    cards.push(newCard);
    res.status(201).json(newCard);
}); 

// UPDATE card by ID
app.put('/api/cards/:id', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));

    if (!card) return res.status(404).json({ error: 'Card not found' });
    
    const { suit, value, collection } = req.body;
    if (suit) card.suit = suit;
    if (value) card.value = value;
    if (collection) card.collection = collection;
    
    res.json(card);
});

// DELETE card by ID
app.delete('/api/cards/:id', (req, res) => {
    const index = cards.findIndex(c => c.id === parseInt(req.params.id));

    if (index === -1) return res.status(404).json({ error: 'Card not found' });
    
    cards.splice(index, 1);
    res.status(204).send();
});

// start server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  