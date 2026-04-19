
// const FormInput equals a functional component thatt returns something
// Note: this replaces code in SignUpForm
const FormInput = ({label, ...otherProps}) => {
    return (
        <div>
            <label>{label}</label>
            <input
                {...otherProps}
            />
        </div>
    )
};

export default FormInput;