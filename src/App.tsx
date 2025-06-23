import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Test from "./pages/test.tsx";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/test" element={<Test />}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
