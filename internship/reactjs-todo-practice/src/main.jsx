import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App.jsx';
import TodoItem from './components/TodoItem.jsx';

createRoot(document.getElementById('root')).render(
  <App />
);
