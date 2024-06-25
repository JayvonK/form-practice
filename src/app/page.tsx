'use client'

import InputComponent from "@/components/InputComponent";
import { IForm } from "@/interfaces/Interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const emptyForm: IForm = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: ""
  }

  const [form, setForm] = useState<IForm>(emptyForm);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showPasswordTwo, setShowPasswordTwo] = useState<boolean>(false);

  const [presentDay, setPresentDay] = useState<string>("")

  const passwordMatch = form.password === form.confirmPassword;

  const [count, setCount] = useState<number>(3);

  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })

    switch (e.target.name) {
      case "email":
        e.target.value.includes("@") ? setEmailError(false) : setEmailError(true);
        break;

      case "dateOfBirth":
        new Date(presentDay) < new Date(e.target.value) ? setDateError(true) : setDateError(false);
        break;

      case "phone":
        if (e.target.value.trim() === "") {
          setPhoneNumberError(false);
        } else {
          const correct = /\([0-9]{3}\)-[0-9]{3}-[0-9]{4}/.test(e.target.value)

          correct ? setPhoneNumberError(false) : setPhoneNumberError(true);
        }
        break;

      case "firstName":
        e.target.value.trim() === "" ? setFirstNameError(true) : setFirstNameError(false);
        break;

      case "lastName":
        e.target.value.trim() === "" ? setLastNameError(true) : setLastNameError(false);
        break;

      case "password":
        if (e.target.value.trim() === "" || e.target.value.length < 15) {
          setPasswordError(true);
        } else {
          const included = /^(?=.*[?!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).*$/.test(e.target.value);
          const notSpecial = /[^a-zA-Z0-9?!@#$%^&*]/.test(e.target.value);
          if (included && !notSpecial) {
            setPasswordError(false);
          } else if (!included || notSpecial) {
            setPasswordError(true);
          }
        }
    }

  }

  const checkInputs = () => {
    let count = 0;
    if (form.firstName.trim() === "") {
      setFirstNameError(true);
      count++;
    }

    if (form.lastName.trim() === "") {
      setLastNameError(true);
      count++;
    }

    if (!form.email.includes("@")) {
      setEmailError(true);
      count++;
    }

    if (form.password.trim() === "") {
      setPasswordError(true);
      count++;
    }

    if (form.dateOfBirth === "") {
      setDateError(true);
      count++;
    }

    return count === 0 ? true : false;
  }

  const handleSubmit = () => {
    
    if (!(firstNameError && lastNameError && emailError && passwordError && dateError) && checkInputs()) {
      setSubmitted(true);
      afterSubmit();
    }

    // if (canSubmit) {
    //   setSubmitted(true);
    //   afterSubmit();
    // }
  }


  const afterSubmit = () => {
    setTimeout(() => {
      setCount(2)
      setForm(emptyForm);
      setShowPassword(false);
    }, 1000)

    setTimeout(() => {
      setCount(1)
    }, 2000)

    setTimeout(() => {

      setCount(0)
      setSubmitted(false);
      setCount(3);
    }, 3000)
  }

  const handleShowPasswordOne = () => {
    setShowPassword(!showPassword)
  }

  const handleShowPassowrdTwo = () => {
    setShowPasswordTwo(!showPasswordTwo)
  }

  // const included = /^(?=.*[?!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).*$/.test(form.password);
  // const notSpecial = /[^a-zA-Z0-9?!@#$%^&*]/.test(form.password);

  useEffect(() => {
    setPresentDay(new Date().toISOString().split('T')[0]);
  }, [])

  return (
    <main className="min-h-screen w-full bg-[#23527C]">
      <div className="flex items-center flex-col">
        <img src="/WA-Logo.png" alt="William's Act Logo" />
        <div className="bg-white px-6 py-4 min-w-72 sm:max-w-[538px] max-w-[288px] mb-12">

          <h1 className="text-center text-[34px] text-black mb-6 robotoCondensed font-light ">USER <strong className="font-bold">SIGN UP</strong></h1>

          {
            !submitted ? <form className="openSans font-semibold">
              <div className="grid sm:grid-cols-2 gap-6 ">
                <InputComponent for={"First Name"} label={"First Name:"} required={true} onChange={handleFormChange} value={form.firstName} name="firstName" max={100} type={"text"} placeHolder={"First Name"} firstNameError={firstNameError} />

                <InputComponent for={"Last Name"} label={"Last Name:"} required={true} onChange={handleFormChange} value={form.lastName} name="lastName" max={100} type={"text"} placeHolder={"Last Name"} lastNameError={lastNameError} />

                <InputComponent for={"Email"} label={"Email:"} required={true} onChange={handleFormChange} value={form.email} name="email" type={"email"} placeHolder={"Email"} emailError={emailError} />

                <InputComponent for={"Date Of Birth"} label={"Date Of Birth:"} required={true} onChange={handleFormChange} value={form.dateOfBirth} name="dateOfBirth" type={"date"} placeHolder={"Date Of Birth"} maxDate={presentDay} dateError={dateError} />

                <InputComponent for={"Address"} label={"Address:"} required={false} onChange={handleFormChange} value={form.address} name="address" type={"text"} max={100} placeHolder={"Address"} />

                <InputComponent for={"Phone Number"} label={"Phone Number:"} required={form.phone.trim() !== ""} onChange={handleFormChange} value={form.phone} name="phone" type={"tel"} pattern="\([0-9]{3}\)-[0-9]{3}-[0-9]{4}" placeHolder={"(123)-456-7890"} title={"Phone Number must be in this format: (123)-456-7890"} phoneError={phoneNumberError} />

                <InputComponent for={"Password"} label={"Password:"} required={true} onChange={handleFormChange} value={form.password} name="password" type={showPassword ? "text" : "password"} placeHolder={"Password"} min={15} pattern="(?=.*[?!@#$%^&*])(?=.*[A-Z])(?=.*[\d])[a-zA-Z0-9?!@#$%^&*]+" title={"Password must have 15 characters minimum, have 1 uppercase, 1 lowercase and 1 of these special characters ? ! @ # $ % ^ & * "} showPasswordOne={showPassword} handleShowPasswordOne={handleShowPasswordOne} passwordError={passwordError} />

                <InputComponent for={"Confirm Password"} label={"Confirm Password:"} required={true} onChange={handleFormChange} value={form.confirmPassword} name="confirmPassword" type={showPasswordTwo ? "text" : "password"} placeHolder={"Re-Type Your Password"} passwordMatchError={!passwordMatch} min={15} showPasswordTwo={showPasswordTwo} handleShowPassowrdTwo={handleShowPassowrdTwo} />

              </div>

              <div className="flex justify-center mt-6 w-full">
                <button type="button" className="bg-[#DD8A3E] hover:brightness-90 p-4 w-full text-white text-sm font-bold tracking-wide" onClick={handleSubmit}>SIGN UP</button>
              </div>
            </form>
              :
              <div className="flex justify-center items-center flex-col">
                <img src="/check-fat-fill.svg" alt="green checkmark" className="aspect-square w-14" />
                <h3 className="openSans font-bold text-center mt-6 sm:mx-32 mx-16">Account Creation <br />Successful!</h3>

                <h3 className="openSans font-bold text-center mt-3 mb-6 sm:mx-32 mx-16">Redirecting in {count}</h3>

              </div>
          }
        </div>
      </div>
    </main>
  );
}
