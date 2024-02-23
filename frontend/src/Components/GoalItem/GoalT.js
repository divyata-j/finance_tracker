import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  rupee,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
} from "../../utils/Icons";
import Button from "../Button/Button";

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;

      case "bank":
        return card;

      case "other":
        return piggy;
      default:
        return "";
    }
  };

  console.log("type", type);

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {rupee} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={"0rem"}
              bRad={"50%"}
              color={"brown"}
              iColor={"brown"}
              hColor={"var(--color-green)"}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
    background: white;
    border: 1px solid #8566f5;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 0.25rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: black;
    .icon{
        width: 80px;
        // height: 60px;
        // border-radius: 20px;
        // background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        // border: 2px solid #FFFFFF;
        i{
            font-size: 1rem;
        }
    }

    .content{
        display: flex;
        flex-direction: column;
        flex-wrap : wrap;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
            .text{
                display: flex;
                flex-direction: column;
                gap: .2rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-black);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem;
