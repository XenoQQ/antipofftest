import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import store from './components/store/store';
import { HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <Provider store={store}>
        <HashRouter>
            <Normalize />
            <App />
        </HashRouter>
    </Provider>,
);
