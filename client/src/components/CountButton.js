const CountButton = ({name, count, setCount}) => {
    function handleCount(event) {
        if (event.target.name === "backbutton") {
            setCount({...count, [name] :count[name] - 1})
        } else if (event.target.name === "forwardbutton") {
            setCount({...count, [name] :count[name] + 1})
        } else {
            setCount({...count, [name] :event.target.value})

        }
    }
    return (
        <>
            <button type="button" name="backbutton" style={{ backgroundColor: "black", border: "0" }} onClick={handleCount}>
                <img src="/images/icons8-back-24.png" name="backbutton" alt="<" />
            </button>
            <input type='number' onChange={handleCount} value={count[name]} style={{ width: '2rem' }} className="text-center" />
            <button type="button" name="forwardbutton" min="0" style={{ backgroundColor: "black", border: "0" }} onClick={handleCount}>
                <img src="/images/icons8-forward-24.png" name="forwardbutton" alt=">" />
            </button>
        </>
    )
}

export default CountButton