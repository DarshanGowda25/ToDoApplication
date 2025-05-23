import React, { useState } from 'react'
import { Card } from './Todos';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function CompletedTodos() {

    
    // Fetch only completed todos
  const fetchToDos = async () => {
    const response = await axios.get('http://localhost:8080/api/todo/getStatusToDos?status=Completed');
    console.log(response.data.status)
    return response.data.ToDos;
  };

  const { data } = useQuery({
    queryKey: ['getToDos'],
    queryFn: fetchToDos,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });
  return (
    <div
          className="h-screen w-screen bg-center bg-cover space-x-10 z-0 overflow-auto"
          style={{ backgroundImage: "url('/Images/BG.jpg')" }}
        >
          {/* Todos cards */}
          <div className="w-[91%] h-auto flex flex-wrap mt-[150px] mx-auto z-1 gap-15 mb-[50px]">
            {data?.map((todo) => (
              <Card
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                status={todo.status}
              />
            ))}
          </div>
        </div>
  )
}

export default CompletedTodos