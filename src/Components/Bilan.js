import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style/bilan.css";
function Bilan() {
  const [selectedDate, setselectedDate] = useState(null);
  return (
    <div className="datepicker">
      <span>Veuillez Choisir une date </span>
      <div className='input'>
      <div className="date">
        <DatePicker
          className="try"
          selected={selectedDate}
          onChange={(date) => setselectedDate(date)}
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()}
          showYearDropdown
          scrollableMonthYearDropdown
        />
      </div>
      <button class="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="60"
          fill="currentColor"
          class="bi bi-arrow-right-short"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
          />
        </svg>
      </button>
      </div>
    </div>
  );
}

export default Bilan;
