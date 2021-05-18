import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style/bilan.css";
import "./style/table.css";
import _ from "underscore";
import BilanService from "../services/bilan.service";
import MyToast from "./MyToast";
import "./globale";

function Bilan() {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const [selectedDate, setselectedDate] = useState(null);
  const [allBilan, setallBilan] = useState([]);
  const [allResultat, setallResultat] = useState([]);
  const [total, settotal] = useState([]);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    BilanService.getallbilan(global.qr).then(
      (response) => {
        const bilan = response.data;

        setallBilan(bilan);
        settotal([]);
        setallResultat([]);
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }, []);

  function fetchbilan() {
    settotal([]);
    setallResultat([]);
    allBilan.map((resultatone) => {
      if (resultatone.date == selectedDate.toISOString().substring(0, 10)) {
        allResultat.push(resultatone);
        total.push(resultatone.total);
      }
    });

    if (allResultat.length == 0) {
      // alert("pas d'element enregistré sous cette date");
      setvisible(true);
      setTimeout(
        function () {
          setvisible(false);
        }.bind(this),
        2000
      );
    } else {
      setvisible(false);
      global.bilan = allResultat;
      global.total = total;
    }
  }

  function show() {
    return global.bilan.map(function (menuone) {
      return (
        <tr>
          <td id="numerotation"></td>
          <td>{menuone.total} DH</td>
        </tr>
      );
    });
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: "0px", right: " 0px" }}>
        <MyToast
          show={visible}
          message={"Pas de commandes enregistrées sous cette date"}
          type={"danger"}
        />
      </div>
      <div className="datepicker">
        <span>Veuillez Choisir une date </span>
        <div className="input">
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
          <div style={{ marginLeft: "-90px", width: "fitContent" }}>
            <button class="btn" onClick={() => fetchbilan()}>
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
      </div>
      <div id="tableall">
        <div style={{ width: "80%" }}>
          <table id="customers">
            <tr>
              <th>#Commande</th>
              <th>Prix</th>
            </tr>
            {show()}
          </table>
          <table id="customers">
            <tr>
              <th style={{ width: "70.5%" }}>Total</th>
              <th id="total">{global.total.reduce(reducer)} DH </th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Bilan;
