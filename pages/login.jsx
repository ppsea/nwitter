import Link from "next/link";
import LoginForm from "@components/LoginForm";

export default function Login() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/" passHref>
            <a>home</a>
          </Link>
        </li>
        <li>
          <Link href="/signup" passHref>
            <a>sign up</a>
          </Link>
        </li>
      </ul>
      <h1>login page</h1>
      <LoginForm />
    </div>
  );
}
