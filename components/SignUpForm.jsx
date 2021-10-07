import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@lib/contexts/useAuth";

export default function SignUpForm() {
  const router = useRouter();
  const { user, createUserWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      //TODO: need more validation for email & password
      if (!user && email.length > 0 && password.length > 0) {
        createUserWithEmail(email, password)
          .then((authUser) => {
            console.log(authUser);
            alert("sign up");
            router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="password"
          required
        />
        <input type="submit" value="sign up" onClick={onSubmit} />
      </form>
      <div>
        <button>google login</button>
        <button>github login</button>
      </div>
    </div>
  );
}
