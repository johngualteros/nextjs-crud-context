import { useState,useEffect} from "react";
import { Layout } from "../components/Layout";
import { useTasks } from "../context/taskContext";
import  {useRouter} from 'next/router';
function TaskFormPage() {
    const{createTask,updateTask,tasks}=useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const {push,query}=useRouter();
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!query.id){
        createTask(task.title, task.description);
    }else{
        updateTask(query.id,task);
    }
    push('/');
  }
    useEffect(()=>{
        if(query.id){
            const taskFound=tasks.find(task=>task.id===query.id);
            setTask({
                title:taskFound.title,
                description:taskFound.description
            });
        }
    },[tasks,query.id]);
  return (
    <Layout title="add Task">
      <h1 className="text-center text-6xl text-gray-400 font-extrabold">
        {query.id?'Edit Task':'Add Task'}
      </h1>
      <form className="w-4/12 mx-auto my-12" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="task title"
          name="title"
          className="bg-slate-900 my-3 w-full outline-none text-white py-1 px-2 border-white border-2 rounded-md focus:border-lime-400"
          onChange={handleChange}
          value={task.title}
        />
        <textarea
          placeholder="task description"
          name="description"
          rows="3"
          className="bg-slate-900 my-3 w-full outline-none text-white py-1 px-2 border-white border-2 rounded-md focus:border-lime-400"
          onChange={handleChange}
          value={task.description}
        ></textarea>
        <button className="bg-lime-400 py-2 px-4 rounded-md shadow-md hover:bg-lime-500 text-black font-bold w-full disabled:opacity-50">
          Save
        </button>
      </form>
    </Layout>
  );
}

export default TaskFormPage;
