import { useState } from "react";
import axios from "axios";
export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/accounts/register/",
        {
          username: username,
          email: email,
          password: password,
        },
      );
      console.log("User: registered", res.data);
    } catch (error: any) {
      console.error("error:", error.response.data);
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
            height: "45%",
            padding: "15px",
            border: "3px solid",
            borderImage: "linear-gradient(to right, #358395, #ffffff) 1",
            borderRadius: "10px",
            backgroundColor: "rgba(131, 210, 223, 0.4)",
          }}
        >
          <img
            src="https://img.icons8.com/?size=100&id=79041&format=png&color=000000"
            alt=""
            style={{ width: "40px", height: "50px", alignSelf: "center" }}
          />
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>
            Enter your Name:
          </label>
          <input
            className=""
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>
            Enter your Email:
          </label>
          <input
            className=""
            type="text"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>
            Enter your Password:
          </label>
          <input
            className=""
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>
            Enter your Password again:
          </label>
          <input className="" type="text" required />
          <button
            style={{
              padding: "8px 0px",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "10px",
              color: "white",
              backgroundColor: "rgba(66, 164, 186, 0.8)",
            }}
            onClick={(e) => handleRegister(e)}
          >
            Register
          </button>
          <a style={{ alignSelf: "center", color: "blue" }}>
            {" "}
            Back to login page
          </a>
        </div>
      </div>
    </>
  );
};
