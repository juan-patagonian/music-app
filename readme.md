# Spotify Music App - Assessment

### Requirements

- Docker and Docker-compose 3.9

### Features

- Nodejs + Express Backend
- MongoDB 4.2 database
- JWT Authentication
- Mongoose as an abstraction layer to the DB
- React frontend
- Spotify API Calls

### Making things work

First, let's clone the repo and get to the environment file.

```bash
git clone git@github.com:juan-patagonian/music-app.git
cd music-app
code example.env
````

You should uncomment this file's variables and set your own credentials. Spotify API will require a client ID and a personal token eventually. Now we can start running our containers. Standing in the project's root folder run the following:

```bash
docker-compose build
docker-compose up frontend
````

The first command builds the docker containers, while the second one starts the `frontend` service. Optionally you could change the service name to `backend` or `mongodb` to run the API or database respectively.

If everything worked correctly you should be able to go to <http://localhost:3000/api/auth/ping> and see an "All ok" message from the backend. Additionaly the frontend service app should be running in <http://localhost:5000>.

### Additional notes

- This docker-compose structure lacks volumes, so data saved to the database will not be persistently saved.
