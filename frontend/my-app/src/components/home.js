import "./components.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import boy from "../icons/boy-avatar.png";
import addyourtask from "../icons/relax.gif";

export default function Home() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const navigation = useNavigate();
  const [provalue, setProvalue] = useState();
  const [username, setUsername] = useState("");
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
    
    axios
    .post("/addtask", {
      taskname: task,
      description: description,
      })
      .then((response) => {
        const { is_success, data, error } = response.data;
        if (is_success) {
          console.log("data usestate", data); // Update the data state with the new task
          fetchData();
          handlecount();
        } else {
          alert(error);
        }
      });
      e.target.task.value = "";
      e.target.description.value = "";
      
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
  };
  const handlecount = async () => {
    try {
      
      axios
      .get("/count", {
        params: {
          status: "completed",
        },
      })
      .then((response) => {
        const { username, count } = response.data;
        if (username) {
          setUsername(username);
        }
        if (count) {
          setCount(count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProvalue((count / (data.length + count)) * 100);
  }, [data, count]);

  useEffect(() => {
    if (!window.localStorage.getItem("mytoken")) {
      navigation("/");
    }
    fetchData();
    handlecount();
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
        {!data.length && (
          <div className="addyourtask">
            <img src={addyourtask} alt="addyourtask" />
            <h1>No Pending Tasks</h1>
          </div>
        )}{" "}
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
          
          <h2
            style={{
              margin:"5px auto",
              display: "flex",
              justifyContent: "space-around",
              alignContent: "center",
              textTransform: "capitalize",
              paddingRight: "30px",
            }}
          >
            <b>{username}</b>{" "}
          </h2>
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
            <progress value={provalue} max={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
