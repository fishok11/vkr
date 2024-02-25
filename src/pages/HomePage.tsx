import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <Link to={'/articles'}>articles</Link>
    </>
  );
}

export default HomePage;