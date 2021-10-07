import Link from "next/link";
import SignUpForm from "@components/SignUpForm";

export default function SignUp() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/" passHref>
            <a>home</a>
          </Link>
        </li>
        <li>
          <Link href="/login" passHref>
            <a>login</a>
          </Link>
        </li>
      </ul>
      <h1>sign up page</h1>
      <SignUpForm />
    </div>
  );
}
