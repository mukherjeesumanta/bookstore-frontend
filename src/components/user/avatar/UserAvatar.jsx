import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./UserAvatar.css";

/**
 * Displays the first letter of the logged-in user's name inside an
 * orange circle. Clicking it navigates to /profile.
 */
export default function UserAvatar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <button
      className="user-avatar"
      onClick={() => navigate("/profile")}
      aria-label="Go to profile"
      title={user?.name ?? "Profile"}
    >
      {initial}
    </button>
  );
}
