import React from 'react'

const InputComponent = (props: {for: string, max?: number, label: string, required: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, value: string | number, name: string, type: string, pattern?: string, placeHolder: string, error?: boolean, min?: number, maxDate?: string, }) => {
  return (
    <>
        <label htmlFor={props.for}>{props.label}</label>
        <input className={`border ${props.error ? "border-red-600" : "border-black"}`} type={props.type} maxLength={props.max} required={props.required} onChange={props.onChange} value={props.value} name={props.name} pattern={props.pattern} placeholder={props.placeHolder} minLength={props.min} max={props.maxDate}/>
    </>
  )
}

export default InputComponent
