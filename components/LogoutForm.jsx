import { useAuth } from "@lib/contexts/useAuth";

export default function LogoutForm() {
  const { logout } = useAuth();
  return (
    <div>
      <p>you want to logout?</p>
      <button onClick={logout}>logout</button>
    </div>
  );
}
