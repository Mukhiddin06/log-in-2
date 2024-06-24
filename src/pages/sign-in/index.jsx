import { useState } from "react";
import {auth} from "../../service"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Index = () => {
  const [form, setForm] = useState({});

  const handleChange = (event) => {
      const { value, name } = event.target;
      setForm({ ...form, [name]: value });
  };

  const handleSubmit = async(e) => {
      e.preventDefault();
      try{
          const response = await auth.sign_in(form)
          if(response.status === 200){
              localStorage.setItem("access_token", response.data.access_token)
          }
      }catch(error){
          console.log(error);
      }
  };
    return (
      <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-8 text-[50px]">Login</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField type="email" name="email" onChange={handleChange} className="card-user"  id="email" label="Email" variant="outlined" />
            <TextField type="password" name="password"  onChange={handleChange} className="card-user" id="password" label="Password" variant="outlined" />
            <Button type="submit" variant="contained">Sign-in</Button>
          </form>
        </div>     
      </div>
      </> 
    )
  }
  
  export default Index
  