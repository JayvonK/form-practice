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
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  // const included = /^(?=.*[?!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).*$/.test(form.password);
  // const notSpecial = /[^a-zA-Z0-9?!@#$%^&*]/.test(form.password);

  return (
    <main className="min-h-screen w-full bg-[#23527C]">
      <div className="flex items-center flex-col">
        <img src="/WA-Logo.png" alt="William's Act Logo" />
        <div className="bg-white px-6 py-4 min-w-72">
          <h1 className="text-center text-[34px] text-black mb-6 robotoCondensed font-light ">USER <strong className="font-bold">SIGN UP</strong></h1>

          <form onSubmit={handleSubmit} className="openSans font-semibold">
            <div className="grid grid-cols-2 gap-6 ">
              <InputComponent for={"First Name"} label={"First Name:"} required={true} onChange={handleFormChange} value={form.firstName} name="firstName" max={100} type={"text"} placeHolder={"First Name"} />

              <InputComponent for={"Last Name"} label={"Last Name:"} required={true} onChange={handleFormChange} value={form.lastName} name="lastName" max={100} type={"text"} placeHolder={"Last Name"} />

              <InputComponent for={"Email"} label={"Email:"} required={true} onChange={handleFormChange} value={form.email} name="email" type={"email"} placeHolder={"Email"} />

              <InputComponent for={"Date Of Birth"} label={"Date Of Birth:"} required={true} onChange={handleFormChange} value={form.dateOfBirth} name="dateOfBirth" type={"date"} placeHolder={"Date Of Birth"} maxDate={presentDay} />

              <InputComponent for={"Address"} label={"Address:"} required={false} onChange={handleFormChange} value={form.address} name="address" type={"text"} max={100} placeHolder={"Address"} />

              <InputComponent for={"Phone Number"} label={"Phone Number:"} required={form.phone.trim() !== ""} onChange={handleFormChange} value={form.phone} name="phone" type={"tel"} pattern="\([0-9]{3}\)-[0-9]{3}-[0-9]{4}" placeHolder={"(123)-456-7890"} title={"Phone Number must be in this format: (123)-456-7890"} />

              <InputComponent for={"Password"} label={"Password:"} required={true} onChange={handleFormChange} value={form.password} name="password" type={"password"} placeHolder={"Password"} min={15} pattern="(?=.*[?!@#$%^&*])(?=.*[A-Z])(?=.*[\d])[a-zA-Z0-9?!@#$%^&*]+" title={"Password must have 1 uppercase, 1 lowercase and 1 of these special characters ? ! @ # $ % ^ & * "} />

              <InputComponent for={"Confirm Password"} label={"Confirm Password:"} required={true} onChange={handleFormChange} value={form.confirmPassword} name="confirmPassword" type={"password"} placeHolder={"Re-Type Your Password"} error={!passwordMatch} min={15} />
              {!passwordMatch && <p>Passwords Dont Match</p>}
            </div>

            <div className="flex justify-center mt-6 w-full">
              <button type="submit" className="bg-[#DD8A3E] hover:brightness-90 p-4 w-full text-white text-sm font-bold tracking-wide">SIGN UP</button>
            </div>
          </form>


        </div>
      </div>
    </main>
  );
}
