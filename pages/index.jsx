import Link from "next/link";
import { useAuth } from "@lib/contexts/useAuth";
import LogoutForm from "@components/LogoutForm";
import GetMessages from "@components/GetMessages";
import SendMessage from "@components/SendMessage";

export default function Home() {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>... loading</div>;
  }
  if (!user) {
    return (
      <div>
        <h1>you need login</h1>
        <Link href="/login" passHref>
          <a>login</a>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1>hello {user.email}!</h1>
      <LogoutForm />
      <GetMessages />
      <br />
      <SendMessage />
    </div>
  );
}
