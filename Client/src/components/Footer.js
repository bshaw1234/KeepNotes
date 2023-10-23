import React from "react"

const Footer=()=>{
    const year= new Date().getFullYear();
  return (<>
    <footer> copyright &copy; {year}</footer>
  </>
)};

export default Footer;