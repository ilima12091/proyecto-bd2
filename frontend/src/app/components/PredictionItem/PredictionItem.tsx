"use client";
import React, { useState } from "react";
import { Prediction } from "@/types/Prediction";

import "./styles.css";
import Image from "next/image";
import { getFormattedDate } from "@/utils/dateUtils";
import { findFlagUrlByCountryName } from "country-flags-svg";
import Button from "@/components/Button/Button";
import { createPrediction } from "@/services/predictionsService";
import { useRouter } from "next/navigation";

type PredictionProps = Prediction & {
  refetchData: () => void;
};

export default function PredictionItem(props: Readonly<PredictionProps>) {
  const {
    home,
    away,
    date,
    homeGoals,
    homePrediction,
    awayGoals,
    awayPrediction,
    stage,
    matchId,
    refetchData,
  } = props;

  const homeFlag = findFlagUrlByCountryName(home);
  const awayFlag = findFlagUrlByCountryName(away);

  const [predictionValues, setPredictionValues] = useState({
    homeGoals: homeGoals ?? homePrediction ?? "",
    awayGoals: awayGoals ?? awayPrediction ?? "",
  });

  const handleChange = (team: "home" | "away", value: string) => {
    setPredictionValues((prevState) => ({
      ...prevState,
      [`${team}Goals`]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await createPrediction(
        1,
        predictionValues.homeGoals,
        predictionValues.awayGoals,
        matchId
      );
      refetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const disableInputs = new Date(date) < new Date();

  const showSaveButton =
    predictionValues.homeGoals &&
    predictionValues.awayGoals &&
    (predictionValues.homeGoals !== homePrediction ||
      predictionValues.awayGoals !== awayPrediction) &&
    !disableInputs;

  return (
    <div className="prediction">
      <div className="prediction-country">
        <Image
          alt={home}
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
        value={predictionValues?.homeGoals}
        onChange={(e) => handleChange("home", e.target.value)}
      />
      <div className="prediction-info">
        <p>VS</p>
        <p>{getFormattedDate(date)}</p>
        <p>{stage}</p>
        {showSaveButton ? <Button onClick={handleSave} label="Guardar" /> : null}
      </div>
      <input
        className={`prediction-input ${
          disableInputs ? "prediction-input--disabled" : ""
        }`}
        maxLength={2}
        disabled={disableInputs}
        value={predictionValues?.awayGoals}
        onChange={(e) => handleChange("away", e.target.value)}
      />
      <div className="prediction-country">
        <Image
          alt={away}
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
