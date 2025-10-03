import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { setupStore } from './store/store.ts';
import { BrowserRouter } from 'react-router';

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/React-project-films">
          <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
