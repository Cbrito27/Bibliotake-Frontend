import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import eyeOpen from "../../assets/iconos/eyeOpen.svg";
import eyeClose from "../../assets/iconos/eyeClose.svg";
import { loginService } from "../../services/auth.services";
import RegisterForm from "../RegisterForm/RegisterForm";

const LoginForm = ({ onClose }) => {
  const [fgPwModal, setFgPwModal] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false); // Nuevo estado

  const trueLogin = useNavigate();

  const authentication = async (e) => {
    e.preventDefault();
    if (!email || !pw) {
      setEmptyFields(true);
      return;
    }
    try {
      const response = await loginService(email, pw);
      if (response.error !== 404) {
        onClose();
        trueLogin("/");
      } else {
        setErrorLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tooglePw = () => {
    setShowPw(!showPw);
  };

  const handleCerrarClick = () => {
    onClose();
  };

  const showRegisterFormHandler = () => {
    setShowRegisterForm(true);
  };

  return (
    <div className="login">
      <div className="content">
        <button className="close" onClick={handleCerrarClick}>
          x
        </button>
        {showRegisterForm ? null : (
          <div className="loginIntro">
            <h1>Ingresar</h1>
          </div>
        )}

        {showRegisterForm ? (
          <RegisterForm onClose={() => setShowRegisterForm(false)} />
        ) : (
          <form onSubmit={authentication}>
            <div className="password-container">
              <label htmlFor="usuario">Correo electrónico</label>
              <input
                type="email"
                name="usuario"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Contraseña</label>
              <div className="password-input-container">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  onChange={(e) => setPw(e.target.value)}
                />
                <span onClick={tooglePw} className="eye-icon">
                  {showPw ? (
                    <img src={eyeClose} alt="Close Eye" />
                  ) : (
                    <img src={eyeOpen} alt="Open Eye" />
                  )}
                </span>
              </div>
            </div>
            {errorLogin ? (
              <p className="errorMsn">
                El usuario o contraseña son incorrectos
              </p>
            ) : (
              ""
            )}
            {emptyFields ? (
              <p className="errorMsn">
                Hay campos incompletos, revisa tu usuario o contraseña
              </p>
            ) : (
              ""
            )}
            <button type="submit">Ingresar</button>
            <p>
              ¿Aun no estas registrado? Haz click aquí para {""}
              <a className="registrarse" onClick={showRegisterFormHandler}>
                registrarte
              </a>
            </p>
            {/* <button className="registrarse" onClick={showRegisterFormHandler}>
              Registrarse
            </button> */}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
