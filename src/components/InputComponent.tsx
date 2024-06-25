import React from 'react'

const InputComponent = (props: { for: string, max?: number, label: string, required: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, value?: string | number, name: string, type: string, pattern?: string, placeHolder: string, passwordMatchError?: boolean, min?: number, maxDate?: string, title?: string, showPasswordOne?: boolean, showPasswordTwo?: boolean, handleShowPasswordOne?: () => void, handleShowPassowrdTwo?: () => void, emailError?: boolean, firstNameError?: boolean, lastNameError?: boolean, dateError?: boolean, passwordError?: boolean, phoneError?: boolean }) => {
  return (
    <div className='flex flex-col relative'>
      {props.label === "Date Of Birth:" && <label className='text-sm text-gray-400 absolute -top-5'>(Birthday)</label>}

      {props.label !== "Address:" && props.label !== "Phone Number:" && <p className='text-red-600 absolute top-0 right-1'>*</p>}



      {(props.label === "Password:" || props.label === "Confirm Password:") && <img className="hover:cursor-pointer absolute top-3 right-3 aspect-square w-6" src={props.label === "Password:" ? props.showPasswordOne ? "/eye.svg" : "/eye-slash.svg" : props.showPasswordTwo ? "/eye.svg" : "/eye-slash.svg"} alt="eyeball" onClick={props.label === "Password:" ? props.handleShowPasswordOne : props.handleShowPassowrdTwo} />}

      <input className={`text-center bg-[#ECF0F1] p-4 text-sm text-black mb-4 focus:outline-[#DD8A3E] focus:rounded-none h-12 ${props.label === "Password:" || props.label === "Confirm Password:" ? "pr-10" : ""}`} type={props.type} maxLength={props.max} required={props.required} onChange={props.onChange} value={props.value} name={props.name} pattern={props.pattern} placeholder={props.placeHolder} minLength={props.min} max={props.maxDate} title={props.title} />
      {props.passwordError && <p className='text-red-500 text-xs -mt-2'>Password must be 15 characters minimum, have 1 uppercase, 1 lowercase and 1 of these special characters ? ! @ # $ % ^ & *. NO OTHER SPECIAL CHARACTERS</p>}

      {props.firstNameError && <p className='text-red-500 text-xs -mt-2'>Cannot Be Empty</p>}

      {props.lastNameError && <p className='text-red-500 text-xs -mt-2'>Cannot Be Empty</p>}

      {props.emailError && <p className='text-red-500 text-xs -mt-2'>Must include @ symbol</p>}

      {props.dateError && <p className='text-red-500 text-xs -mt-2'>Cannot be empty or a future date</p>}

      {props.phoneError && <p className='text-red-500 text-xs -mt-2'>Must be in the format: (xxx)-xxx-xxxx</p>}

      {props.passwordMatchError && <p className='text-red-500 text-xs -mt-2'>Passwords Do Not Match</p>}
    </div>
  )
}

export default InputComponent
