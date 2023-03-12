import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [recipe, setRecipe] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState<string | null>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !recipe || !rating) {
      setFormError("모든 항목을 입력해주세요");
      return;
    }
    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, recipe, rating }])
      .select(); // .select() 안 붙이면 에러 발생

    if (error != null) {
      console.log(error.message);
      setFormError("스무디 생성에 실패했습니다");
      return;
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="recipe">Recipe:</label>
        <textarea
          id="recipe"
          value={recipe}
          onChange={(e) => {
            setRecipe(e.target.value);
          }}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
        />
        <button type="submit">만들기</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
