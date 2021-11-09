import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
