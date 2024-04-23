import { useNavigate, useRouteError } from 'react-router-dom';


function Error() {
  const error = useRouteError()
  console.log(error);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Something went wrong 😢, try to login again</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
}

export default Error;
