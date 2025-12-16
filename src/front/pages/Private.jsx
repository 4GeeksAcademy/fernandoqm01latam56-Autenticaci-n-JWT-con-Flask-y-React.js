import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch(import.meta.env.BACKEND_URL + "/api/private", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Unauthorized");
                return resp.json();
            })
            .then(data => setMessage(data.msg))
            .catch(() => {
                sessionStorage.removeItem("token");
                navigate("/login");
            });

    }, []);

    return (
        <div>
            <h1>Private Page</h1>
            <p>{message}</p>
        </div>
    );
};
