import { useState, useEffect, useCallback } from 'react';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import Loader from './Loader';

const countDifficultyLevels = (selectedTasks, setDifficultyLevelsCount) => {
  const counts = {
    easy: 0,
    medium: 0,
    hard: 0,
  };

  selectedTasks.forEach(task => {
    counts[task.difficulty] += 1;
  });

  setDifficultyLevelsCount(counts);
}

const transformTasks = (tasks) => tasks.map(task => ({
  ...task,
  id: task._id.$oid
}))


function App() {
  const [task, setTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [remainingTasks, setRemainingTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [difficultyLevelsCount, setDifficultyLevelsCount] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-pmrso/endpoint/allQuestions');
      const data = await response.json();
      const transformedData = transformTasks(data)
      setAllTasks(transformedData);
      setRemainingTasks(transformedData);

      setLoading(false);
    })()
  }, []);

  console.log(remainingTasks);

  const removeFromSelectedTasks = (task) => {
    const newSelectedTasks = selectedTasks.filter(selectedTask => selectedTask.id !== task.id);

    setSelectedTasks(newSelectedTasks);
    setRemainingTasks([...remainingTasks, task]);

    countDifficultyLevels(newSelectedTasks, setDifficultyLevelsCount);
  }

  const publish = async () => {
    setLoading(true);
    const response = await fetch(
      'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-pmrso/endpoint/assesment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tasks: selectedTasks,
      }),
    })
    const data = await response.json();
    setId(data.$oid);
    setLoading(false);
    setShow(true);
  }

  const closeModal = useCallback(() => setShow(false), [])

  const handleChange = (e) => {
    const { value } = e.target;
    setTask(value);

    const selectedTask = allTasks.find(
      task => task.id === value
    );

    setSelectedTasks([...selectedTasks, selectedTask]);
    setRemainingTasks(
      remainingTasks.filter(task => task.id !== selectedTask.value)
    );

    countDifficultyLevels([...selectedTasks, selectedTask], setDifficultyLevelsCount);
  };

  return (
    <div className="App">
      <select onChange={handleChange} defaultValue="select" value={task}>
        <option value="select" disabled>Select a task</option>
        {remainingTasks.map(task => {
          const isOptionDisabled = selectedTasks.some(selectedTask => selectedTask.id === task.id);

          return (
            <option key={task.id} value={task.id} disabled={isOptionDisabled}>
              {task.title}
            </option>
          )
        })}
      </select>

      <section className="cont">
        <section className="selected-tasks">
          {selectedTasks.length === 0
            ? <h3 className="no-task">No task selected</h3>
            : selectedTasks.map(task => (
              <div key={task.id} className="task">
                <div className="info">
                  <div className="text">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>

                  <button type='button' onClick={() => removeFromSelectedTasks(task)}>Remove</button>
                </div>
                <AceEditor
                  placeholder="Placeholder Text"
                  mode="javascript"
                  theme="monokai"
                  name="blah2"
                  fontSize={14}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={`//${task.title}\n//${task.description}\n${task.code}`}
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 4,
                    readOnly: true,
                  }} />
              </div>
            ))}
        </section>
        <aside className="difficulty-levels">
          <h3>Difficulty levels</h3>
          <p>Easy: {difficultyLevelsCount.easy}</p>
          <p>Medium: {difficultyLevelsCount.medium}</p>
          <p>Hard: {difficultyLevelsCount.hard}</p>

          <button
            className={`publish ${selectedTasks.length === 0 ? 'disabled' : ''}`}
            disabled={selectedTasks.length === 0 || loading}
            onClick={publish}
          >
            {loading ? <Loader /> : 'Publish'}
          </button>
        </aside>
      </section>
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Task link:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Copy this link and share it with candidates:
          <br />
          <br />
          <pre>https://someurl.com/task/{id}</pre>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
