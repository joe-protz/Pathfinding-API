# Pathfinding Visualization API
This API is meant to let a user sign in/up/out, change their password, and CRUD grids with a name and array of boolean values. The boolean values should be used to map to a 2d grid og 50x50 on a front end client.

## Important Links
- [Deployed Client](https://joe-protz.github.io/Pathfinding-Visualizer-Client/)
- [Client Repo](https://github.com/joe-protz/Pathfinding-Visualizer-Client)
- [API Repo](https://github.com/joe-protz/Pathfinding-API)
- [Deployed Heroku Link](https://glacial-bastion-01354.herokuapp.com)

## Planning Story

This API was relatively straightforwad, it uses a basic single resource owned by a user. There were a few challenges along the way, such as how to store an array of booleans correctly, how to know if a user has visited a client, and how to add an 'editable' field to a resource. In the end I ended up creating a module in lib that takes an item and a user, and returns that object with a new field 'editable' with a boolean value.

## Installation
- Download this repo as a zip or fork and clone it
- Unzip if necessary
- Run NPM Install
- Ensure that you have nodemon installed by running npm install -g nodemon.


### Technologies Used

- Javascript
- Express
- Mongoose
- MongoDB

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |
| PATCH  | `/userVisit'`        | `users#changeVisited`| 
#### POST /sign-up

Request:

```sh
curl --include --request POST http://localhost:4741/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

```sh
curl-scripts/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```sh
curl --include --request POST http://localhost:4741/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```

```sh
curl-scripts/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/

Request:

```sh
curl --include --request PATCH http://localhost:4741/change-password/ \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa curl-scripts/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/

Request:

```sh
curl --include --request DELETE http://localhost:4741/sign-out/ \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa curl-scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### PATCH /userVisit/

Request:

```sh
curl --include --request PATCH http://localhost:4741/userVisit/ \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa curl-scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```
### Grids

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/grids`    | `grids#index`    |
| GET   | `/grids/:id`     | `grids#show`    |
| GET  | `/my/grids` | `show#ownedGrids`  |
| DELETE | `/grids/:id`  | `grids#destory`   |
| POST  | `grids`        | `grids#create`| 
| PATCH | `/grids/:id`  | `grids#update`| 


## User Stories
<!-- Authentication  -->
- As a unauthenticated  user I want to be able to sign up and sign in
- As an authenticated user I want to be able to change my password and sign out

<!-- CRUD -->
- As an authenticated user:
  - I want to be able to click on a grid to add walls to it
  - I want to be able to click a button to reset the walls
  - I want to be able to save a grid with a title 
  - I want to be able to see all of my grids as thumbnails
  - I want to be able to select a grid to see it animated with various pathfinding algorithms
  - I want to be able to see a feed of all user's saved grids
  - STRETCH: Let users favorite grids , sort by most favorited

- As an unauthenticated user I would like to be able to see the public feed of grids

<!-- Visualization  -->
- As a user I would like to be able to click a button to start the visualization process of various pathfinding algorithms
- As a user i would like to be able to click a restart button to visualize the algorithm again

## ERD

![ERD](https://imgur.com/ssD6JLG.png)

## Unsolved Issues
- Need to add much more validation