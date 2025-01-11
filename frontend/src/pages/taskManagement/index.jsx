import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../Components/molecules/Footer";
import Navbar from "../../Components/molecules/Navbar";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", description: "", status: "Not Completed" });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/pets");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();  
    if (!newTask.name || !newTask.description) return;
    try {
      await axios.post("http://localhost:5000/pets", newTask);
      setNewTask({ name: "", description: "", status: "Not Completed" });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/pets/${id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error editing task", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/pets/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const toggleCompletion = async (id, status) => {
    const updatedTask = { ...tasks.find((task) => task.id === id), status };
    try {
      await axios.put(`http://localhost:5000/pets/${id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error toggling completion", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.status === "Completed";
    if (filter === "Not Completed") return task.status === "Not Completed";
    return true;
  });

  return (
    <section className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">Task Management Dashboard</h1>
        <form onSubmit={addTask} className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-6 sm:space-y-0">
            <input
              type="text"
              placeholder="Task Name"
              className="w-full sm:w-1/3 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full sm:w-1/3 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 border-2 border-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
        <div className="mb-6 flex justify-center space-x-6">
          <button
            onClick={() => setFilter("All")}
            className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300 border-2 border-gray-600"
          >
            All
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 border-2 border-green-600"
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("Not Completed")}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300 border-2 border-red-600"
          >
            Not Completed
          </button>
        </div>
        <div className="space-y-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-2 border-gray-300"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">{task.name}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500 mt-2">Status: <span className={`text-${task.status === "Completed" ? "green" : "red"}-600`}>{task.status}</span></p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() =>
                    toggleCompletion(
                      task.id,
                      task.status === "Completed" ? "Not Completed" : "Completed"
                    )
                  }
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300 border-2 border-yellow-500"
                >
                  {task.status === "Completed" ? "Mark as Not Completed" : "Mark as Completed"}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 border-2 border-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default TaskManagement;
