import React from "react";
import MaskedInput from "react-text-mask";
import { Field } from "formik";

export const mask = "+7 (___) ___ __ __";

const Input = ({ field }, props) => {
  return (
    <MaskedInput
      {...field}
      disabled={props.disabled}
      className="form-control"
      placeholder={mask}
      id="phone"
      keepCharPositions={false}
      mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
    />
  );
}


const PhoneInput = (props) => <Field {...props} render={renderProps => Input(renderProps, props)} />;

export default PhoneInput;
