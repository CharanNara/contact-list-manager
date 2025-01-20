import React, { useEffect, useState } from 'react';
import './App.css';
function App() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:5001/contacts')
            .then((res) => res.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error('Error:', error));
    }, []);


    const addContact = (e) => {
        e.preventDefault();
        if (name && email) {
            fetch('http://localhost:5001/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            })
                .then((res) => {
                    if (res.status === 201) {
                        alert('Contact added successfully');
                        setName('');
                        setEmail('');
                        fetch('http://localhost:5001/contacts')
                            .then((res) => res.json())
                            .then((data) => setContacts(data)) // Updating the contacts list
                            .catch((error) => console.error('Error:', error));
                    } else {
                        alert('Error adding contact');
                    }
                })
                .catch((error) => console.error('Error:', error));
        }
    };

    const searchContacts = () => {
        if (!searchQuery || searchQuery.trim() === '') {
            alert('Search query cannot be empty');
            return;
        }
        fetch(`http://localhost:5001/contacts/search?q=${searchQuery}`)
            .then((res) => res.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error('Error:', error));
    };

    const deleteContact = (email) => {
        fetch(`http://localhost:5001/contacts/${email}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Contact deleted successfully');
                    fetch('http://localhost:5001/contacts')
                        .then((res) => res.json())
                        .then((data) => setContacts(data))
                        .catch((error) => console.error('Error:', error));
                } else {
                    alert('Error deleting contact');
                }
            })
            .catch((error) => console.error('Error:', error));
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Contact List Manager</h1>
                <form onSubmit={addContact}>
                    <label>
                        Name:
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}
                        required/>
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        required/>
                    </label>
                    <input type="submit" value="Add Contact" />
                </form>
                <br/>
                <h2>Contacts</h2>
                <input type="text" name="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search"/>
                <button onClick={searchContacts}>Search</button>
                <ul>
                    {contacts.map((contact, index) => (
                        <li key={index}>
                            Name: {contact.name}, Email: {contact.email}
                            <button onClick={() => deleteContact(contact.email)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default App;
