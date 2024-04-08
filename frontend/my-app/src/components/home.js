import "./components.css";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import boy from "../icons/boy-avatar.png";
import girl from "../icons/girl-avatar.png";

export default function Home() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [provalue, setProvalue] = useState();
  // const [add, setAdd] = useState({
  //   task: "",
  //   description: "",
  // });

  // const onchange = (e) => {
  //   setAdd({ ...add, [e.target.name]: e.target.value });
  // };

  const onsubmit = async (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const description = e.target.description.value;

    axios.post("/addtask", {
      
      taskname: task,
      description: description,
    }).then((response) => {
      const {is_success, data, error}=response.data
      if(is_success){
        console.log("data usestate", data); // Update the data state with the new task
        fetchData();
      }
      else{
        alert(error)
      }
    });
  };

  const fetchData = async () => {
    axios
      .get("/show", {
        params: { status: "pending" },
      })
      .then((response) => {
        const { is_success, data, error } = response.data;
        if (is_success) {
          setData(data);
        } else {
          setData([]);
        }
      });
  };

  const handleComplete = async (index) => {
    // const id:0;
    // const taskname=data[index].taskname;
    try {
      const response = await axios.get("/completed", {
        params: {
          taskname: data[index].taskname,
        },
      });
      console.log(response);
      // alert(response);
      fetchData();
      handlecount();
    } catch (error) {
      console.log("error in catch of handleComplete ");
    }
  };

  const handleDelete = async (index) => {
    // console.log(data[index].taskname);
    // const ind = data[index].taskname;
    try {
      const response = await axios.get("/delete", {
        params: {
          taskname: data[index].taskname,
          status: "pending",
        },
      });
      console.log(response);
      // alert(response);
      fetchData();
      handlecount();
    } catch (error) {
      console.log("error in catch handleDelete");
    }
    // const newData = [...data.slice(0, index), ...data.slice(index + 1)];
    // setData(newData);
  };
  const handlecount =  () => {
    // const countresponse;
    axios
      .get("/count", {
        params: {
          status: "completed",
        },
      })
      .then((response) => {
        // const sum = data.length + response.data[0].count;
        // setCount(response.data[0].count);
        // setProvalue(response.data[0].count / sum);
        // console.log(provalue, "pro val");
        // console.log(count, "count data");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const [flag,setFlag]=useState(true);
  useEffect(() => {
    handlecount();
    fetchData();
  }, []);

  return (
    <div className="content">
      <div className="taskdiv">
        <div className="taskform">
          <div className="form-container">
            <form onSubmit={onsubmit}>
              <br />
              <div className="input-group">
                <label htmlFor="task">Title:</label>
                <input
                  type="text"
                  name="task"
                  id="task"
                  required={true}
                  // value={data.task}
                  // onChange={onchange}
                  placeholder="Enter task title"
                />
              </div>
              <div className="input-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  // required={true}
                  // value={data.description}
                  // onChange={onchange}
                  placeholder="Describe the task"
                />
              </div>
              <div className="taskbtn">
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
        <div className="taskdata">
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
                <button
                  className="completed-button"
                  onClick={() => handleComplete(index)}
                >
                  <i className="fas fa-check"></i>
                </button>
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
      </div>
      <div className="prodiv">
        <div className="pro-content">
          <img src={boy} alt="boy png" />
          <br />
          <br />
          <h2>
            Progress : <b>Good</b>{" "}
          </h2>
          <h2>
            Pending Tasks: <b>{data.length}</b>{" "}
          </h2>
          <h2>
            Completed Tasks: <b>{count}</b>{" "}
          </h2>
          <div className="progress">
            <progress value={provalue} />
          </div>
        </div>
      </div>
    </div>
  );
}
