import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";
import { ORDER_TYPE } from "../enums";
import { type SmoothieType } from "../interface";

const Home = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [smoothies, setSmoothies] = useState<SmoothieType[] | null>(null);
  const [orderBy, setOrderBy] = useState(ORDER_TYPE.CREATED_AT);

  const handleDelete = (id: number) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((smoothie) => smoothie.id !== id);
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select("*")
        .order(orderBy, { ascending: false });

      if (error != null) {
        setFetchError("스무디를 불러오는데 실패했습니다.");
        setSmoothies(null);
        console.log(error);
      }

      if (data != null) {
        setSmoothies(data);
        setFetchError(null);
      }
    };
    void fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError !== null && <p>{fetchError}</p>}
      {smoothies !== null && (
        <div className="smoothies">
          <div className="orderBy">
            <p>Order by:</p>
            <button
              onClick={() => {
                setOrderBy(ORDER_TYPE.CREATED_AT);
              }}
            >
              시간 순
            </button>
            <button
              onClick={() => {
                setOrderBy(ORDER_TYPE.TITLE);
              }}
            >
              이름 순
            </button>
            <button
              onClick={() => {
                setOrderBy(ORDER_TYPE.RATING);
              }}
            >
              평점 순
            </button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
