import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import './App.css'
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import Footer from "./components/Footer";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
