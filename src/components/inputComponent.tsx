
import React, { useEffect, useState } from 'react'

type Props = {
  onChange: (value: string) => void
  name: string
  validator?: (value: string) => string | undefined
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
}

const InputComponent = ({ onChange, name, validator, placeholder, type }: Props) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!errorMessage) {
      onChange(value)
    }
  }, [value])

  const onInputChange = (value: string) => {
    if (!validator) {
      setValue(value)
      return
    }

    const errorMessage = validator(value)

    if (!errorMessage) {
      setValue(value)
      return
    }

    setValue(value)
    setErrorMessage(errorMessage)
  }

  return (
    <div>
      <label htmlFor={name} className='className="text-sm text-gray-300 mb-2"'>
        {name}
      </label>
      <input value={value} onChange={(e) => onInputChange(e.target.value)}
        className='p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder={placeholder}
        type={type}
      />
      <p className='text-red-500'>{errorMessage}</p>
    </div>
  )
}

export default InputComponent
