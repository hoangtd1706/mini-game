import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <div>
      <div>
        <Link to={"/karooo"}>Karooo</Link>
      </div>
      <div>
        <Link to={"/soodookoo"}>Soodookoo</Link>
      </div>
    </div>
  );
}
