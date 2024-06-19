import { getPredictionsByUserId } from "@/services/predictionsService";
import List from "@/components/List/List";
import PredictionItem from "./components/PredictionItem/PredictionItem";

import "./styles.css";

export default async function Home() {
  const predictions = await getPredictionsByUserId(1);
  console.log(predictions);
  return (
    <main className="predictions">
      <h1 className="predictions-title">Mis predicciones</h1>
      <List
        data={predictions}
        ItemComponent={PredictionItem}
        className="predictions-list"
      />
    </main>
  );
}
