import { Link } from "react-router-dom";
import { GoPencil, GoTrashcan } from "react-icons/go";
import supabase from "../config/supabaseClient";
import { type SmoothieType } from "../interface";

interface PropType {
  smoothie: SmoothieType;
  onDelete: (id: number) => void;
}

const SmoothieCard = ({ smoothie, onDelete }: PropType) => {
  const { id, title, recipe, rating } = smoothie;

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", id)
      .select();

    if (error != null) {
      console.log(error);
    }

    if (data != null) {
      console.log(data);
      onDelete(id);
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{title}</h3>
      <p>{recipe}</p>
      <div className="rating">{rating}</div>
      <div className="buttons">
        <Link to={"/" + id}>
          <GoPencil className="icons" />
        </Link>
        <Link to={"/" + id} onClick={handleDelete}>
          <GoTrashcan className="icons" />
        </Link>
      </div>
    </div>
  );
};

export default SmoothieCard;
