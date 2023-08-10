import React, {useState, useEffect} from 'react'
import menuLinks from "../components/data/menu_links.json"

function Header() {
  const [menuLinksData, setMenuLinksData] = useState([])
  const loadMenuLinksData = async ()=>{
    const response = await fetch("https://6g3judtks5.execute-api.eu-west-2.amazonaws.com/menu_links")
    console.log(response)
    const JSONData = await response.json()
    console.log(JSONData)
    setMenuLinksData(JSONData)
  }
  useEffect(()=>{
    loadMenuLinksData()
  },[])
  return (
    <header id="intro">
      <article className="fullheight">
        <div className="hgroup">
          <h1>Landon Hotel</h1>
          <h2>West London</h2>

          <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow"/></a></p>
        </div>
      </article>
      {menuLinksData.map((link)=><p>{link.name}</p>)}
      <nav id="nav">
        <div className="navbar">
          <div className="brand"><a href="#welcome">Landon <span>Hotel</span></a></div>
          <ul>
            
            {menuLinks.map((link)=>
              <li><a className={`icon ${link.class}`} href={link.href}><span>{link.text}</span></a></li>            
            )}

          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header