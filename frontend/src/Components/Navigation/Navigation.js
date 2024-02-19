import React,{useState} from "react"
import styled from "styled-components"
import { menuItems } from "../../utils/menuItems"
import { hamburger } from "../../utils/Icons"
import { useGlobalContext } from "../../context/globalContext"

function Navigation({ active, setActive }) {
  const { totalBalance } = useGlobalContext()
  const [nav,setNav] = useState(true)

  const NavStyled = styled.nav`
  width: 200px;
  position:absolute;
  height: fit-content;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(1px);
  flex-direction:column;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display : ${nav?"flex":"none"};
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: #1a237e;
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: black !important;
    i {
      color: blue !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: red;
      // border-radius: 0 10px 10px 0;
    }
  }
`

  return (
    <NavStyled>
      <div className="user-con">
        <div className="text">
          <br/>
          <h4>Savings: {totalBalance()}</h4>
        </div>
        <div className="x-button" onClick={()=>setNav((prev)=>!prev)}>
          {
            !nav?<hamburger/>:<span>X</span>
          }
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          )
        })}
      </ul>
    </NavStyled>
  )
}



export default Navigation
