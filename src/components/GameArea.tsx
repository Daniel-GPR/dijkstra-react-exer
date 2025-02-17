import { useEffect, useState } from "react";
import { CannonBall } from "./CannonBall";
import { useControl } from "../Services/ControlDataContext";

export function GameArea() {
  const [updater, setUpdater] = useState<boolean>(false);
  const { isPaused, cannonMaster } = useControl();

  useEffect(() => {
    if (!isPaused) {
      const ticker = setTimeout(() => {
        setUpdater(!updater);
        cannonMaster.runUpdate();
      }, cannonMaster.updateTickRate);
      return () => {
        clearTimeout(ticker);
      };
    }
  }, [updater, isPaused]);

  return (
    <>
      {cannonMaster.cannonInstances.map((instance) => (
        <CannonBall key={instance.id} {...instance} />
      ))}
    </>
  );
}
