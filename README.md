# WTWR (What to Wear?): Back End

This is the back-end to the WTWR app. It is the server that will handle requests from the front end regarding users and cards data. The server is connected to a database were all the information is stored.
Website link: https://watowear.jumpingcrab.com
Front-end repo: https://github.com/Sacha-Marciano/se_project_react

## Technical description

This code uses express npm package to create a server which by default listen to port 3001. It connectcs to a MongoDB database via the mongoose npm package and uses the cors npm package to allow domains origins.
The logic of the app is simple : listen to requests sent to server, check if the request match the conditions of routes, endpoints and models (default responses to unknown routes implemented), and sends a response based on the request. The app can read, modify or delete data in the database.

## Handled requests

- GET /users: Returns all users list
- GET /users/:userID: Returns specific user depending on ID
- POST /users: Create a user and add it to db. Returns user and user's ID

- GET /items: Return all items list
- POST /items:Create an item and add it to db. Returns item and item's ID
- DELETE /items/:itemId: Delete specific item from db depending on ID

- PUT /items/:itemId: Add user's ID to likes array of item depending on ID only once
- DELETE /items/:itemId: Delete user's ID to likes array of item depending on ID only if it exists

DEFAULT: all unknown routes or endpoint will end in a 404 response

## Updates

From new to old:

- v3.2.4 Fix after failed GitHub Actions
- v3.2.3 Fix after failed GitHub Actions
- v3.2.2 Fix login validation bug
- v3.2.1 Fix after failed GitHub Actions
- v3.2.0 Implement requests and error logger
- v3.1.0 Implement validation middleware
- v3.0.0 Implement general error handling
- v2.5.0 Adjust for Front-end queries
- v2.4.1 Fix after GitHub Actions
- v2.4.0 Fix after review
- v2.3.1 Fix after GitHub Actions tests
- v2.3.0 Pass Postman tests successfully
- v2.2.1 Create update profile controller and route to it
- v2.2.0 Authenticate user via JWT
- v2.1.1 Route new controllers
- v2.1.0 create login controller
- v2.0.1 Implement user creation with email and password for
- v2.0.0 Implement mail and password to User schema
- v1.2.0: Fix after review, update README
- v1.1.0: Fix after checklist, comment code with explanations
- v1.0.2: Fix response object, send data directly instead of inside a JSON object
- v1.0.1: Fix GitHub actions failures
- v1.0.0: Create server using express and connects it to MongoDB via mongoose. Route known routes to righ endpoints, implement default server responses
- Initial commit: Clone repo to local machine

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

All Postman and GitHub Actions tests were successfully passed

### Later Upgrades

- Implement user's authentification
- Connect to front-end
