import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [datas, setDatas] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const getData = async () => {
    axios
      .get("https://pokeapi.co/api/v2/berry/")
      .then((response) => {
        const data = response.data.results;
        const result = data.map((data) => {
          return {
            label: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            value: data.name,
          };
        });
        setDatas(result.sort((a, b) => a.label.localeCompare(b.label)));
      })
      .catch((error) => alert(error.toString()));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (value) => {
    setUserSelect(value.charAt(0).toUpperCase() + value.slice(1));
  };

  return (
    <div className="App">
      <div className="berries">
        <h2>Select Your Favorite Berries Pokemon</h2>
        <Select options={datas} onChange={(e) => handleChange(e.value)} />
        <h3>{userSelect}</h3>
      </div>
    </div>
  );
}

export default App;
