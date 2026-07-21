import { ActualTablesProvider } from "./ActualTablesProvider";
import { PredictedTablesProvider } from "./PredictedTablesProvider";

export function TablesProvider({ children }) {
  return (
    <ActualTablesProvider>
      <PredictedTablesProvider>
        {children}
      </PredictedTablesProvider>
    </ActualTablesProvider>
  );
}