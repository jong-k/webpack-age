import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [formError, setFormError] = useState<string | null>("");

  // TODO : supabase auth 연결
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !pass || !passConfirm) {
      setFormError("모든 항목을 입력해주세요");
      return;
    }

    if (pass.length < 6) {
      setFormError("6자 이상의 비밀번호를 입력해주세요");
      return;
    }

    if (pass !== passConfirm) {
      setFormError("비밀번호가 일치하지 않습니다");
      return;
    }
    // TODO: 계정 생성전에 중복 이메일 검사

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    if (error != null) {
      console.log(error.message);
      setFormError("이미 존재하는 이메일입니다");
      return;
    }

    if (data) {
      console.log(data);
      setFormError(null);
      if (
        window.confirm(
          "회원 가입이 완료되었습니다. 로그인 페이지로 이동하시겠습니까?",
        )
      ) {
        navigate("/login");
        return;
      }

      navigate("/");
    }

    setEmail("");
    setPass("");
    setPassConfirm("");
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
        <label htmlFor="passConfirm">비밀번호 확인:</label>
        <input
          type="password"
          id="passConfirm"
          value={passConfirm}
          onChange={(e) => {
            setPassConfirm(e.target.value);
          }}
        />
        <button type="submit">계정 생성</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Signup;
