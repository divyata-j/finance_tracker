import React, { useState } from "react";
import styled from "styled-components";
import { menuItems } from "../../utils/menuItems";
import { hamburger } from "../../utils/Icons";
import { useGlobalContext } from "../../context/globalContext";

function Navigation({ active, setActive }) {
  const { totalBalance } = useGlobalContext();
  const [nav, setNav] = useState(false);

  const NavStyled = styled.nav`
    width: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(1px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    .user-con {
      display: flex;
      align-items: center;
      gap: 1rem;

      h4 {
        color: rgba(34, 34, 96, 1);
      }
    }

    .menu-items {
      display: flex;
      align-items: center;
      gap: 1rem;

      li {
        font-weight: 500;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        color: #1a237e;

        &:hover {
          color: black;
        }

        span {
          margin-left: 0.5rem;
        }

        i {
          color: rgba(34, 34, 96, 0.6);
          font-size: 1.4rem;
          margin-right: 0.5rem;
        }
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;

      .menu-items {
        display: ${nav ? "flex" : "none"};
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        padding-left: 0;
      }
    }
  `;

  return (
    <NavStyled>
      <div className="user-con">
        <h4>Savings: {totalBalance()}</h4>
        <div className="x-button" onClick={() => setNav((prev) => !prev)}>
          {!nav ? <span>{hamburger}</span> : <span>X</span>}
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? "active" : ""}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </NavStyled>
  );
}

export default Navigation;
