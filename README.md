Base URL: http://localhost:3000

RUN:

TERMINAL:

node app.js


Register User

Endpoint: POST /register

Request Body:

{

    "username": "xyz",
    "password": "passwords"
    
}

2. List Rides

Endpoint: GET /rides

Response:

Success (200):
json
[

    { "id": 1, "distance": "5", "fare": "rs 10" },
    { "id": 2, "distance": "10", "fare": "rs 20" },
    { "id": 3, "distance": "15 ", "fare": "rs 30" }
    
]

3. Ride Details

Endpoint: GET /rides/:id

Example Request: GET /rides/1

Response:
Success (200):

json
{

    "rideId": "1",
    "distance": 60,
    "fare": rs 760,

    
}
