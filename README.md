# Manage-Todos
Manages project and Todos. Adds project summary as gist

How to run:

prerequisites: yarn, npm, node, your own OAUTH App

in your own OAUTH APP: - call back URL - http://localhost:{express_port}/users/login/callback

Open Git Bash, move to directory where you want to clone the repo

$ git clone https://github.com/yashclone999/Manage-Todos.git


Once downloaded:

move into manage-todos directory and run "npm-install"
move into server directory and run "npm-install"

Create your OAUTH App on Github and store your clientID and ClientKey



replace your credentials with these in "manage-todos/src/config.js" port number 3000
with the one where your server is running
const config = {
    URL : "http://localhost:3000",
    clientID : "32fd305488b209b0d1bb",
    clientKey : "ca6f8926af7a17694ca6b97fd35e02fe47897167",
    redirectURI : "http://localhost:3000/users/login/callback",
    scope : 'gist'
}

const config = {
    URL : "http://localhost:{express_port}",
    clientID : "{your_clientID}",
    clientKey : "{your_client_Key}",
    redirectURI : "http://localhost:{express_port}/users/login/callback",
    scope : 'gist'
}


*********server/cors.js*********************


server/Config.js

const config = {
	OAUTH_clientID: "{your_clientID}",
	OAUTH_clientKey: "{your_client_Key}"
}


server/routes/users.js

res.redirect(`http://localhost:3001/loggedIn?token=${jwtToken}&&err=${err}`);

res.redirect(`http://localhost:{react_port}/loggedIn?token=${jwtToken}&&err=${err}`);

Once setup is complete from
manage-todos - yarn start
server - npm start
