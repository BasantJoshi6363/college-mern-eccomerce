import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import PageNot from "./PageNot";
const ByCat = () => {
  const url = window.location.href.split("/")[3];
  const [result, setResult] = useState([]);
  let navigate = useNavigate()

  const fetchData = async () => {
    try {
      const resp = await axios.get(
        `https://fakestoreapi.com/products/category/${url}`,
      );
      setResult(resp.data);
      if(resp.data.length == 0){
        navigate(<PageNot />)
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4">
        {result.map((val, i) => {
          return <Product key={i}></Product>;
        })}
      </div>
    </div>
  );
};

export default ByCat;
