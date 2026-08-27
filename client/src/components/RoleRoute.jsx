import { Navigate } from "react-router-dom";

const RoleRoute = ({ allowedRoles, children }) => {

    const token =
        localStorage.getItem("netrayaToken");

    const storedUser =
        localStorage.getItem("netrayaUser");

    if (!token || !storedUser) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    let user;

    try {
        user = JSON.parse(storedUser);
    } catch (error) {
        localStorage.removeItem("netrayaToken");
        localStorage.removeItem("netrayaUser");

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (!user?.role) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (!allowedRoles.includes(user.role)) {

        if (user.role === "PATIENT") {
            return (
                <Navigate
                    to="/patient"
                    replace
                />
            );
        }

        if (user.role === "DOCTOR") {
            return (
                <Navigate
                    to="/doctor"
                    replace
                />
            );
        }

        if (
            user.role === "STAFF" ||
            user.role === "ADMIN"
        ) {
            return (
                <Navigate
                    to="/staff"
                    replace
                />
            );
        }

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
};

export default RoleRoute;