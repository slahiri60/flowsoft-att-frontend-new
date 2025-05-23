import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ListActionItemsScreen from './screens/ListActionItemsScreen';
import ActionItemDetailsScreen from './screens/ActionItemDetailsScreen';
import CreateActionItemScreen from './screens/CreateActionItemScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/listactionitems" element={<ListActionItemsScreen />} />
      <Route path="/createactionitem" element={<CreateActionItemScreen />} />
      <Route
        path="/actionitemdetails/:id"
        element={<ActionItemDetailsScreen />}
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
