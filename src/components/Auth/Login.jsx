import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/CORPACAM.png";
import { useState } from "react";
import md5 from "md5";
// import { useNavigate } from "react-router-dom";

export default function Login() {
  // const usenavigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    loading: false,
  });

  const url = "https://apiproyectosdesarrollo.corpacam.com.gt";
  const fetchData = async (user, pass) => {
    const Method = "/api/Login";

    const respon = await fetch(url + Method, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: md5(pass).toUpperCase(),
        // username: "ADMINISTRADOR",
        // password: "202CB962AC59075B964B07152D234B70",
        nombreApp: "CPR",
      }),
    });
    let data = await respon.json();
    data = JSON.parse(data);

    if (data.msg != null) {
      console.log(data.msg);
      toast.error(data.msg, {
        theme: "colored",
      });
    } else {
      // usenavigate("/Dashboard");
      window.location.href = "/";
      console.log(data["access_token"]);
      localStorage.setItem("NO_CIA", data.no_cia);
      localStorage.setItem("accessToken", data["access_token"]);
      localStorage.setItem("USERS", data.usuario);
      localStorage.setItem("NO_CIA",data.no_cia);
    }
  };

  const enviarDatos = async (e) => {
    e.preventDefault();

    let inputName = form.username;
    let inputPass = form.password;

    let result = true;
    if (!inputName.trim() || !inputPass.trim()) {
      result = false;
      console.log("no hay datos");
      toast.error("Campos Obligatorios", {
        theme: "colored",
      });
    } else {
      setForm({ ...form, loading: true });
      fetchData(inputName, inputPass);
    }
    return result;
  };

  return (
    <section className="sect">
      {/* <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div> */}
      <div className="formu">
        <img src={logo} alt="Descripción de la imagen" />
        <form onSubmit={enviarDatos}>
          <label>
            <span className="spUser"> Usuario:</span>

            <input
              className="form-control InptText"
              type="text"
              value={form.username}
              name="username"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
            <i className="fas fa-user icnos" style={{ margin: "0 5px" }}></i>
          </label>
          <br />
          <label>
            <span className="spPass">Contraseña:</span>
            <input
              className="form-control inptpassword"
              type="password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
            <i className="fas fa-lock icnos" style={{ margin: "0 5px" }}></i>
            <i className="fas fa-eye-slash iconVer"></i>
          </label>
          <br />
          <button
            className="btn btn-success w-100 botonSess"
            type="submit"
            disabled={form.loading}
          >
            {form.loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />&nbsp;          {"Iniciando Session..."}
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
