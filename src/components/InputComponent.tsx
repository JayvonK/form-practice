import React from 'react'

const InputComponent = (props: {for: string, max?: number, label: string, required: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, value: string | number, name: string, type: string, pattern?: string, placeHolder: string, error?: boolean, min?: number, maxDate?: string, title? : string}) => {
  return (
    <div className='flex flex-col justify-end relative'>
        {props.label === "Date Of Birth:" && <label className='text-sm text-gray-400 absolute -top-5'>(Birthday)</label>}
        {props.label !== "Address:" && props.label !== "Phone Number:" && <p className='text-red-600 absolute top-0 right-1'>*</p>}
        {props.error && <p className='text-red-500 text-xs absolute -bottom-1'>Passwords Do Not Match</p>}
        <input className="text-center bg-[#ECF0F1] p-4 text-sm text-black mb-4 focus:outline-[#DD8A3E] focus:rounded-none h-12" type={props.type} maxLength={props.max} required={props.required} onChange={props.onChange} value={props.value} name={props.name} pattern={props.pattern} placeholder={props.placeHolder} minLength={props.min} max={props.maxDate} title={props.title}/>
    </div>
  )
}

export default InputComponent
