import React from 'react'
import { Chart as ChartJS, Title, defaults, plugins } from 'chart.js/auto'
import { useState,useEffect } from 'react';
import './Search.css'

import { toast } from 'react-toastify';

import Item from '../itmes/Item'

import { Line, Bar } from "react-chartjs-2"
import { useNavigate } from 'react-router-dom'

const Search = () => {

    const navigate = useNavigate();


    const [input, setinput] = useState("");

    const [result, setresult] = useState([])

    const onsubmitHandler = (e) => {
        e.preventDefault();
    
        const url = `https://codeforces.com/api/user.rating?handle=${input}`;
    
        fetch(url)
            .then(response => {
                if (!response.ok) {
                   
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(data => {
                if (data.status !== 'OK') {
                  
                    throw new Error('Error in or API response');
                }
                setresult(data.result);
                toast("Data fetched successfully!"); 
            })
            .catch(error => {
                toast("Please check the input and try again."); 
            });
    }


    
    useEffect(() => {
        setresult([]);
    }, [input]);

    defaults.maintainAspectRatio = false;
    defaults.responsive = true;
    defaults.plugins.title.display = true;
    defaults.plugins.title.font.size = "20px";
    return (
        <div>

            <div className="form">


                <form onSubmit={onsubmitHandler} action="">
                    <input className='input1' type="text" value={input} onChange={(event) => {
                        setinput(event.target.value)
                    }} placeholder='type name here' />

                    <button className='button' type='submit' >Search</button>
                    <button  className='button' onClick={()=>{
                    navigate("/")
                }}>Back</button>

                </form>
            </div>


            <div className="container">

                {
                    result ?
                        result.map((items, key) => {
                            return <Item key={key} contestName={items.contestName} rank={items.rank} oldRating={items.oldRating} newRating={items.newRating}></Item>
                        }) : <div className='warning'>USER NOT EXISTS</div>

                    }

            </div>
            


            <div className="chart">
                    <Line
                        data={{
                            labels: result.map((data) => data.contestName),
                            datasets: [
                                {
                                    label: "Rating",
                                    data: result.map((data) => data.newRating),
                                    backgroundColor: "#007bff"
                                },
                            ],
                        }}
                        options={
                            {
                                plugins: {
                                    title: {
                                        text: "Line Chart of Contest Name VS New Rating",
                                    },
                                },
                            }}>


                    </Line>
                </div>



                <div className="chart">
                    <Bar
                        data={{
                            labels: result.map((data) => data.contestName),
                            datasets: [
                                {
                                    label: "Rank",
                                    data: result.map((data) => data.rank),
                                    backgroundColor: "#007bff"
                                },
                            ],
                        }}
                        options={
                            {
                                plugins: {
                                    title: {
                                        text: "Bar Chart of Contest Name Vs Rank",
                                    },
                                },
                            }}>


                    </Bar>
                </div>



        </div>

    )
}

export default Search