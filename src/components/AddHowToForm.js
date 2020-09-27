import React, {useState,useEffect} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import {GlobalContext} from "../context/GlobalContext";
import styled from 'styled-components';
import * as yup from 'yup'

const Group = styled.div`
display:flex;
flex-direction:column;
padding:1% 0;
width:45%;
margin: 0 10%;
justify-content: space-between`

const formSchema = yup.object().shape({
    title: yup.string().required('Must Enter Title'),
    contents: yup.string().required('Must provide the instructions')
})

export default function AddHowToForm() {
    const {howtos, setHowTos} = React.useContext(GlobalContext);
    const [newHowTo, setNewHowTo] = useState({
        user_id: localStorage.getItem("id"),
        title: "",
        contents: ""
    })
    const[errors,setErrors]= useState({
        title: "",
        contents: ""
    })
    const[disabledButton,setDisabledButton] = useState(true);
    let id = localStorage.getItem("id");
   
    const validate = e=>{
        yup
        .reach(formSchema,e.target.name)
        .validate(e.target.value)
        .then(valid=>{
            setErrors({...errors,[e.target.name]:''})
        })
        .catch(err=>{
            setErrors({...errors,[e.target.name]:err.errors[0]})
        })
    }
    useEffect(()=>{
        formSchema
        .isValid(newHowTo)
        .then(valid=>{
          setDisabledButton(!valid)
        })
      
      },[newHowTo])


    const handleChange = e => {
        e.persist();
        validate(e);
        setNewHowTo({
            ...newHowTo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        axiosWithAuth().post(`https://joses-how-to-api.herokuapp.com/api/users/${id}/posts`, newHowTo)
            .then(res => {
                axiosWithAuth().get(`https://joses-how-to-api.herokuapp.com/api/users/${id}/posts`)
                .then(res => {
                    setHowTos([...howtos, res.data])
                    console.log('how tos ',howtos);
    
                    setNewHowTo({
                        title: "",
                        contents: ""
                    })
                })
               
            })
            .catch(err => console.log(err))
    }

    return(

        <form className='addNewHowTo-container' onSubmit={handleSubmit}>
            <Group>
                <h1>Add New How To</h1>
                <input 
                    type='text'
                    name="title"
                    value={newHowTo.title}
                    onChange={handleChange} 
                    placeholder="Title"/>
                     {errors.title.length>0?<p className= 'error'>{errors.title}</p>:null}
                <textarea 
                    type='textArea'
                    name="contents"
                    value={newHowTo.contents}
                    onChange={handleChange} 
                    placeholder="Instructions" />
                     {errors.contents.length>0?<p className= 'error'>{errors.contents}</p>:null}
                <button disabled = {disabledButton} type="submit">Submit</button>
            </Group>
           

        </form>

    )


}