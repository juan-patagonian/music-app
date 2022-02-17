import { Link } from "react-router-dom";

export const NotFoundScreen = () => {
  return (
    <div>
      <h2>You've come to the wrong page fool!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};
