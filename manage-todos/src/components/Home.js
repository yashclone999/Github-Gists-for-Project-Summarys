import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    }
});


function Home() {

    const classes = useStyles();

    return (
        <div className="container">
            <h1>Create Gists</h1>
            <div className="row">
                <div className="col-12 mt-1">
                    <p className="project">Manage your projects!</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-1">
                    <Card className={`${classes.root}`}>
                        <CardHeader
                            title={"Interact with the App"}
                        />
                        <CardContent className="home">
                            <ul>
                                <li>Login to Github</li>
                                <li>After login, you'll be redirected to app</li>
                                <li>Click on "Complete Authentication"</li>
                                <li>Create a new project</li>
                                <li>Create, edit and delete todos inside project</li>
                                <li>Check/uncheck todos to edit status</li>
                                <li>Create gist</li>
                            </ul>
                        </CardContent>

                    </Card>
                </div>
            </div>
            
        </div>
    )
}
export default Home;


