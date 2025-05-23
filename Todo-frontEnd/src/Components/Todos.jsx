import React, { useEffect, useState } from 'react'
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getErrorMsg } from '../utils/errorHandler';


function Todos() {
const queryClient= useQueryClient();


const [title,setTitle] =  useState("");
const [description,setDescription] =  useState("");


//Get Todos
const fetchToDos = async()=>{
    const response = await axios.get('http://localhost:8080/api/todo/getToDos');
    return response.data.ToDos;
}

const {data}= useQuery({
    queryKey:["getToDos"],
    queryFn:fetchToDos,
    staleTime:Infinity,
    refetchOnWindowFocus:false
})

// Add ToDos
const addTodoFunction = async (newTodo) => {
    console.log(newTodo)
  const response = await axios.post('http://localhost:8080/api/todo/add', newTodo);
  console.log(response.data)
  return response.data;
};

const addTodoMutation = useMutation({
  mutationKey:['addToDo'],
  mutationFn: addTodoFunction,
  onSuccess:(data) =>{
    queryClient.invalidateQueries(['getToDos']);
    toast.success(data.status);
    setTitle("");
    setDescription("");
  },
  onError:(error)=>{
    toast.error(error);
  }
});

const handleSubmit = (e) => {
  e.preventDefault();
  addTodoMutation.mutate({ title, description});
};

//delete All

const deleteTodoFunction = async () => {
  console.log("Deleteing all")
  const response = await axios.delete(`http://localhost:8080/api/todo/deleteAll?status=Completed`);
  console.log(response.data)
  return response.data;
};

const deleteAllTodoMutation = useMutation({
  mutationKey:['deleteCompletedToDos'],
  mutationFn: deleteTodoFunction,
  onSuccess: (data) => {
    queryClient.invalidateQueries(['getToDos'])
    toast.success(data)
  },
  onError: (error) => {
    toast.error(getErrorMsg(error));
  }
});




 return (
    <div className='h-screen w-screen  bg-center bg-cover space-x-10 z-0 overflow-auto' style={{backgroundImage:"url('/Images/BG.jpg')"}}>


      <div className='relative flex flex-row gap-2 items-center'>
        {/* //add task */}
        <form onSubmit={handleSubmit} className='h-[100px] w-[60%] bg-[#212121] mt-[100px] mx-auto rounded-lg flex items-center justify-evenly'>

        
        
  
            <div className='h-full w-[40%] flex flex-col justify-center' >
                <label className='text-white'>Title:</label>
                <input type='text'
                placeholder='Enter Your Todo Item'
                className='bg-white outline-none border-none mt-2 p-1'
                value={title}
                required
                onChange={(e)=>setTitle(e.target.value)}
                
                ></input>
            </div>

             
            <div className='h-full w-[40%] flex flex-col justify-center' >
                <label className='text-white'>Description:</label>
                <input type='text'
                placeholder='Enter Description'
                className='bg-white outline-none border-none mt-2 p-1'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                required
                ></input>
            </div>

            <button type='submit' className='bg-eliteGold p-2 px-8 mt-8 text-white hover:shadow-[0_0_10px_rgba(212,175,55,0.5)] cursor-pointer'>
                Add
            </button>

            

            </form>

            <button className='px-2 py-3 bg-green-700 text-white ml-100 absolute top-35 right-30
            hover:bg-green-800 cursor-pointer'
            onClick={()=>{
              deleteAllTodoMutation.mutate();
            }}>Clear Completed</button>

        </div>


       {/* Task cards */}
        <div className='w-[91%] h-auto flex flex-wrap mt-[50px]  mx-auto z-1 gap-15 mb-[50px]'>
          
            {
               data?.map((item)=>(
                    <Card 
                    key={item.id}
                    id={item.id}
                    title={item.title} 
                    description={item.description} 
                    status={item.status} 
                    />
                    
                ))
            }

        </div>

    </div>
  )
}

export default Todos


export function Card({id,title,description,status}){
    
const queryClient= useQueryClient();

//update ToDos
  const updateTodoFunction = async (data) => {
  console.log(data)
  const response = await axios.patch('http://localhost:8080/api/todo/update', data);
  console.log(response.data)
  return response.data;
};

const updateTodoMutation = useMutation({
  mutationKey:['updateToDo'],
  mutationFn: updateTodoFunction,
  onSuccess: (data) => {
    queryClient.invalidateQueries(['getToDos'])
    toast.success(data.status);
  },
  onError: (error) => {
    toast.error(getErrorMsg(error));
  }
});

const handleStatus = (id)=>{
  updateTodoMutation.mutate({id,status:"Completed"});
  }


  //delete todo
  const deleteTodoFunction = async (id) => {
  console.log(id)
  const response = await axios.delete(`http://localhost:8080/api/todo/delete?id=${id}`);
  console.log(response.data)
  return response.data;
};

const deleteTodoMutation = useMutation({
  mutationKey:['deleteToDo'],
  mutationFn: deleteTodoFunction,
  onSuccess: (data) => {
    queryClient.invalidateQueries(['getToDos']);
    toast.success(data)
  },
  onError: (error) => {
    toast.error(getErrorMsg(error));
  }
});

  const handleDelete = (id) => {
    deleteTodoMutation.mutate(id);
  }
    
    const location = useLocation();
    return(

        <div className='h-[150px] w-[300px] bg-[#212121]  text-white rounded-lg flex flex-col px-5 relative hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]'>

                <h1 className='text-eliteGold text-3xl font-bold mt-5'>{title}</h1>
                <h1 className='text-gray-400 mt-2'>{description}</h1>
                <div>
                    
                    {/* Delete */}
                    <MdDelete className={`text-red-700 text-2xl absolute bottom-3  hover:text-red-900 cursor-pointer right-12
                    ${status==='Pending'?'block':'hidden'} `}
                     onClick={()=>handleDelete(id)}/>

                    {/* //complete */}
                    {status==='Completed'?<p className='text-eliteGold absolute bottom-3 right-12'>Completed</p>:""}
                    <TiTick className={` text-4xl absolute bottom-2 right-2 
                    ${status==='Pending'?'cursor-pointer text-[#cba01d] hover:text-[#8f7118]':'cursor-not-allowed text-[#8f7118]'}
                    `} onClick={()=>handleStatus(id)} />
                </div>
        </div>
    )
}


