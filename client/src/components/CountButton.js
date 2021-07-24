import {useState} from 'react'
const CountButton = (props) => {
    const name = props.name
    function handleCount(event) {
        if (event.target.name === "backbutton") {
            props.setCount({...props.count, [name] :props.count[name] - 1})
        } else if (event.target.name === "forwardbutton") {
            props.setCount({...props.count, [name] :props.count[name] + 1})
        } else {
            props.setCount({...props.count, [name] :event.target.value})

        }
    }
    return (
        <span className="">
            <button type="button" name="backbutton" style={{ backgroundColor: "black", border: "0" }} onClick={handleCount}>
                <img src="/images/icons8-back-24.png" name="backbutton" alt="<" />
            </button>
            <input type='number' onChange={handleCount} value={props.count[name]} style={{ width: '2rem' }} className="text-center" />
            <button type="button" name="forwardbutton" min="0" style={{ backgroundColor: "black", border: "0" }} onClick={handleCount}>
                <img src="/images/icons8-forward-24.png" name="forwardbutton" alt=">" />
            </button>
        </span>
    )
}

export default CountButton