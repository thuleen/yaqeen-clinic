import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DengueState } from "../redux-saga/store";
import { logout } from "../app/redux-saga/actions";
import Menubar from "../common/components/menubar";
import StepsForm from "./forms/StepsForm";
import { DengueSample } from "./redux-saga/payload-type";
import { backStep } from "../app/redux-saga/actions";

type DengueFormProps = {
  sample?: DengueSample;
};

const DengueForm = (props: DengueFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  const handleNew = () => {
    navigate("/");
  };
  const { activeSample } = useSelector((state: DengueState) => state.dengue);
  const onBack = (sample: DengueSample) => dispatch(backStep(sample));

  if (!activeSample) {
    return (
      <div>
        <Menubar handleNew={handleNew} handleLogout={handleLogout} />
        <div>No sample created</div>
      </div>
    );
  }

  const handleBack = () => {
    onBack(activeSample);
  };

  return (
    <div>
      <Menubar handleNew={handleNew} handleLogout={handleLogout} />
      <StepsForm sample={activeSample} handleBack={handleBack} />
    </div>
  );
};
export default DengueForm;