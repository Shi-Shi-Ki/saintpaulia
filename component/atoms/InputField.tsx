"use client"

import { forwardRef, Ref } from "react"

interface ITextField extends React.ComponentPropsWithRef<"input"> {
  hintText?: string
  errorMessage?: string
}

const InputField = forwardRef<HTMLInputElement, ITextField>(
  ({ hintText, errorMessage, className = "", ...props }, ref: Ref<HTMLInputElement>) => {
    return (
      <fieldset className="fieldset">
        {hintText && <legend className="fieldset-legend">{hintText}</legend>}
        <input
          ref={ref}
          className={`input ${errorMessage ? "border-error" : ""} ${className}`}
          {...props}
        />
        {errorMessage ? (
          <p className="label text-error">{errorMessage}</p>
        ) : (
          <p className="label">&nbsp;</p>
        )}
      </fieldset>
    )
  }
)

InputField.displayName = InputField.name

export default InputField
