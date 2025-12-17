import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	const token = sessionStorage.getItem("token");

	const logout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-between">
				<Link to="/" className="navbar-brand">
					Autenticación JWT con Flask y React.js
				</Link>

				<div>
					{!token ? (
						<>
							<Link to="/login" className="btn btn-outline-primary me-2">
								Login
							</Link>
							<Link to="/signup" className="btn btn-primary">
								Signup
							</Link>
						</>
					) : (
						<button onClick={logout} className="btn btn-danger">
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
