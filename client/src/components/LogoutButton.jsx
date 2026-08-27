import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("netrayaToken");
        localStorage.removeItem("netrayaUser");

        navigate("/login");
    };

    return (
        <button
            type="button"
            className="btn btn-sm"
            style={{
                backgroundColor: "#ffffff",
                color: "#6f42c1",
                border: "1px solid #ffffff"
            }}
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

export default LogoutButton;