import React from 'react'
import { Chart as ChartJS, Title, defaults, plugins } from 'chart.js/auto'
import { useState,useEffect } from 'react';

import './Compare.css'

import { Line, Bar } from "react-chartjs-2"
import { useNavigate } from 'react-router-dom'
import Item from '../itmes/Item';
import { toast } from 'react-toastify';


const Compare = () => {
    const navigate = useNavigate();



    const [CompareoneResult, setCompareoneResult] = useState([]);
    const [ComparetwoResult, setComparetwoResult] = useState([]);

    const [oneCompareInput, setoneCompareInput] = useState("");
    const [twoCompareInput, settwoCompareInput] = useState("");


    const onCompareSubmitHandler = async (e) => {
        e.preventDefault();
    
        try {
            const oneurl = `https://codeforces.com/api/user.rating?handle=${oneCompareInput}`;
            const twourl = `https://codeforces.com/api/user.rating?handle=${twoCompareInput}`;
    
          
            const [oneResponse, twoResponse] = await Promise.all([
                fetch(oneurl),
                fetch(twourl)
            ]);
    
           
            if (!oneResponse.ok || !twoResponse.ok) {
                throw new Error('Failed to fetch user data');
            }
    
            const [oneData, twoData] = await Promise.all([
                oneResponse.json(),
                twoResponse.json()
            ]);
    
            if (oneData.status !== 'OK' || twoData.status !== 'OK') {
                throw new Error('Failed to fetch user data');
            }
    
            setCompareoneResult(oneData.result);
            setComparetwoResult(twoData.result);
            
            toast("Data fetched successfully!");
        } catch (error) {
            toast("Please check the input and try again.");
        }
    };
    

    const oneNames = new Set(CompareoneResult.map(data => data.contestName));
    const twoNames = new Set(ComparetwoResult.map(data => data.contestName));
    
    const commonNames = [...oneNames].filter(name => twoNames.has(name));
    
    const filteredCompareoneResult = CompareoneResult.filter(data => commonNames.includes(data.contestName));
    const filteredComparetwoResult = ComparetwoResult.filter(data => commonNames.includes(data.contestName));
    
    const newRatingsOne = filteredCompareoneResult.map(data => data.newRating);
    const newRatingsTwo = filteredComparetwoResult.map(data => data.newRating);
    
    const RankOne = filteredCompareoneResult.map(data => data.rank);
    const RankTwo = filteredComparetwoResult.map(data => data.rank);


    useEffect(() => {
        setCompareoneResult([]);
        setComparetwoResult([]);
      
       
    }, [oneCompareInput]);

    defaults.maintainAspectRatio = false;
    defaults.responsive = true;
    defaults.plugins.title.display = true;
    defaults.plugins.title.font.size = "20px";
    return (
        <>
        <div className="form">


            <form onSubmit={onCompareSubmitHandler} action="">
                <input className='input' type="text" value={oneCompareInput} onChange={(event) => {
                    setoneCompareInput(event.target.value)
                }} placeholder='type name here' />
                <input className='input' type="text" value={twoCompareInput} onChange={(event) => {
                    settwoCompareInput(event.target.value)
                }} placeholder='type name here' />

                <button className='button' type='submit' >Compare</button>
                <button  className='button' onClick={()=>{
                    navigate("/")
                }}>Back</button>

            </form>
           </div>
           <div className="container">


            {
                CompareoneResult?
                CompareoneResult.map((items, key) => {
                    return <Item key={key} contestName={items.contestName} rank={items.rank} oldRating={items.oldRating} newRating={items.newRating}></Item>
                }):<div className='warning'>USER NOT EXISTS</div>
                
            }
           </div>


            <div className="chart">
                <Line
                    data={{
                        labels:commonNames,
                        datasets: [
                            {
                                label: "Rating of First",
                                data: newRatingsOne,
                                backgroundColor: "#007bff"
                            },
                            {
                                label: "Rating of Second",
                                data: newRatingsTwo,
                                backgroundColor: "yellow"
                            },
                        ],
                        
                    }}
                    options={
                        {
                            plugins: {
                                title: {
                                    text: "LINE CHART OF COMMON CONTEST NAME VS RATING",
                                },
                            },
                        }}>


                </Line>
            </div>



            <div className="chart">
                <Bar
                    data={{
                        labels: commonNames,
                        datasets: [
                            {
                                label: "Rank of First",
                                data: RankOne,
                                backgroundColor: "#007bff"
                            },
                            {
                                label: "Rank of Second",
                                data: RankTwo,
                                backgroundColor: "yellow"
                            },
                        ],
                    }}
                    options={
                        {
                            plugins: {
                                title: {
                                    text: "BAR CHART OF COMMON CONTEST NAME VS RANK",
                                },
                            },
                        }}>


                </Bar>
            </div>

                            </>



    )
}

export default Compare