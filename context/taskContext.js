import { createContext,useContext, useState } from "react";
import {v4} from 'uuid';
export const TaskContext=createContext();
export const useTasks=()=> {return useContext(TaskContext)};
export const TaskProvider=({children})=>{
    const [tasks,setTasks]=useState([{id:'1',name:'Taks 1',description:'something'}]);

    const createTask=(title,description)=>{
        setTasks([...tasks,{id:v4(),title,description}]);
    }
    const updateTask=(id,updatedTask)=>{
        setTasks([...tasks.map(task=>task.id==id?{...task,...updatedTask}:task)]);
    }
    const deleteTask=(id)=>{
        setTasks([...tasks.filter(task=>task.id!==id)]);
    }
    return(
        <TaskContext.Provider value={{tasks,createTask,updateTask,deleteTask}}>
            {children}
        </TaskContext.Provider>
    )
}