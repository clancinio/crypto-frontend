import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import TopCoinsContainer from "./containers/TopCoinsContainer";
import TopNav from "./components/navbar/TopNav";
import { useState } from "react";
import LoginContainer from "./containers/LoginContainer";
function App() {
  // State for holding Total capital - temporary until the backend is ready
  const [balance, setBalance] = useState(1500);
  // Is user logged in
  const [isLoggedIn, setisLoggedIn] = useState(true);
  return (
    <Router>
      <TopNav
        balance={balance}
        setBalance={setBalance}
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        <Route exact path="/" element={<HomeContainer balance={balance} />} />
        <Route exact path="/top" element={<TopCoinsContainer />} />
        <Route
          exact
          path="/login"
          element={<LoginContainer setisLoggedIn={setisLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
