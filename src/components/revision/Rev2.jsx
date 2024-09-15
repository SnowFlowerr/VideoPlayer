import React, { useState } from 'react'

export default function Rev2() {
    const countries=[
        {name:'India',value:'IN',cities:['Delhi','Mumbai']},
        {name:"Pak",value:"PK",cities:['Lahore','Karachi']},
        {name:"Bangladesh",value:"BG",cities:['Dhaka','Chittagong']}
    ]
    const [country,setCountry]=useState("");
    const [city,setCity]=useState("");
    function handleChange(e){
        e.preventDefault();
        if(e.target.name==="country"){
            setCountry(e.target.value)
            setCity("")
        }
        else{
            setCity(e.target.value)
        }
    }
    return (
        <div>
            <select name='country' onChange={handleChange}>
                <option value={""} disabled selected>--</option>
                {
                    countries.map((item,ind)=>
                        <option value={item.name} key={ind}>{item.name}</option>
                    )
                }
            </select>
            {country &&
                countries.map((item,ind)=>
                    item.name===country &&
                    <select name='city' onChange={handleChange}>
                        <option value={""} disabled selected>--</option>
                        {
                            item.cities.map((city)=>
                                <option value={city}>{city}</option>
                            )
                        }
                    </select>
                )
            }
            {country && city && (`Country is ${country} and City is ${city}`)}
        </div>
    )
}
