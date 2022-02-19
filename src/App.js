import { useState } from 'react';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

import './App.css';
import tasks from './data/tasks';

const transformedTaskOptions = tasks.map(task => ({
  value: task.id,
  label: task.title,
  ...task,
}));

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

function App() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [remainingTasks, setRemainingTasks] = useState(tasks);
  const [difficultyLevelsCount, setDifficultyLevelsCount] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const removeFromSelectedTasks = (task) => {
    const newSelectedTasks = selectedTasks.filter(selectedTask => selectedTask.id !== task.id);

    setSelectedTasks(newSelectedTasks);
    setRemainingTasks([...remainingTasks, task]);

    countDifficultyLevels(newSelectedTasks, setDifficultyLevelsCount);
  }

  const handleChange = (e) => {
    const { value } = e.target;

    const selectedTask = transformedTaskOptions.find(
      task => task.value === parseInt(value)
    );

    setSelectedTasks([...selectedTasks, selectedTask]);
    setRemainingTasks(
      remainingTasks.filter(task => task.id !== selectedTask.value)
    );

    countDifficultyLevels([...selectedTasks, selectedTask], setDifficultyLevelsCount);
  };

  return (
    <div className="App">
      <select onChange={handleChange} defaultValue="select">
        <option value="select" disabled>Select a task</option>
        {remainingTasks.map(task => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      <section className="container">
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

          <button className={`publish ${selectedTasks.length === 0 ? 'disabled' : ''}`} disabled={selectedTasks.length === 0}>Publish</button>
        </aside>
      </section>
    </div>
  );
}

export default App;
