# Manage-Todos
Manages project and Todos. Adds project summary as gist. Prerequisites are npm, node, your own Github OAUTH App


# Installing node and npm for Ubuntu
1. curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
2. sudo apt-get install -y nodejs



# Clone github code 
move to directory where you want to clone the repository

git clone https://github.com/yashclone999/Manage-Todos.git

# Install node_modules
Move into directories as specified and run npm install
1. ~/Node/Manage-Todos/manage-todos$ npm install 
2. ~/Node/Manage-Todos/server$ npm install 


# Create personal OAUTH App for locally running the application - https://docs.github.com/en/developers/apps/creating-an-oauth-app
1. Create your OAUTH App on Github and store your clientID and ClientKey - your_clientID, your_client_Key
2. Set ExpressServerPort as 3000 
3. Set Authorization callback URL as http://localhost:ExpressServerPort/users/login/callback

# Update 
Update react-app files and server files with your_clientID, your_client_Key as specified in the Step 1

# Running server and react application
1. ~/Node/Manage-Todos/server$ npm start
2. ~/Node/Manage-Todos/manage-todos$ npm start

# Conditional
1. On starting server first, it will run on port 3000. Starting react app second, it will run on 3001.
2. If any of them run on different port then update the respective port numbers as specified in the following steps



## Step 1: Update files 

In "manage-todos/src/config.js" replace:
1. port number 3000 with the port number where express server is running
2. clientID with your_clientID
3. clientKey with your_client_Key

### original - manage-todos/src/config.js
```js
const config = {
    URL : "http://localhost:3000",
    clientID : "32fd305488b209b0d1bb",
    clientKey : "ca6f8926af7a17694ca6b97fd35e02fe47897167",
    redirectURI : "http://localhost:3000/users/login/callback",
    scope : 'gist'
}
```
### update - manage-todos/src/config.js
```js
const config = {
    URL : "http://localhost:{express-port-number}",
    clientID : "your_clientID",
    clientKey : "your_client_Key",
    redirectURI : "http://localhost:{express-port-number}/users/login/callback",
    scope : 'gist'
}
```

#### update- server/Config.js,
const config = {
	OAUTH_clientID: "your_clientID",
	OAUTH_clientKey: "your_client_Key"
}



# Step 2: update
In Manage-Todos/server/cors.js add your react-app port to whitelist
```js
const whitelist = ['http://localhost:{react-app-port-number}'];
```



# Step 3: update
In server/routes/users.js update port number with react app
```js
const port = react-app-port-number
```

# Step 4: Update OAUTH App callback 
http://localhost:*ExpressServerPort*/users/login/callback


# Step 5: Running react application and server
Once setup is complete: 
1. ~/Node/Manage-Todos/server$ npm start
2. ~/Node/Manage-Todos/manage-todos$ npm start



