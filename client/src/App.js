import './App.css';
import {useEffect, useState} from "react";
import * as uuid from 'uuid';
import axios from "axios";


function App() {

    const [message, setMessage] = useState([])
    const [input, setInput] = useState('')

    const Submit = async(e) => {
        setInput('');
        e.preventDefault();
        await axios.post(process.env.REACT_APP_API_URL, {message: input, id: uuid.v4()});
    }

    useEffect(() => {
        Get()
    }, [])

    const Get = async() => {
        try {
            const data =
                await axios.get(process.env.REACT_APP_API_URL);
            setMessage(prev => [data.data, ...prev])
            await Get();
        } catch(e) {
            console.log(e);
            setTimeout(() => Get(), 5000);
        }

    }

    return (
        <div className="App">
            <div className={'form'}>
                <form>
                    <h3>A simple form</h3>
                    <input type={'text'} value={input}
                           onChange={e => setInput(e.target.value)}
                    />
                    <button onClick={Submit}>Post</button>
                </form>
            </div>
            {message.length != 0 && <div className={'messages'}>
                {message.map(item => {
                    return <div key={item.id}>id: {item.id} message: {item.message}</div>
                })}
            </div>
            }
        </div>
    );
}

export default App;
