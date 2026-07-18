import { useRef, useState, useCallback } from "react";
import { PredictedTablesContext } from "../context/PredictedTablesContext";
import { useDatabase } from "../hooks/useDatabase";
import { useFlavour } from "../hooks/useFlavour";

export function PredictedTablesProvider({ children }) {

  const { supabase } = useDatabase();
  const { flavourId } = useFlavour();

  const [predictedTables, setPredictedTables] = useState({});
  const [tableLoadingState, setTableLoadingState] = useState({});

  const predictedTablesRef = useRef({});

  const loadPredictedTable = useCallback(async (profileId, force = false) => {

    if (!flavourId || !profileId) return;
    const cacheKey = `${flavourId}-${profileId}`;
    if (!force && predictedTables[cacheKey]) {return;}

    setTableLoadingState(prev => ({
      ...prev,
      [cacheKey]: true
    }));

    try {

      const { data, error } = await supabase.rpc(
        "get_league_table_prediction",
        {
          p_flavour_id: flavourId,
          p_profile_id: profileId,
        }
      );

      if (error) throw error;

      setPredictedTables(prev => {

        const updated = {
          ...prev,
          [cacheKey]: data || []
        };

        predictedTablesRef.current = updated;

        return updated;
      });

    } catch (error) {

      console.error(
        "Failed to load predicted league table:",
        error
      );

    } finally {

      setTableLoadingState(prev => ({
        ...prev,
        [cacheKey]: false
      }));
    }

  }, [supabase, flavourId]);

  const refreshPredictedTable = useCallback(async (profileId) => {

    if (!flavourId || !profileId) return;

    const cacheKey = `${flavourId}-${profileId}`;

    setTableLoadingState(prev => ({
      ...prev,
      [cacheKey]: true
    }));

    try {
      const { data, error } = await supabase.rpc(
        "get_league_table_prediction",
        {
          p_flavour_id: flavourId,
          p_profile_id: profileId,
        }
      );

      if (error) throw error;

      setPredictedTables(prev => {
        const updated = {
          ...prev,
          [cacheKey]: data || []
        };
        predictedTablesRef.current = updated;
        return updated;
      });

    } catch (error) {
      console.error(
        "Failed to refresh predicted league table:",
        error
      );
    } finally {
      setTableLoadingState(prev => ({
        ...prev,
        [cacheKey]: false
      }));
    }

  }, [supabase, flavourId]);


  const getPredictedTable = useCallback((profileId) => {
    if (!profileId) return [];
    const cacheKey = `${flavourId}-${profileId}`;
    return predictedTables[cacheKey] ?? [];
  }, [predictedTables, flavourId]);


  const isPredictedTableLoading = useCallback((profileId) => {
    if (!profileId) return false;
    const cacheKey = `${flavourId}-${profileId}`;
    return tableLoadingState[cacheKey] ?? false;
  }, [tableLoadingState, flavourId]);


  return (
    <PredictedTablesContext.Provider
      value={{
        loadPredictedTable,
        refreshPredictedTable,
        getPredictedTable,
        isPredictedTableLoading,
      }}
    >
      {children}
    </PredictedTablesContext.Provider>
  );
}