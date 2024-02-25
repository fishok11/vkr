import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <>
      <Link to={'/articles'}>articles</Link>
    </>
  );
}

export default MainPage;