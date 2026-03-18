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
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "30%",

            padding: "15px",
            border: "1px solid black",
            borderRadius: "12px",
          }}
        >
          <label style={{}}>Enter your Name:</label>
          <input
            className=""
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label style={{}}>Enter your Email:</label>
          <input
            className=""
            type="text"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Enter your Password:</label>
          <input
            className=""
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter your Password again:</label>
          <input className="" type="text" required />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{
              padding: "8px 0px",
              fontWeight: "bold",
              fontSize: "16px",
              marginBottom: "10px",
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
