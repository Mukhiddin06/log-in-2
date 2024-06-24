import { useState } from "react";
import {auth} from "../../service"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SignUpModal } from '@modal';

const Index = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});

  const handleChange = (event) => {
      const { value, name } = event.target;
      setForm({ ...form, [name]: value });
  };

  const handleSubmit = async(e) => {
      e.preventDefault();
      try{
          const response = await auth.sign_up(form)
          if(response.status === 200){
              setOpen(true)
              localStorage.setItem("email", form.email)
          }
      }catch(error){
          console.log(error);
      }
  };
    return (
      <>
      <SignUpModal open={open} handleClose={()=>setOpen(false)}/>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-8 text-[50px]">Register</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField type="email" name="email" onChange={handleChange} className="card-user"  id="email" label="Email" variant="outlined" />
            <TextField type="text" name="full_name"  onChange={handleChange} className="card-user" id="full_name" label="Full name" variant="outlined" />
            <TextField type="password" name="password"  onChange={handleChange} className="card-user" id="password" label="Password" variant="outlined" />
            <TextField  type="text" name="phone_number"  onChange={handleChange} className="card-password" id="phone_number" label="Phone number" variant="outlined" />
            <Button type="submit" variant="contained">Sign-up</Button>
          </form>
        </div>     
      </div>
      </> 
    )
  }
  
  export default Index
  