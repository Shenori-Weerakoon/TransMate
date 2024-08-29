/*import React from 'react';
import Translator from './components/Translator';
import Dictionary from './components/Dictionary';
//import Login from './components/Login/index';


function App() {
  return (
    <div className="App">
      <h2>Sinhala to English Translator</h2>
      <Translator />
      <h1>English Dictionary</h1>
      <Dictionary />
      {/*<h2>Login</h2>
      <Login />
    </div>
    
  );
};

export default App;*/

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "./routes/app-routes";
//import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        <AppRoutes />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default App;