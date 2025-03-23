import React, { useEffect, useState } from "react";
// useState and useEffect are hooks (functionality) in React

import axios from "axios";      // helps in API calls  axios is a library to call APIs



function Page1() {
  const [data, setData] = useState(null); // const is used so that page doesn't refresh again and again
  // useState() is used when data is dynamic

  // variable type [variable-name(getter) , function-to-set-variable(setter)] = useState(byDefaultValue)
  // 1. whenever the page loads, data variable is created
  // 2. setData is used to update variable data
  // 3. by default, the value of variable is value passed in useState() 

  const [data1, setData1] = useState (1) ;
  function onclickhandel() {
    setData1 (data1 + 1) ;
  }
  console.log(data1) ;
  // setData1(5) ;

  useEffect(() => {

    axios

      .get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m")
      // method.(api-link)

      .then((response) => setData(response.data))

      .catch((error) => console.error("Error fetching data:", error));

  }, [data1]);       // [] : dependency array 

  console.log (data) ;
 
  // condition to run useEffect :
  // 1. Page must reload
  // 2. The variable which are passed in dependency array must change

  // if (!data) return <p>Loading...</p>;
 
  return (
    <>
      <h1>Hello</h1>
      <h2>Get Lost</h2>
      <button onClick={onclickhandel} >Refresh</button>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
      
    </>
  )
}

export default Page1 ;