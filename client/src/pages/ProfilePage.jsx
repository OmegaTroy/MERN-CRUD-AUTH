import { useAuth } from "../context/AuthContext";

export const ProfilePage = () => {
  const { user } = useAuth();
  console.log(user);
  return <div>ProfilePage</div>;
};
