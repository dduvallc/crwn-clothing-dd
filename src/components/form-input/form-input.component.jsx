import './form-input.styles.scss'

// const FormInput equals a functional component thatt returns something
// Note: this replaces code in SignUpForm
const FormInput = ({label, ...otherProps}) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps} /> 
            {label && (
                <label 
                  className={`${
                    otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;