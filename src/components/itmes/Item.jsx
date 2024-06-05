import React from 'react'
import './Item.css'


const Item = ({contestName,rank,oldRating,newRating}) => {
  return (


    <div className="container">
             
        <div className="card"> <span className='span'>Contest Name: </span>{contestName}</div>
        <div className="card"><span className='span'>Rank: </span>{rank}</div>
        <div className="card"><span className='span'>Old Rating: </span>{oldRating}</div>
        <div className="card"><span className='span'>New Rating: </span> {newRating}</div>

      
        
    </div>

  )
}

export default Item