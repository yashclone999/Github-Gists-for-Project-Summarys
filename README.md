# Manage-Todos
Manages project and Todos. Adds project summary as gist. Prerequisites are npm, node, your own Github OAUTH App


## Installing node and npm for Ubuntu
1. curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
2. sudo apt-get install -y nodejs



## Clone github code 
move to directory where you want to clone the repository

git clone https://github.com/yashclone999/Manage-Todos.git

## Install node_modules
Move into directories as specified and run npm install
1. ~/your_pwd/Manage-Todos/manage-todos$ npm install 
2. ~/your_pwd/Manage-Todos/server$ npm install 


## Create personal OAUTH App for running the application locally - https://docs.github.com/en/developers/apps/creating-an-oauth-app
1. Create your OAUTH App on Github and store your clientID and ClientKey - your_clientID, your_client_Key
2. **express-port-number** is the port number on which server will run, **react-app-port-number** is where react app will run
3. Set Authorization callback URL of your OAUTH app as http://localhost:express-port-number/users/login/callback

## Update files (needed)
Update react-app files and server files with your_clientID, your_client_Key as specified in the **Step 1**

## Starting applications
1. On starting server first, it should run on port 3000 by default. Starting react app second, it should run on 3001.
2. **If any of them run on different port then update the respective port numbers in files as specified in the following steps 1 to 5**

## Running server and react application
1. ~/your_pwd/Manage-Todos/server$ npm start
2. ~/your_pwd/Manage-Todos/manage-todos$ npm start


#### Follow Steps 2 to 5 if react or express application are not running on port 3001 and 3000 respectively

### Step 1: Update files 

In "your_pwd/Manage-Todos/manage-todos/src/config.js" replace:
1. port number 3000 with the port number where express server is running
2. clientID with your_clientID
3. clientKey with your_client_Key

#### original - your_pwd/Manage-Todos/manage-todos/src/config.js
```js
const config = {
    URL : "http://localhost:3000",
    clientID : "32fd305488b209b0d1bb",
    clientKey : "ca6f8926af7a17694ca6b97fd35e02fe47897167",
    redirectURI : "http://localhost:3000/users/login/callback",
    scope : 'gist'
}
```
#### update - your_pwd/Manage-Todos/manage-todos/src/config.js
```js
const config = {
    URL : "http://localhost:{express-port-number}",
    clientID : "your_clientID",
    clientKey : "your_client_Key",
    redirectURI : "http://localhost:{express-port-number}/users/login/callback",
    scope : 'gist'
}
```

#### update- your_pwd/Manage-Todos/server/Config.js,
```js
const config = {
	OAUTH_clientID: "your_clientID",
	OAUTH_clientKey: "your_client_Key"
}
```


### Step 2:
In Manage-Todos/server/cors.js add your react-app port to whitelist
```js
const whitelist = ['http://localhost:{react-app-port-number}'];
```



### Step 3: update
In your_pwd/Manage-Todos/server/routes/users.js update port number
```js
const port = react-app-port-number
```

### Step 4: Update OAUTH App callback 
http://localhost:express-port-number/users/login/callback


### Step 5: Running react application and server
Once setup is complete: 
1. ~/your_pwd/Manage-Todos/server$ npm start
2. ~/your_pwd/Manage-Todos/manage-todos$ npm start



