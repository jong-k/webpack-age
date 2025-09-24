import { Link } from "react-router";
import { ResponsiveBox } from "../../shared/ui";

export default function Header() {
  return (
    <header className="w-full bg-white py-4 text-xl font-semibold shadow-sm">
      <ResponsiveBox>
        <Link to="/">Bot Shield</Link>
      </ResponsiveBox>
    </header>
  );
}
