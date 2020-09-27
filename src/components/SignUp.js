import React, {useState,useEffect} from "react";
import axios from "axios";
import {GlobalContext} from "../context/GlobalContext";
import styled from 'styled-components'

import *as yup from 'yup'

const Group = styled.div`
display:flex;
flex-direction:column;
padding:1% 0;
width:45%;`


const formSchema = yup.object().shape({
    name: yup.string().required('Name is a required field').min(2,'minimum two characters'),
    email: yup.string().email('enter a valid email').required('email is required field'),
    username: yup.string().required('Must choose a user name').min(4,'minimum four characters'),
    password: yup.string().required("Please enter your password.").min(6), /*matches(
        /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
       "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character")*/
    confirmPassword: yup.string().oneOf([yup.ref('password'),null],'Passwords must match'),
    terms: yup.boolean().oneOf([true],'please agree the terms'),
})



export default function Form({history}) {
    const {setLoggedIn} = React.useContext(GlobalContext);

    const [authInfo, setAuthInfo] = useState( {
        name:'',
        email:'',
        username:'',
        password:'',
        confirmPassword:'',
        terms:false,
    })

    const[disabledButton,setDisabledButton] = useState(true)

    const[errors,setErrors] = useState({
        name:'',
        email:'',
        username:'',
        password:'',
        confirmPassword:'',
        terms:'',
    })


 const handleChange = e => {
        e.persist();
        let newVal = e.target.type==='checkbox'? e.target.checked:e.target.value;
        setAuthInfo({
            ...authInfo,
            [e.target.name]: newVal
        })
        validateInput(e);
    }

    const handleSubmit = e => {
        e.preventDefault();

        //make two forms? or use param in endpoint?
        const data = {
            username: authInfo.username,
            password: authInfo.password,
            email: authInfo.email,
        }
        console.log(data);
        axios.post( `https://joses-how-to-api.herokuapp.com/api/auth/register`, data)
            .then(res => {
                console.log(res)
                    setLoggedIn(true);
                    localStorage.setItem("token", res.data.token)
                    history.push('/')
            })
            .catch(err => console.log(err.message))
    }


    const validateInput = event=>{
        yup
        .reach(formSchema,event.target.name)
        .validate(event.target.type==='checkbox'?event.target.checked:event.target.value)
        .then(valid=>{
            setErrors(
                {...errors,[event.target.name]:''
            })
        })
        .catch(err=>{
            setErrors(
                {...errors,[event.target.name]:err.errors[0]
            })
        })

    }
    useEffect(()=>{
        formSchema
        .isValid(authInfo)
        .then(valid=>{
            setDisabledButton(!valid)
        })

    },[authInfo])

    return(
        <div className='form-container'>
        
       <h1>Welcome to How Tos Registration Form</h1>
       <form onSubmit={handleSubmit}>
           <Group>
               <label htmlFor='name'>Name</label>
               <input type='text' id='name' name ='name' value={authInfo.name} onChange={handleChange}/>
               {errors.name.length>0?<p className='error'>{errors.name}</p>:null}
            
           </Group>
           <Group>
               <label htmlFor='email'>Email</label>
               <input type='email' id='email' name ='email' value={authInfo.email} onChange={handleChange}/>
               {errors.email.length>0?<p className='error'>{errors.email}</p>:null}
           </Group>
           <Group>
               <label htmlFor='username'>User Name</label>
               <input type='text' id='username' name ='username' value={authInfo.username} onChange={handleChange}/>
               {errors.username.length>0?<p className='error'>{errors.username}</p>:null}
           </Group>
           <Group>
               <label htmlFor='password'>Password</label>
               <input type='text' id='password' name ='password' value={authInfo.password} onChange={handleChange}/>
               {errors.password.length>0?<p className='error'>{errors.password}</p>:null}
           </Group>
           <Group>
               <label htmlFor='confirmPassword'>Confirm Password</label>
               <input type='text' id='confirmPassword' name ='confirmPassword' value={authInfo.confirmPassword} onChange={handleChange}/>
               {authInfo.password !==authInfo.confirmPassword?<p className='error'>{errors.confirmPassword}</p>:null}
           </Group>
           <Group>
               <label htmlFor='terms'>Please agree to the terms</label>
               <input type='checkbox' id='terms' name ='terms' checked={authInfo.terms} onChange={handleChange}/>
               {errors.terms.length>0?<p className='error'>{errors.terms}</p>:null}
           </Group>

          <button type='submit' disabled={disabledButton} > sign up </button>
           

       </form>
   
   </div>
  

    
    )
}