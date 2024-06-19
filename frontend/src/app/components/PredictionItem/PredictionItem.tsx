import React from "react";
import { Prediction } from "@/types/Prediction";

import "./styles.css";
import Image from "next/image";
import { getFormattedDate } from "@/utils/dateUtils";
import { findFlagUrlByCountryName } from "country-flags-svg";

export default function PredictionItem(props: Readonly<Prediction>) {
  const {
    home,
    away,
    date,
    homeGoals,
    homePrediction,
    awayGoals,
    awayPrediction,
    stage,
  } = props;

  const disableInputs = new Date(date) < new Date();

  const homeFlag = findFlagUrlByCountryName(home);
  const awayFlag = findFlagUrlByCountryName(away);

  return (
    <div className="prediction">
      <div className="prediction-country">
        <Image
          alt="Uruguay"
          src={homeFlag}
          className="prediction-flag"
          width={80}
          height={60}
        />
        <p>{home}</p>
      </div>
      <input
        className={`prediction-input ${
          disableInputs ? "prediction-input--disabled" : ""
        }`}
        maxLength={2}
        disabled={disableInputs}
        defaultValue={homeGoals ?? homePrediction ?? ""}
      />
      <div className="prediction-info">
        <p>VS</p>
        <p>{getFormattedDate(date)}</p>
        <p>{stage}</p>
      </div>
      <input
        className={`prediction-input ${
          disableInputs ? "prediction-input--disabled" : ""
        }`}
        maxLength={2}
        disabled={disableInputs}
        defaultValue={awayGoals ?? awayPrediction ?? ""}
      />
      <div className="prediction-country">
        <Image
          alt="Argentina"
          src={awayFlag}
          className="prediction-flag"
          width={80}
          height={60}
        />
        <p>{away}</p>
      </div>
    </div>
  );
}
