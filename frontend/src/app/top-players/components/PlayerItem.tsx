import React from "react";
import { Player } from "@/types/Player";

import "./styles.css";

type PlayerItemProps = Player & {
  index: number;
};

export default function PlayerItem(props: Readonly<PlayerItemProps>) {
  const { name, totalPoints, index } = props;

  return (
    <div className="player">
      <p>{`${index + 1}. ${name}`}</p>
      <p>{totalPoints ?? 0} PTS</p>
    </div>
  );
}
