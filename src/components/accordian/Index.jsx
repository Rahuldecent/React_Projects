import React, { useState } from "react";
import data from "./data";
import "./style.css";

function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [mutliSelect, setMutliSelect] = useState([]);
  function handleSingalSelection(getid) {
    setSelected(getid === selected ? null : getid);
  }
  function handleMultiSelection(getid) {
    let cpyMultiple = [...mutliSelect];
    let currentIndex = cpyMultiple.indexOf(getid);
    if (currentIndex == -1) {
      cpyMultiple.push(getid);
    } else {
      cpyMultiple.splice(currentIndex, 1);
    }
    setMutliSelect(cpyMultiple);
  }
  console.log(selected, "selectedd");
  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <div className="item" key={item.id}>
                <div className="title" key={item.id}>
                  <h3
                    onClick={
                      enableMultiSelection
                        ? () => handleMultiSelection(item.id)
                        : () => handleSingalSelection(item.id)
                    }
                  >
                    {item.question}
                  </h3>
                  <span>+</span>
                </div>

                {enableMultiSelection
                  ? mutliSelect.indexOf(item.id) != -1 && (
                      <div className="content">{item.answer}</div>
                    )
                  : selected === item.id && (
                      <div className="content">{item.answer}</div>
                    )}
                {/* {selected === item.id ? (
                  <div className="content">{item.answer}</div>
                ) : null} */}
              </div>
            );
          })
        ) : (
          <div> No data Found ...</div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
