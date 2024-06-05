import React from 'react'
import './Input.css'
import { useNavigate } from 'react-router-dom';

const Input = () => {
    const navigate = useNavigate();


    return (
        <>

            <div className="container1">

                <div className="heading">React.Js App Based On Codeforces-API</div>
                <div className="btn-container">


                    <button className='Button' onClick={() => {
                        navigate("/Search")
                    }}>Search</button>

                    <button className='Button' onClick={() => {
                        navigate("/Compare")
                    }}>Compare</button>
                </div>
                <div className="heading1">@Madeby-RahulMali</div>


            </div>

        </>
    )
}

export default Input