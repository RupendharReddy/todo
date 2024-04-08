import React, { useState, useEffect } from 'react';
import './components.css';
import axios from 'axios';

export default function Complete() {
  const [data, setData] = useState([]);

  const handleDelete = async(index)=>{
    try {
      const response = axios.get("http://localhost:8080/delete",{
        params:{
          id:1,
          taskname:data[index].taskname,
          status:"completed"
        }
      })
      fetchData();
    } catch (error) {
      console.log("error in handledata in complete data");
    }
  }

  const fetchData=async()=>{
    try {
      const response = await axios.get("http://localhost:8080/show", {
        params: {
          id: 1,
          status: "completed"
        }
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log("error in catch completed useEffect", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='content'>
      {data?.map((taskItem, index) => (
        <div className="task-item" key={index}>
          <div className="task-content">
            {taskItem && taskItem.taskname ? (
              <h2>{taskItem.taskname}</h2>
            ) : null}
            {taskItem && taskItem.description ? (
              <p>{taskItem.description}</p>
            ) : null}
          </div>
          <div className="task-actions">
            {/* <button
              className="completed-button"
              onClick={() => handleComplete(index)}
            >
              <i className="fas fa-check"></i>
            </button> */}
            <button
              className="delete-button"
              onClick={() => handleDelete(index)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
