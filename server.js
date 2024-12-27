// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Mock user data storage
let users = [];

// Endpoint to register a user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already taken.' });
    }

    // Register new user
    users.push({ username, password });
    return res.status(201).json({ message: 'User registered successfully.' });
});

// Endpoint to list rides
app.get('/rides', (req, res) => {
    fs.readFile('rides.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading ride data.' });
        }
        const rides = JSON.parse(data);
        return res.status(200).json(rides);
    });
});

// Endpoint to get ride details by ID
app.get('/rides/:id', (req, res) => {
    const rideId = parseInt(req.params.id);
    
    fs.readFile('rides.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading ride data.' });
        }
        const rides = JSON.parse(data);
        const ride = rides.find(r => r.id === rideId);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found.' });
        }

        // Returning detailed mock data for the ride
        return res.status(200).json({
            id: ride.id,
            distance: ride.distance,
            fare: ride.fare,
            driver: 'John Doe',
            carModel: 'Toyota Prius',
            pickupLocation: '123 Main St',
            dropoffLocation: '456 Elm St'
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
