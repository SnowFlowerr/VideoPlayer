import { useState } from "react";

export default function App() {
    const arr = ["mango", "apple", "banana"];
    const [copyArr, setcopyArr] = useState(arr);
    const [check, setCheck] = useState([false, false, false]);
    function handleCheck(ind) {
        check[ind] = !check[ind];
        setCheck([...check]);
    }
    function handleDel(ind) {
        setcopyArr(copyArr.filter((ele, i) => ind !== i));
        setCheck(check.filter((ele, i) => ind !== i));
    }
    return (
        <div className="App">
            <ul>
                {copyArr.map((item, ind) => (
                    <li>
                        {check[ind] === true ? (
                            <input type="checkbox" checked onClick={() => handleCheck(ind)} />
                        ) : (
                            <input type="checkbox" onClick={() => handleCheck(ind)} />
                        )}
                        {item}
                        {check[ind] === true ? (
                            <button onClick={() => handleDel(ind)}>Delete</button>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
}
