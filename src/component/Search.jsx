import React, { useEffect, useState } from "react";
import List from "./List";
import "./search.css";

export default function Search() {
  const [userInput, setUserInput] = useState(" ");
  const [userOption, setUserOption] = useState("전체");
  const [sendOption, setSendOption] = useState("전체");
  const [sendUserInput, setSendUserInput] = useState("");
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleOption = (e) => {
    setUserOption(e.target.value);
  };

  return (
    <>
      <div className="SearchWrapper">
        <div>상품검색</div>
        <hr />
        <div className="Search">
          <div>검색</div>
          <select onChange={handleOption} className="Select">
            <option value="전체">전체</option>
            <option value="상품명">상품명</option>
            <option value="브랜드">브랜드</option>
            <option value="상품내용">상품내용</option>
          </select>
          <input onChange={handleChange}></input>
          <button
            className="Button"
            onClick={() => {
              setSendOption(userOption);
              setSendUserInput(userInput);
            }}
          >
            조회
          </button>
        </div>
      </div>
      검색된 데이터
      <List userInput={sendUserInput} userOption={sendOption} />
    </>
  );
}
