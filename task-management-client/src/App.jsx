import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => alert(error.code));
  }, []);

  console.log(users);

  return (
    <>
      <h1 className="text-4xl text-rose-600 font-semibold">Vite + React</h1>

      <p className="text-gray-200">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
