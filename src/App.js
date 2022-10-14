
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './pages/Auth/SignUp';
import Todo from './pages/Todo/Todo';


function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
