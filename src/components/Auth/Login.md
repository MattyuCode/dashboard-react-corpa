import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/CORPACAM.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const usenavigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const fetchData = async (user, pass) => {
    const url = "https://apiproyectosdesarrollo.corpacam.com.gt/api/Login";
    const respon = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: pass,
        // username: "ADMINISTRADOR",
        // password: "202CB962AC59075B964B07152D234B70",
        nombreApp: "CPR",
      }),
    });
    let data = await respon.json();

    // console.log(typeof data);
    // let arr;
    // if(typeof data === 'object'){
    //   arr = data[0];
    // }
    // console.log(arr['msg']);
    // console.log(data);

    data = JSON.parse(data);

    if (data.msg != null) {
      console.log(data.msg);
      toast.error(data.msg, {
        theme: "colored",
      });
    } else {
      usenavigate("/Dashboard");
      console.log(data["access_token"]);
    }

    // if(data["access_token"]){
    //   usenavigate("/Dashboard");
    // // console.log("Autenticado");
    //}
    // console.log(data);
  };

  // const handleInputChange = (event) => {
  //   setForm({
  //     ...form,
  //     [event.target.name]: event.target.value,
  //   });
  // };

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
      fetchData(inputName, inputPass);
      //if (
      //form.username === "ADMINISTRADOR" &&  form.password === "202CB962AC59075B964B07152D234B70"      ) {
      //console.log("Funcionando");
      //fetchData();
      //usenavigate("/Dashboard");
      // } else {
      //   console.log("Nombre de usuario o contraseña incorrectos");
      //   toast.error("Nombre de usuario o contraseña incorrectos", {
      //     theme: "colored",
      //   });
      // }
    }
    // if (form.password === "" || form.password === null) {
    //   result = false;
    //   toast.warn("Campos Obligatorios", {
    //     theme: "colored",
    //   });
    // }
    return result;
  };

  return (
    <section className="sect">
      <div className="formu">
        <img src={logo} alt="Descripción de la imagen" />
        <form onSubmit={enviarDatos}>
          <label>
            <span> Usuario:</span>

            <input
              className="form-control"
              type="text"
              value={form.username}
              name="username"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
                // console.log("Input de usuario:", e.target.value);
              }}
              // ref={register({
              //   required: true,
              //   message: "Please enter"
              // })}

              // onChange={handleInputChange}
            />
            {/* <span className="text-danger text-small d-block mb-2">
              {errors?.email?.message}
            </span> */}
            <i className="fas fa-user icnos"></i>
          </label>
          <br />
          <label>
            <span>Contraseña:</span>
            <input
              className="form-control"
              type="password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                // console.log("Input de contrase:", e.target.value);
              }}
              // onChange={(e) => setPassword(e.target.value)}
            />
            {/* <i className="far fa-eye "></i> */}
            <i className="fas fa-lock icnos"></i>
            <i className="fas fa-eye-slash iconVer"></i>
          </label>
          <br />
          <button className="btn btn-primary w-100" type="submit">
            Iniciar Sesión
          </button>
        </form>
        {/* {isLoading && (
          <div className="loading">
            <i className="fas fa-circle-notch fa-spin"></i>
            <span>Cargando...</span>
          </div>
        )} */}

        {/* {error && (
          <div className="error">
            <i className="fas fa-exclamation-triangle"></i>
            <span>{error}</span>
          </div>
        )} */}
      </div>
      <ToastContainer />
    </section>
  );
}

// export default 