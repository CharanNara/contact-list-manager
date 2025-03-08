const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001 || process.env.PORT;
app.use(express.json());
app.use(cors());

let contactsByName = {};
let contactsByEmail = {};

let contacts = [];

app.get('/contacts', (req, res) => {
    if(res.status(200)){
        res.json(contacts);
    }
    else{
        res.status(404).send('Not Found');
    }
}
);

// Add a new contact
app.post('/contacts', (req, res) => {
    if(!req.body.name || !req.body.email){
        res.status(400).send('Name and email are required');
    }
    if(contactsByEmail[req.body.email.toLowerCase()]){
        res.status(400).send('Email already exists');
    }
    if(contactsByName[req.body.name.toLowerCase()]){
        res.status(400).send('Name already exists');
    }
    const newContact = req.body;
    contacts.push(newContact);
    // print contacts
    console.log(contacts);
    contactsByName[newContact.name.toLowerCase()] = newContact;
    contactsByEmail[newContact.email.toLowerCase()] = newContact;
    res.status(201).send('Contact added successfully'); // 201 means Created

});

// Search for a contact
app.get('/contacts/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    let results = [];
    if (!query || query.trim() === "") {
        // Return 400 (Bad Request) if the query is empty or just spaces
        return res.status(400).send('Search query cannot be empty');
    }
    // Search by name
    if (contactsByName[query]) {
        results.push(contactsByName[query]);
    }
    // Search by email
    if (contactsByEmail[query]) {
        results.push(contactsByEmail[query]);
    }
    // Display the results
    print(results);
    if (results.length > 0) {
        return res.json(results);
    } else {
        return res.status(404).send('No contacts found for query: ' + query);
    }
});

app.delete('/contacts/:email', (req, res) => {
    const email = req.params.email.toLowerCase();
    if (!contactsByEmail[email]) {
        return res.status(404).send('Contact not found');
    }
    contacts = contacts.filter((contact) => contact.email !== email);
    delete contactsByName[contactsByEmail[email].name.toLowerCase()];
    delete contactsByEmail[email];
    res.status(200).send('Contact deleted successfully');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
