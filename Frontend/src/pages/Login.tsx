//import {react} from "react"
import { useState } from "react";
//import { Formik } from "formik";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/auth/");
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "30%",
            height: "200px",
            padding: "15px",
            border: "1px solid black",
          }}
        >
          <label className="" style={{}}>
            Enter your Email
          </label>
          <input
            className=""
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Enter your Password</label>
          <input
            className=""
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleLogin()}
            style={{ padding: "8px 0px", fontWeight: "bold", fontSize: "16px" }}
          >
            Login
          </button>
          <a style={{ alignSelf: "center", color: "blue" }}>
            {" "}
            forget password?
          </a>
        </div>

        <p>
          {Email} and {Password}
        </p>
        <p>{message}</p>
      </div>
    </>
  );
}
export default Login;
