'use client'

import InputComponent from "@/components/InputComponent";
import { IForm } from "@/interfaces/Interfaces";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const emptyForm: IForm = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: undefined,
    address: "",
    phone: "",
    password: "",
    confirmPassword: ""
  }

  

  const [form, setForm] = useState<IForm>(emptyForm);

  const passwordMatch = form.password === form.confirmPassword;

  const presentDay = new Date().toISOString().split('T')[0];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  
  // const included = /^(?=.*[?!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).*$/.test(form.password);
  // const notSpecial = /[^a-zA-Z0-9?!@#$%^&*]/.test(form.password);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col mx-12 my-12">
        <InputComponent for={"First Name"} label={"First Name:"} required={true} onChange={handleFormChange} value={form.firstName} name="firstName" max={100} type={"text"} placeHolder={"First Name"}/>

        <InputComponent for={"Last Name"} label={"Last Name:"} required={true} onChange={handleFormChange} value={form.lastName} name="lastName" max={100} type={"text"} placeHolder={"First Name"}/>

        <InputComponent for={"Email"} label={"Email:"} required={true} onChange={handleFormChange} value={form.email} name="email" type={"email"} placeHolder={"Last Name"}/>

        <InputComponent for={"Date Of Birth"} label={"Date Of Birth:"} required={true} onChange={handleFormChange} value={form.dateOfBirth} name="dateOfBirth" type={"date"} placeHolder={"Birth Day"} maxDate={presentDay}/>

        <InputComponent for={"Address"} label={"Address:"} required={false} onChange={handleFormChange} value={form.address} name="address" type={"text"} max={100} placeHolder={"Address"}/>

        <InputComponent for={"Phone Number"} label={"Phone Number:"} required={form.phone.trim() !== ""} onChange={handleFormChange} value={form.phone} name="phone" type={"tel"} pattern="\([0-9]{3}\)-[0-9]{3}-[0-9]{4}" placeHolder={"(123)-456-7890"}/>

        <InputComponent for={"Password"} label={"Password:"} required={true} onChange={handleFormChange} value={form.password} name="password" type={"password"} placeHolder={"Password"} min={1} pattern="(?=.*[?!@#$%^&*])(?=.*[A-Z])(?=.*[\d])[a-zA-Z0-9?!@#$%^&*]+"/>

        <InputComponent for={"Confirm Password"} label={"Confirm Password:"} required={true} onChange={handleFormChange} value={form.confirmPassword} name="confirmPassword" type={"password"} placeHolder={"Re-Type Your Password"} error={!passwordMatch} min={1}/>
        {!passwordMatch && <p>Passwords Dont Match</p>}

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}
