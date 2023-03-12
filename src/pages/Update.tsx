import { useNavigate, useParams } from "react-router-dom";
import { type FormEvent, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [recipe, setRecipe] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !recipe || !rating) {
      setFormError("모든 항목을 입력해주세요");
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, recipe, rating })
      .eq("id", id)
      .select();

    if (error != null) {
      console.log(error.message);
      setFormError("스무디 수정에 실패했습니다");
      return;
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select("*")
        .eq("id", id)
        .limit(1)
        .single();

      if (error != null) {
        navigate("/", { replace: true }); // history stack에 새로 추가하지 않고 replace
      }

      if (data != null) {
        setTitle(data.title);
        setRecipe(data.recipe);
        setRating(data.rating);
        console.log(title, recipe, rating);
      }
    };
    void fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className="page update">
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

        <button type="submit">수정하기</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
