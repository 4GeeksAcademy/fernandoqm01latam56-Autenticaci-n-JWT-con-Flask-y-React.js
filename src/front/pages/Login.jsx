import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || "Login failed");
      }

      const data = await resp.json();

      localStorage.setItem("token", data.token);
      navigate("/private");

    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas o servidor no disponible");
    }
  };

  return (
    <form className="loginnice" onSubmit={handleSubmit}>
      <div className="loginnice2">
        <h2>Login</h2>

        <input
          className="input-modern"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="input-modern"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="btn btn-primary" type="submit">Login</button>
      </div>


    </form>
  );
};
