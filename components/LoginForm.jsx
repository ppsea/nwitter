import { useState } from "react";
import router, { useRouter } from "next/router";
import { useAuth } from "@lib/contexts/useAuth";

export default function LoginForm() {
  const { user, loginWithEmail, loginWithGithub, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //change input
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  //submit email & password login
  const onSubmit = (e) => {
    e.preventDefault();
    try {
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

  //onClick social login
  const onClickSocialLogin = async (e) => {
    const { name } = e.target;
    try {
      if (name == "google") {
        loginWithGoogle()
          .then((res) => {
            alert("login");
            router.push("/");
          })
          .catch((error) => console.log(error));
      } else if (name == "github") {
        loginWithGithub()
          .then((res) => {
            alert("login");
            router.push("/");
          })
          .catch((error) => {
            if (
              error
                .toString()
                .includes("account-exists-with-different-credential")
            ) {
              alert("already signed with this credentials");
            }
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
        <button name="google" onClick={onClickSocialLogin}>
          google login
        </button>
        <button name="github" onClick={onClickSocialLogin}>
          github login
        </button>
      </div>
    </div>
  );
}
