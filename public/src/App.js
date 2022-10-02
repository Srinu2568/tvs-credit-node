import { Provider } from "react-redux";

// our imports
import store from "./store/store";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./components/login/signIn.js";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import Dashboard from "./components/dashboard/dashboard";
import SignUp from "./components/signUp/SignUp";
import ResetPassword from "./components/reset-password/ResetPassword";
import GetMagicLogin from "./components/GetMagicLogin/GetMagicLogin";
import MagicLogin from "./components/MagicLogin/MagicLogin";
import ConformAccount from "./components/ConformAccount/conformAccount";
import UsedCarForm from "./components/usedCarFormComps/usedCarForm/usedCarForm";
import EvalDashboard from "./components/EvaluatorComps/dashboard/dashboard";
import EvaluateVehicle from "./components/EvaluatorComps/EvaluateVehicle/evaluatevehicle";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" exact element={<SignIn title="Sign in" />} />
        <Route path="/signup" exact element={<SignUp title="Sign Up" />} />
        <Route
          path="/forgot-password"
          exact
          element={<ForgotPassword title="Forgot Password" />}
        />
        <Route
          path="/conform-account"
          exact
          element={<ConformAccount title="Conform Account" />}
        />
        <Route
          path="/password-reset"
          exact
          element={<ResetPassword title="Password Reset" />}
        ></Route>
        <Route
          path="/get-ml"
          exact
          element={<GetMagicLogin title="Login with email" />}
        ></Route>
        <Route
          path="/magic-login"
          exact
          element={<MagicLogin title="Magic Login" />}
        ></Route>
        <Route
          path="/dashboard"
          exact
          element={<Dashboard title="Dashboard" />}
        />
        <Route
          path="/uc-form"
          exact
          element={<UsedCarForm title="Used car Form" />}
        />
        <Route
          path="/eval-dashboard"
          exact
          element={<EvalDashboard title="Evaluator Dashboard" />}
        />
        <Route
          path="/eval-vehicle/:id"
          exact
          element={<EvaluateVehicle title="vehicle Evaluation" />}
        />
      </Routes>
    </Provider>
  );
}

export default App;
