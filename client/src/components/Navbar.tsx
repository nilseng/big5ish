import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { NeuButton } from "./NeuButton";

export const Navbar = () => {
  return (
    <nav className="p-4">
      <Link to="/">
        <NeuButton
          type="colored"
          style={{ padding: "1rem" }}
          componentIcon={<Logo height="32px" width="32px" />}
          ariaLabel="home"
        />
      </Link>
    </nav>
  );
};
