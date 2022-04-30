import {Link} from "react-router-dom";

export default function Navbar(){
    return (
        <nav
            style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
            }}
        >
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
        </nav>
)
}