const config = require('../Config');
const url = require('url');
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');


const client_id = config.OAUTH_clientID;
const client_secret = config.OAUTH_clientKey;
const state = "abcd@#$";

const authenticate = require('../authenticate');
const cors = require('../cors');
const User = require('../Models/Users');

/* Client invoke this endpoint , server redirects to github and after a login redirects back to server. To be used when CORS issue is resolved

router.route('/login')
    .options(cors.validateForCORS, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.validateForCORSSelective,(req, res) => {

        let redirect_uri = "http://localhost:3000/users/login/callback";

        res.redirect(url.format({
            pathname: "https://github.com/login/oauth/authorize",
            query: {
                client_id: client_id,
                redirect_uri: redirect_uri,
                scope: "gist, read:user",
                state: state,
                allow_signup: false
            }
        }));

    });

*/

const getAccesstoken = async (code) => {

    try {
        const res = await fetch('https://github.com/login/oauth/access_token', {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                client_id,
                client_secret,
                code
                
            })

        });
        
        const data = await res.text();
        const params = new URLSearchParams(data);
        return params.get('access_token');

    }
    catch (e) {
        return e;
    }

}

const getUser = async (AccessToken) => {

    try {
        const bearer = 'Bearer ' + AccessToken;
        const res = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
            }
        });

        const data = await res.json();
        return data.login;

    }
    catch (e) {
        return e;
    }
}


router.route('/login/callback')
    
    .get( (req, res) => {

        const code = req.query.code;

        var jwtToken = "";

        if (code == null) {
            let err = "Error in Response from Github";
            res.redirect(`http://localhost:3001/loggedIn?token=${jwtToken}&&err=${err}`);
        }


        getAccesstoken(code)

            .then(async (AccessToken) => {

                let newUser = await getUser(AccessToken);
                const new_user = { username: newUser, access_token: AccessToken };
                

                User.findOne({ username: newUser }, function (err, user) {

                    if (user) {

                        User.findByIdAndUpdate(user._id, { $set: { access_token: AccessToken } })
                            .then(user => {

                                let err = "";
                                jwtToken = authenticate.createToken({ _id: user._id });
                                res.redirect(`http://localhost:3001/loggedIn?token=${jwtToken}&&err=${err}`);

                            })
                            .catch(err => {
                                res.redirect(`http://localhost:3001/loggedIn?token=${jwtToken}&&err=${err}`);
                            })
                        
                    } else {
                        
                        User.register(new_user, new_user.username,

                            (err, user) => {

                                if (err) {
                                    res.redirect(`http://localhost:3001/loggedIn?token=${jwtToken}&&err=${err}`);
                                }
                                else {

                                    let err = "";
                                    jwtToken = authenticate.createToken({ _id: user._id });
                                    res.redirect(`http://localhost:3001/loggedIn?token=${jwtToken}&&err=${err}`);
                                }

                            })
                    }
                });
                
            })

            .catch((err) => {
                res.redirect(`http://localhost:3001/loggedIn?token=${jwtToken}&&err=${err}`);
            })


    });


module.exports = router;









