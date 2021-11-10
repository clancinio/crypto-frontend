import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import TopCoinsContainer from "./containers/TopCoinsContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeContainer />} />
        <Route exact path="/top" element={<TopCoinsContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
