import { useEffect, useState } from "react";
import axios from "axios";
import UpdateModal from "./components/UpdateModal";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // { _id, title, content }

  let fetchData = async () => {
    let res = await axios.get("https://task-manager-vscs.onrender.com/api/tasks");
    console.log(res.data.tasks);
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const content = e.target.elements.content.value;

    axios
      .post("https://task-manager-vscs.onrender.com/api/tasks", { title, content })
      .then((res) => {
        console.log(res.data);
        fetchData();
        e.target.reset();
      });
  }

  function deleteHandler(taskID) {
    axios.delete(`https://task-manager-vscs.onrender.com/${taskID}`).then((res) => {
      console.log(res.data);
      fetchData();
    });
  }

  // Opens the modal and stores which task is being edited
  function openUpdateModal(task) {  //2⬅️
    setSelectedTask(task);  // null se entire task object (_id, title, content) is passed
    setIsModalOpen(true);   // false se true - show the modal
  }

  // Called by UpdateModal on submit — sends title + content to PATCH endpoint
  function updateHandler({ title, content }) {  //5⬅️
    axios
      .patch(`https://task-manager-vscs.onrender.com/${selectedTask._id}`, {
        title,
        content,
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
        setIsModalOpen(false);
        setSelectedTask(null);
      });
  }

  let renderData = <p className="no-task">Task List Empty..</p>;

  if (tasks.length > 0) {
    renderData = tasks.map((elem, idx) => {
      return (
        <div className="task" key={idx}>
          <h2>{elem.title}</h2>
          <p>{elem.content}</p>
          <div className="btns">
            
            {/* Delete Button */}
            <button
              className="delete-btn"
              onClick={() => deleteHandler(elem._id)}
            >
              Delete Task
            </button>
            {/* Update Button */}
            <button
              className="update-btn"
              onClick={() => openUpdateModal(elem)} //1⬅️
            >
              Update
            </button>

          </div>
        </div>
      );
    });
  }

  return (
    <>
      <form className="task-form" onSubmit={submitHandler}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="content" type="text" placeholder="Enter content details" />
        <button type="submit">Create Note</button>
      </form>

      <div className="tasks">{renderData}</div>

      {/* Update Modal */}
      <UpdateModal  
        isOpen={isModalOpen}  //3⬅️
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={updateHandler}
        currentTask={selectedTask}  //currentTask carries the existing title & content into the modal so the inputs come pre-filled — not empty.
      />
    </>
  );
};

export default App;