# Carbnb Required Route Endpoints

## /api

### cars
- get('/cars') -> gets all cars available on site
- get('/cars?location=somewhere') -> gets all cars for a location (as the site grows we will not want to pull all cars at once)
- post('/cars') -> register a new car
- delete('/cars/:id') -> remove a car from list of registrations (need user info?)
- put ('/cars/:id') -> update a car registration
- get('/cars/:id') get details for a specific car (if all the info is already in the data from get all cars, then we may not need this route)

### reviews
- get('/reviews', ? = car_id or host_id, or renter_id) -> get all the reviews for a car, for a host, or for a renter
- post('/reviews', ? = car_id, or renter_id) -> create a new review for a car / host, or a renter
- put('/reviews', ? = car_id, or renter_id) -> update a new review for a car / host, or a renter - do we want to allow people to edit their reviews?

### availability
- post('/availability') -> create a new availability slot for a car
- delete('/availability/:id') -> delete an availability slot
- put('/availability/:id') -> edit an availability slot
- get('/availability') -> get all availabilities (for a user) to display on dashboard

### orders
- get('/orders/:userId') -> get all orders for a specific user
- get('/orders') -> allow a host to get all the orders placed against their vehicles
- delete('/orders/:id') -> delete / cancel an order
- post('/orders') -> create a new order / booking

### users
- get('/users/:id') -> get info for a specific user
- post('/users') -> create / register a new user
- Stretch: ability for company employees / admins to get all users, update them, etc

### auth
- post('/auth/login') -> login a user
- Will we need extra routes for auth with passport?

### locations
- post('/locations') -> create a new location
- Stretch: allow users to edit, add, or delete their locations.

### favourites
- get('/favourites/:userId') -> get a users favourites (do we just filter from all cars instead?)
- post('favourites') -> allow user to add a vehicle to their favourites
- delete('favourites/:car_id/:user_id') -> user unfavourites a vehicle
