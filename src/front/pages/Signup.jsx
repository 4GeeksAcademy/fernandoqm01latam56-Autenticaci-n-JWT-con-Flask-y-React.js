import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }
    );

    if (resp.ok) {
      navigate("/login");
    } else {
      const data = await resp.json();
      alert(data.msg || "Error al registrar usuario");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="signup2">
        <h2>Signup</h2>

        <input
          className="input-modern"
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="input-modern"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary" type="submit">Registrarse</button>
      </div>
    </form>
  );
};
