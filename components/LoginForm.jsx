import { useState } from "react";
import router, { useRouter } from "next/router";
import { useAuth } from "@lib/contexts/useAuth";

export default function LoginForm() {
  const { user, loginWithEmail } = useAuth();
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
      let data;
      //TODO: need more validation for email & password
      if (!user && email.length > 0 && password.length > 0) {
        loginWithEmail(email, password)
          .then((authUser) => {
            alert(`login with email: ${email}`);
            router.push("/");
          })
          .catch((error) => {
            alert("no user. you need to sign up");
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
        <input type="submit" value="login" onClick={onSubmit} />
      </form>
      <div>
        <button>google login</button>
        <button>github login</button>
      </div>
    </div>
  );
}
