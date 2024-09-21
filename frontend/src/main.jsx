import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'flowbite/dist/flowbite.min.css';  // Import Flowbite CSS
import { Provider } from 'react-redux';
import { store } from './redux/store';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,

)
