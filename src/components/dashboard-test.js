import React from "react";
import AddHowToForm from "./AddHowToForm";
import HowToCard from "./HowToCard";
import { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { GlobalContext } from "../context/GlobalContext";

export default function Dashboard() {
  const [ howtos, setHowtos ] = useContext(GlobalContext);
//   const [editing, setEditing] = useState(0);
  const [howToRes, searchHowToRes] = useState([]);
  const [search, howToSearch] = useState("");
//   const [edited, setEdited] = useState({
//     title: "",
//     content: "",
//   });

  useEffect(() => {
    axiosWithAuth()
      .get("https://url.herokuapp.com/howtos")
      
      .then((res) => {
          setHowtos(res.data)
          const title = howtos.filter(x =>
            x.title.toLowerCase().includes(search.toLowerCase())
            //includes what is saved to search from howToSearch(e.target.value)
          );
        
          searchHowToRes(title);
        } )
      .catch((err) => console.log(err));
  }, [search]);

  const searchHandler = e => {
    e.preventDefault();
    howToSearch(e.target.value);//saves results to howToRes array in useState hook
  };

//   const toggleEdit = (howto) => {
//     if (editing !== howto.id) {
//       setEdited(howto);
//       setEditing(howto.id);
//     } else {
//       axiosWithAuth()
//         .put(`https://url.herokuapp.com/howtos/${howto.id}`, edited)
//         .then((res) => {
//           setHowtos([
//             ...howtos.filter((item) => item.id !== howto.id),
//             res.data,
//           ]);
//           setEditing(0);
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   const handleChange = (e) =>
//     setEdited({ ...edited, [e.target.name]: e.target.value });

//   const deleteHowTo = (id) => {
//     axiosWithAuth()
//       .delete(`https://url.herokuapp.com/howtos/${id}`)
//       .then((res) => setHowtos(howtos.filter((item) => item.id !== id)))
//       .catch((err) => console.log(err));
//   };

  return (
    <div className="dashboard-conatainer">

        <form className="search">
        <input
          className="searchTerm"
          id="name"
          type="text"
          name="textfield"
          placeholder="Search"
          value={search}
          onChange={searchHandler}
        />
        <button type="submit" className="searchButton">
          Go
        </button>
      </form>


      <AddHowToForm />
      <div className="card-list-container">

      {howToRes.map(howto => (
        <HowToCard 
        key={howto.id}
        title={howto.title}
        content={howto.content}
         />
        ))}

      </div>
    </div>
  );
}
