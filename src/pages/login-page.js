import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-page.css";
import Header from "../components/header";
import ButtonComponent from "../meterial-ui-components/Button/ButtonComponent";
import { CircularProgress, FormControl, TextField } from "@mui/material";
import isEmail from "validator/lib/isEmail";
import { create } from "../utils/axios-utils";
import { urlRoutes } from "../constants";
const LoginPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const [wrongPassword, setWrongPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  const onClickDontHaveAnAccount = useCallback(() => {
    navigate(urlRoutes.signupPage);
  }, [navigate]);

  const checkDetails = async (e = null) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    const resp = await create("auth/login", formData);
    console.log(resp);
    if (resp.status === "ERROR") {
      setWrongPassword("Email and Password do not match");
    } else if (resp.status === "SUCCESS") {
      const token = resp.data.token;
      localStorage.setItem("accessToken", token);
      navigate(urlRoutes.loggedInLandingLoansList);
    }
    setLoading(false);
  };

  return (
    <div className="loginpage">
      <Header isUserLoggedIn={false} />
      <form className="log-in1" onSubmit={(e) => checkDetails(e)}>
        <div className="logo12">
          <img
            className="black-and-white-collection-15"
            alt=""
            src="/black-and-white-collection-15.svg"
          />
          <div className="lendme">LendMe</div>
        </div>
        <div className="header7">
          <b className="keep-me-signed">Login</b>
          <div className="subtitle14">
            Welcome back. Enter your credentials to access your account
          </div>
        </div>
        <FormControl className="email6">
          <TextField
            className="bar4"
            color="primary"
            variant="outlined"
            type="email"
            name="email"
            id="email"
            label="Email Address"
            placeholder="Enter email"
            required
            size="medium"
            margin="none"
            value={formData.email}
            onChange={(e) => {
              const val = e.target.value;
              if (isEmail(val)) {
                setValidEmail(true);
              } else {
                setValidEmail(false);
              }

              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </FormControl>
        <div className="sub-label invalid-email">
          {validEmail ? " " : "Incorrect Email"}
        </div>
        <div className="email6">
          <FormControl className="email6">
            <div className="label24">
              <div className="left-text"></div>
              <b className="forgot-password">Forgot Password</b>
            </div>
            <TextField
              className="bar4"
              color="primary"
              variant="outlined"
              defaultValue="password"
              type="password"
              name="password"
              id="password"
              label="Password"
              placeholder="Enter Password"
              size="medium"
              margin="none"
              required
              value={formData.password}
              onChange={(e) => {
                setWrongPassword("");
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </FormControl>
          <div className="sub-label">{wrongPassword ? wrongPassword : " "}</div>
        </div>
        <ButtonComponent
          className="cta14"
          buttonText={
            loading ? (
              <CircularProgress
                style={{ color: "white", width: "30px", height: "30px" }}
              />
            ) : (
              "Continue"
            )
          }
        />
        <div className="bottom4">
          <div className="dont-have-an-container">
            <span>{`Don’t have an Account? `}</span>
            <b className="sign-up-here" onClick={onClickDontHaveAnAccount}>
              Sign up here
            </b>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
