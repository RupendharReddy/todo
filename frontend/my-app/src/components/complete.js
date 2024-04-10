import React, { useState, useEffect } from "react";
import "./components.css";
import axios from "../axios";
import relax from "../icons/addtask.gif";
export default function Complete() {
  const [data, setData] = useState([]);
  const handleDelete = async (index) => {
    try {
      const response = await axios.get("/delete", {
        params: {
          taskname: data[index].taskname,
          status: "completed",
        },
      });
      console.log(response);
      fetchData();
    } catch (error) {
      console.log("error in catch handleDelete");
    }
  };

  const fetchData = async () => {
    console.log("completed page ------------");
    axios
      .get("/show", {
        params: { status: "completed" },
      })
      .then((response) => {
        const { is_success, data, error } = response.data;
        if (is_success) {
          setData(data);
          console.log(data);
        } else {
          setData([]);
          if (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="content">
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
      {!data.length && (
        <div className="relax"> 
          <img src={relax} alt="relax" />
          <h1>No Completed Tasks</h1>
        </div>
      )}
    </>
  );
}
