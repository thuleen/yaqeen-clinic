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
import StartPage from "./StartPage";
import DengueForm from "../dengue-testkit/DengueForm";
import EditForm from "../common/components/samples/Edit";
import SampleList from "../common/components/samples/List";
import LogSignForm from "../common/components/login/";
import { AppState } from "../redux-saga/store";
import { init } from "../redux-saga/actions";

type HomeProps = {
  toggleHome: () => void;
  toggleUpdate: () => void;
  initialised: boolean;
};

const Home = (props: HomeProps) => {
  const { toggleHome, toggleUpdate, initialised } = props;

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ marginBottom: "15rem" }}>
          <img src={logo} className="App-logo" />
          <Typography variant="body1" className="App-subheader">
            "keep evidence gathering & facts organised"
          </Typography>
          <div style={{ marginTop: "0.5rem" }}>
            <LogSignForm />
          </div>
        </div>
        <div
          style={{
            color: "white",
          }}
        >
          {initialised ? null : (
            <Typography variant="caption" color="error">
              API error&nbsp;
            </Typography>
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
  const { clinic, initialised } = useSelector((state: AppState) => state.app);
  const dispatch = useDispatch();
  const handleInit = () => dispatch(init());

  useEffect(() => {
    handleInit();
  }, []);

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

  if (clinic) {
    return (
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/edit/:tagNo" element={<EditForm />} />
        <Route path="/samples" element={<SampleList />} />
        <Route path="/dengue" element={<DengueForm />} />
      </Routes>
    );
  }

  return (
    <Home
      initialised={initialised}
      toggleHome={toggleHome}
      toggleUpdate={toggleUpdate}
    />
  );
}

export default App;
