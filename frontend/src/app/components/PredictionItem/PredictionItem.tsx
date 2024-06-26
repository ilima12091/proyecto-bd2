"use client";
import React, { useMemo, useState } from "react";
import { Prediction } from "@/types/Prediction";

import "./styles.css";
import Image from "next/image";
import { getFormattedDate } from "@/utils/dateUtils";
import { findFlagUrlByCountryName } from "country-flags-svg";
import Button from "@/components/Button/Button";
import { createPrediction } from "@/services/predictionsService";
import { isNullOrUndefined } from "@/utils/numberUtils";

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
    homeFlag = findFlagUrlByCountryName(home),
    awayFlag = findFlagUrlByCountryName(away),
  } = props;

  const [predictionValues, setPredictionValues] = useState({
    homeGoals: homePrediction ?? "-",
    awayGoals: awayPrediction ?? "-",
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

  const isMatchFinished = new Date(date) < new Date();

  const showSaveButton =
    !isNullOrUndefined(predictionValues.homeGoals) &&
    !isNullOrUndefined(predictionValues.awayGoals) &&
    (+predictionValues.homeGoals !== +homePrediction ||
      +predictionValues.awayGoals !== +awayPrediction) &&
    !isMatchFinished;

  const matchResult = useMemo(() => {
    if ((isNullOrUndefined(homeGoals) || isNullOrUndefined(awayGoals)) && isMatchFinished)
      return "Esperando resultado";

    if (isMatchFinished) return `${homeGoals} - ${awayGoals}`;

    return "Por jugar";
  }, [homeGoals, awayGoals, isMatchFinished]);

  const resultStatus = useMemo(() => {
    if (isNullOrUndefined(homePrediction) || isNullOrUndefined(awayPrediction))
      return "failed";
    if (homeGoals === homePrediction && awayGoals === awayPrediction) return "success";
    if (homeGoals > awayGoals && homePrediction > awayPrediction)
      return "partial-success";
    if (homeGoals < awayGoals && homePrediction < awayPrediction)
      return "partial-success";
    if (
      homeGoals === awayGoals &&
      homePrediction === awayPrediction &&
      (homePrediction > awayPrediction || homePrediction < awayPrediction)
    )
      return "partial-success";

    return "";
  }, [homeGoals, awayGoals, homePrediction, awayPrediction]);

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
          isMatchFinished ? "prediction-input--disabled" : ""
        }`}
        maxLength={2}
        disabled={isMatchFinished}
        value={predictionValues?.homeGoals}
        onChange={(e) => handleChange("home", e.target.value)}
      />
      <div className="prediction-info">
        <p>VS</p>
        <p>{getFormattedDate(date)}</p>
        <p>{stage}</p>
        {showSaveButton ? <Button onClick={handleSave} label="Guardar" /> : null}
        <p className={`prediction-result prediction-result-${resultStatus}`}>
          {matchResult}
        </p>
      </div>
      <input
        className={`prediction-input ${
          isMatchFinished ? "prediction-input--disabled" : ""
        }`}
        maxLength={2}
        disabled={isMatchFinished}
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
