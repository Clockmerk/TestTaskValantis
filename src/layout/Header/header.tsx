import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white text-l">
      <nav>
        <ul className="flex justify-evenly">
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Catalog
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contacts"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
