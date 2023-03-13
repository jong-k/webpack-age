import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [formError, setFormError] = useState<string | null>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !pass) {
      setFormError("모든 항목을 입력해주세요");
      return;
    }

    if (pass.length < 6) {
      setFormError("6자 이상의 비밀번호를 입력해주세요");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error != null) {
      console.log(error.message);
      setFormError("이메일 혹은 비밀번호를 재확인해주세요");
      return;
    }

    if (data) {
      console.log(data);
      // session 없으면 supabase 설정에서 confirm email 확인해야함
      setFormError(null);
      window.alert("로그인에 성공했습니다");
      navigate("/");
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="pass">비밀번호:</label>
        <input
          type="password"
          id="pass"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <button type="submit">로그인</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Login;
