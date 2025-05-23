import React, { useState } from 'react';
import { Card } from './Todos';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getErrorMsg } from '../utils/errorHandler';

function PendingTodos() {
  const[summary,setSummary] = useState("");
  const[isSummarizing,setIsSummarizing]= useState(false);

  //get sumarize
  const getSummary = async()=>{
      const response =  await axios.post("http://localhost:8080/api/todo/summarize");
      console.log(response.data.summary);
      return response.data.summary;
  }
  
  const SummarizeMutation = useMutation({
    mutationKey:['GetSummarize'],
    mutationFn:getSummary,
    onSuccess:(data)=>{
      setSummary(data)
    },
    onError:(error)=>{
      toast.error(getErrorMsg(error))
    }
  })

  // Fetch only pending todos
  const fetchToDos = async () => {
    const response = await axios.get('http://localhost:8080/api/todo/getStatusToDos?status=Pending');
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
      className="h-screen w-screen bg-center bg-cover space-x-10 z-0 overflow-auto flex flex-col"
      style={{ backgroundImage: "url('/Images/BG.jpg')" }}
    >
      <div className='h-[100px] w-[60%] bg-[#212121] mt-[100px] mx-auto rounded-lg flex items-center justify-evenly'>
          <p className='h-auto w-[80%] ml-6 text-white'>
            {summary === "" && isSummarizing ? "Summarizing...": summary}</p>
          <button className='bg-eliteGold py-2 px-3 m-3 cursor-pointer'
          onClick={()=>{
            SummarizeMutation.mutate()
            setIsSummarizing(true);
          }}>Summarize</button>

      </div>
      <div className="w-[91%] h-auto flex mt-15 flex-wrap mx-auto z-1 gap-15 mb-[50px]">
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
  );
}

export default PendingTodos;
