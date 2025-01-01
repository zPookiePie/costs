import styles from './Select.module.css'

function Select({text, name, value, options, handleOnChange}) {
return (
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}</label>
        <select required 
        name={name}
        id={name}
        onChange={handleOnChange} 
        value={value}
        >
            <option>Selecione uma opção</option>
            {options.map((option) => (
                <option required value ={option.id} key={option.id}>{option.name}</option>
            ))}
        </select>
    </div>
)
}

export default Select