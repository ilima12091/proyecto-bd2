<<<<<<< HEAD
"use client";
import React, { useMemo, useState } from "react";
=======
import React from "react";
>>>>>>> 2ce0e06 (Se agrega parte de la pantalla de predicciones y el módulo de predicciones sin terminar en el backend)
import { Prediction } from "@/types/Prediction";

import "./styles.css";
import Image from "next/image";
import { getFormattedDate } from "@/utils/dateUtils";
import { findFlagUrlByCountryName } from "country-flags-svg";
<<<<<<< HEAD
import Button from "@/components/Button/Button";
import { createPrediction } from "@/services/predictionsService";
import { isNullOrUndefined } from "@/utils/numberUtils";

type PredictionProps = Prediction & {
  refetchData: () => void;
};

export default function PredictionItem(props: Readonly<PredictionProps>) {
=======

export default function PredictionItem(props: Readonly<Prediction>) {
>>>>>>> 2ce0e06 (Se agrega parte de la pantalla de predicciones y el módulo de predicciones sin terminar en el backend)
  const {
    home,
    away,
    date,
    homeGoals,
    homePrediction,
    awayGoals,
    awayPrediction,
    stage,
<<<<<<< HEAD
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
=======
  } = props;

  const disableInputs = new Date(date) < new Date();

  const homeFlag = findFlagUrlByCountryName(home);
  const awayFlag = findFlagUrlByCountryName(away);
>>>>>>> 2ce0e06 (Se agrega parte de la pantalla de predicciones y el módulo de predicciones sin terminar en el backend)

  return (
    <div className="prediction">
      <div className="prediction-country">
        <Image
<<<<<<< HEAD
          alt={home}
=======
          alt="Uruguay"
>>>>>>> 2ce0e06 (Se agrega parte de la pantalla de predicciones y el módulo de predicciones sin terminar en el backend)
          src={homeFlag}
          className="prediction-flag"
          width={80}
          height={60}
        />
        <p>{home}</p>
      </div>
      <input
        className={`prediction-input ${
<<<<<<< HEAD
          isMatchFinished ? "prediction-input--disabled" : ""
        }`}
        maxLength={2}
        disabled={isMatchFinished}
        value={predictionValues?.homeGoals}
        onChange={(e) => handleChange("home", e.target.value)}
=======
          disableInputs ? "prediction-input--disabled" : ""
        }`}
        maxLength={2}
        disabled={disableInputs}
        defaultValue={homeGoals ?? homePrediction ?? ""}
>>>>>>> 2ce0e06 (Se agrega parte de la pantalla de predicciones y el módulo de predicciones sin terminar en el backend)
      />
      <div className="prediction-info">
        <p>VS</p>
        <p>{getFormattedDate(date)}</p>
        <p>{stage}</p>
<<<<<<< HEAD
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
=======
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
>>>>>>> 2ce0e06 (Se agrega parte de la pantalla de predicciones y el módulo de predicciones sin terminar en el backend)
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
