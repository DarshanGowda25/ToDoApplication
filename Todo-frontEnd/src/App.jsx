import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import UserWrapper from './Components/UserWrapper';
import CompletedTodos from './Components/CompletedTodos';
import PendingTodos from './Components/PendingTodos';
import Todos from './Components/Todos';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<UserWrapper/>}>
            <Route index element={<Todos/>} />
            <Route path="/completedTodos" element={<CompletedTodos/>} />
            <Route path="/pendingTodos" element={<PendingTodos/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
