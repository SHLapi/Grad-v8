import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/index";
import axios from "axios";

const UserIndex = () => {
  //state
  const [hidden, setHidden] = useState(true);

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data);
      setHidden(false);

    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  return (
    <>
    { !hidden && (
        <h1>
          <pre>{JSON.stringify(user)}</pre>
        </h1>
    )}
    </>
  );
};
