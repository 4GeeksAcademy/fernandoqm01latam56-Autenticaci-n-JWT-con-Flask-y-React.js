import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const logout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand">React Boilerplate</span>
				</Link>

				<button onClick={logout} className="btn btn-danger">
					Logout
				</button>
			</div>
		</nav>
	);
};
