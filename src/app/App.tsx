import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import RedoIcon from "@mui/icons-material/Redo";
import Typography from "@mui/material/Typography";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/img/yaqeen-logo.png";
import "./App.css";
import Menubar from "../common/components/menubar";
import StartPage from "./StartPage";
import DenguePage from "../dengue-testkit/DenguePage";
import EditPage from "../common/components/samples/EditPage";
import SamplesPage from "../common/components/samples/SamplesPage";
import LogSignForm from "../common/components/login/";
import UserPage from "../common/components/user/UserPage";
import { AppState } from "../store";
import * as actionsApp from "../common/redux-saga/actions";
import * as actionsDengue from "../dengue-testkit/redux-saga/actions";

type HomeProps = {
  toggleHome: () => void;
  toggleUpdate: () => void;
  initialised: boolean;
  errMsg: string | null;
};

const Home = (props: HomeProps) => {
  const { toggleHome, toggleUpdate, initialised, errMsg } = props;

  return (
    <div className="App">
      {errMsg ? errMsg : null}
      <header className="App-header">
        <div style={{ marginBottom: "3rem" }}>
          <img src={logo} className="App-logo" />
          <Typography variant="body1" className="App-subheader">
            "keep evidence gathering & facts organised"
          </Typography>
          <div style={{ marginTop: "0rem" }}>
            <LogSignForm />
          </div>
        </div>
        <div
          style={{
            color: "white",
          }}
        >
          {initialised ? null : (
            <Typography variant="caption">API disconnected &nbsp;</Typography>
          )}

          <Typography variant="caption">
            Version. {import.meta.env.VITE_APP_VERSION}
          </Typography>
          <IconButton onClick={toggleUpdate}>
            <RedoIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </header>
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  const { clinic, initialised, errMsg } = useSelector(
    (state: AppState) => state.app
  );
  const dispatch = useDispatch();
  const handleInit = () => dispatch(actionsApp.init());
  const handleLogout = () => dispatch(actionsApp.logout());
  const createNewSample = () => dispatch(actionsDengue.createSample());

  useEffect(() => {
    handleInit();
  }, []);

  const handleNew = () => {
    createNewSample();
    navigate("/dengue");
  };

  const toggleHome = () => {
    navigate("/");
  };

  const toggleUpdate = () => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
        window.location.reload();
      });
    }
  };

  if (!clinic) {
    return (
      <Home
        initialised={initialised}
        toggleHome={toggleHome}
        toggleUpdate={toggleUpdate}
        errMsg={errMsg}
      />
    );
  }

  return (
    <>
      <Menubar handleNew={handleNew} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<StartPage handleNew={handleNew} />} />
        <Route path="/edit/:tagNo" element={<EditPage />} />
        <Route path="/samples" element={<SamplesPage />} />
        <Route path="/dengue" element={<DenguePage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
