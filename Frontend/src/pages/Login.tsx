import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/accounts/login/",
        {
          username: email,
          password: password,
        },
      );
      console.log("User: logged in", res.data);
      if (res) {
        navigate("/"); // redirect to landing page after successful login
      }
    } catch (error: any) {
      alert("error:" + error.response.data.detail);
      console.error("error:", error.response.data);
      setPassword("");
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
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "30%",
            height: "33%",
            padding: "15px",
            border: "3px solid",
            borderColor: "white",
            borderImage: "linear-gradient(to right, #358395, #ffffff) 1",
            borderRadius: "15px",
            backgroundColor: "rgba(131, 210, 223, 0.4)",
          }}
        >
          <img
            src="https://img.icons8.com/?size=100&id=79041&format=png&color=000000"
            alt=""
            style={{ width: "40px", height: "50px", alignSelf: "center" }}
          />
          <label className="" style={{ fontSize: "16px", fontWeight: "bold" }}>
            Enter your Email:
          </label>
          <input
            className=""
            type="text"
            style={{ borderRadius: "5px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="" style={{ fontSize: "16px", fontWeight: "bold" }}>
            Enter your Password
          </label>
          <input
            className=""
            type="password"
            style={{ borderRadius: "5px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleLogin()}
            style={{
              padding: "8px 0px",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "10px",
              backgroundColor: "rgba(66, 164, 186, 0.8)",
              color: "white",
            }}
          >
            Login
          </button>
          <a style={{ alignSelf: "center", color: "blue" }}>
            {" "}
            forget password?
          </a>
        </div>

        <p>
          {email} and {password}
        </p>
        <p>{message}</p>
      </div>
    </>
  );
}
export default Login;
