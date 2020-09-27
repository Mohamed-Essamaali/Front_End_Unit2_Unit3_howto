
import React, { useState, useContext } from "react";
import  {GlobalContext}  from "../context/GlobalContext";
import axiosAuth from '../utils/axiosWithAuth'

const HowToCard = () => {
  
  const { howtos, setHowTos } = useContext(GlobalContext);
  const [editing, setEditing] = useState(0);
  const [edited, setEdited] = useState({
    title: "",
    contents: "",

  });

  const toggleEdit = (howto) => {
 
    let id = localStorage.getItem("id");
    if (editing !== howto.id) {
      setEdited(howto);
      setEditing(howto.id);
    } else {
 
      let edithowto = {
        title: edited.title,
        contents: edited.contents,
      }
      axiosAuth()
        .put(`https://joses-how-to-api.herokuapp.com/api/users/${id}/posts/${howto.id}`, edithowto)
        .then((res) => {
          console.log(res);
          setHowTos([
            ...howtos.filter((item) => item.id !== howto.id),
            res.data,
          ]);
          setEditing(0);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleChange = (e) =>{
    setEdited({ ...edited, [e.target.name]: e.target.value });
  
  }
  const deleteHowTo = (id) => {
    axiosAuth()
      .delete(`https://joses-how-to-api.herokuapp.com/api/users/${id}/posts/${id}`)
      .then((res) => setHowTos(howtos.filter((item) => item.id !== id)))
      .catch((err) => console.log(err));
  };

  return(

    <div>

    { 
    howtos.length === 0 ? <span></span> : 
    howtos.map((howto) => {
   
        return (
          <div className='card-edit-container' key={howto.id}>
            {editing === howto.id ? 
              <div className='card-edit'>
                <input
                  name="title"
                  value={edited.title}
                  onChange={handleChange}
                />
                <textarea
                  name="contents"
                  value={edited.contents}
                  onChange={handleChange}
                />
              </div>
             : 
              <div className='card-container'>
                <h3>{howto.title}</h3>
                <p>{howto.contents}</p>
              </div>


            }
          <div className='card-button-container'>
        <button className='edit' postid = {howto.id} onClick={(_) => toggleEdit(howto)}>

              {editing === howto.id ? "Submit" : "Edit How To"}{" "}
            </button>
            <button className='delet' onClick={(_) => deleteHowTo(howto.id)}>Delete HowTo</button>
            </div>
          </div>
        )
      })
   
    }

    
    </div>
    )
  }



  


  export default HowToCard
