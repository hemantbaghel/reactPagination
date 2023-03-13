import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./pagination.module.css"

function Pagination() {
  const [data, setData] = useState([]);
  const [page, setpage] = useState(1);
  
  
  useEffect(  () => {
      axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => {
        setData(res.data.products);
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("data", data);

  const selectPagination = (selectedPage)=>{
    if(selectedPage >=1 && selectedPage<=data.length/10 &&selectedPage !==page)
setpage(selectedPage)
  }

  return (
    <div className={style.main}>
    {data.length>0 && 
<div className={style.product}>
      { data.slice(page*10-10,page*10).map((item, index) => {
        return (
          <div className={style.product_single} key={item.id}>
            <img src={item.thumbnail} alt ={item.title} />
            <p>{item.title}</p>
          </div>
        );
      })}
      </div>
    }

    {
      data.length>0 && <div className={style.pagination}>
      <span onClick={()=> selectPagination(page-1)}>⏮</span>
      {
      [...Array(data.length/10)].map((_,i)=>{
return (<span className={page == i+1 ?style.pagination_selected:""}
   key={i} onClick={()=> selectPagination(i+1)}>
  {i+1}</span>)
      })
      }
     
      <span onClick={()=> selectPagination(page+1)}>⏯</span>
      
      </div>
    }
      
    </div>
  );
}
export default Pagination;
