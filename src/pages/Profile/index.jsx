import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";
import OrderHistory from "../../components/user/OrderHistory";
import "./Profile.css";

export default function Profile() {
  const { user, isLoggedIn } = useAuth();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    if (isLoggedIn)
      api
        .profile()
        .then(({ user: remoteUser }) => setProfile(remoteUser))
        .catch(() => {});
  }, [isLoggedIn]);

  // Guard: redirect unauthenticated visitors — declarative to avoid setState-during-render
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* User info card */}
        <div className="profile-card">
          <div className="profile-avatar" aria-hidden="true">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-username">@{profile.username}</p>
          </div>
        </div>

        {/* Order history */}
        <OrderHistory orders={profile.orders ?? []} />
      </div>
    </div>
  );
}
