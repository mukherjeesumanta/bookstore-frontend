import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import UserAvatar from "../../user/avatar/UserAvatar";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "../../Icons";
import { useState } from "react";

export default function Navbar() {
  const { itemCount } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/catalogue", label: "Catalogue" },
  ];

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5] border-b border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-[#1C1C1C] tracking-tight">
            Leaf &amp; Letter
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#1C1C1C]"
                      : "text-[#5C5C4F] hover:text-[#1C1C1C]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Cart link */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 text-sm font-medium text-[#5C5C4F] hover:text-[#1C1C1C] transition-colors"
              aria-label="Shopping cart"
            >
              Cart
              {itemCount > 0 && (
                <span className="bg-[#C4622D] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Auth controls */}
            {isLoggedIn ? (
              <>
                <UserAvatar />
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-[#5C5C4F] hover:text-[#1C1C1C] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-[#5C5C4F] hover:text-[#1C1C1C] transition-colors"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile: cart + (login icon or hamburger) */}
          <div className="flex sm:hidden items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2 text-[#5C5C4F] hover:text-[#1C1C1C] transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C4622D] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Show login icon when logged out */}
            {!isLoggedIn && (
              <Link
                to="/login"
                className="p-2 text-[#5C5C4F] hover:text-[#1C1C1C] transition-colors"
                aria-label="Login"
              >
                {/* Person icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0" />
                </svg>
              </Link>
            )}

            <button
              className="p-2 text-[#5C5C4F] hover:text-[#1C1C1C] transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-[#E8E4D9] bg-[#FAF9F5] px-4 pb-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium ${
                  isActive ? "text-[#1C1C1C]" : "text-[#5C5C4F]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <>
              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm font-medium ${isActive ? "text-[#1C1C1C]" : "text-[#5C5C4F]"}`
                }
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="block py-2 text-sm font-medium text-[#5C5C4F] w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium ${isActive ? "text-[#1C1C1C]" : "text-[#5C5C4F]"}`
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}
