import Main from './components/main';
import './App.css';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

Modal.setAppElement("#root");

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Main />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;

