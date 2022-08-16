const Filter = ({ value, handleChange }) => {
    return (
        <form>
        <div>
          filter shown with
          <input 
          value={value}
          onChange={handleChange}
          />
        </div>
      </form>
    )
}

export default Filter