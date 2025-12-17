import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadPrivate = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const resp = await fetch(
                    import.meta.env.VITE_BACKEND_URL + "/api/private",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!resp.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await resp.json();
                setMessage(data.msg);

            } catch (err) {
                console.error("Error private:", err);
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        loadPrivate();
    }, [navigate]);

    return (
        <div className="privatepage">
            <div className="pageP">
                <h1>Private Page</h1>
                <p>{message}</p>
            </div>
        </div>
    );
};
