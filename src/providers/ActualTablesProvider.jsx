import { useEffect, useState, useCallback } from "react";
import { ActualTablesContext } from "../context/ActualTablesContext";
import { useDatabase } from "../hooks/useDatabase";
import { useFlavour } from "../hooks/useFlavour";

export function ActualTablesProvider({ children }) {

  const { supabase } = useDatabase();
  const { flavourId } = useFlavour();

  const [actualTable, setActualTable] = useState([]);
  const [actualTableMap, setActualTableMap] = useState({});

  const [loadingState, setLoadingState] = useState({
    loading: true,
    message: "Loading league table...",
  });

  const refreshActualTable = useCallback(async () => {

    if (!flavourId) {
      setActualTable([]);
      setActualTableMap({});
      setLoadingState({
        loading: false,
        message: "No flavour loaded",
      });
      return;
    }

    setLoadingState({
      loading: true,
      message: "Fetching league table...",
    });

    try {

      const { data, error } = await supabase.rpc(
        "get_league_table_actual",
        {
          p_flavour_id: flavourId,
        }
      );

      if (error) throw error;

      const list = data || [];

      setActualTable(list);

      setActualTableMap(
        Object.fromEntries(
          list.map(team => [
              `${team.group_letter ?? "league"}-${team.team_id}`,
              team
            ])
        )
      );

      setLoadingState({
        loading: false,
        message: "",
      });

    } catch (error) {

      console.error(
        "Failed to load actual league table:",
        error
      );

      setLoadingState({
        loading: false,
        message: "Failed to load league table",
      });

    }

  }, [supabase, flavourId]);

  // initial + flavour change
  useEffect(() => {
    refreshActualTable();
  }, [refreshActualTable]);

  // realtime results refresh
  useEffect(() => {

    const channel = supabase
      .channel("actual-tables-provider")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "results",
        },
        () => refreshActualTable()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, [supabase, refreshActualTable]);

  return (
    <ActualTablesContext.Provider
      value={{
        actualTable,
        actualTableMap,
        actualTablesLoading: loadingState.loading,
        actualTablesLoadingMessage: loadingState.message,
        refreshActualTable,
      }}
    >
      {children}
    </ActualTablesContext.Provider>
  );
}