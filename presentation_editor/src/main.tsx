import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import App from './App.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);

function renderApp() {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App></App>
      </Provider>
    </StrictMode>
  );
}

renderApp();
