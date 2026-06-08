import { useEffect, useState, useCallback } from "react";
import { PredictionsContext } from "../context/PredictionsContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";

export function PredictionProvider({ children, flavourId }) {
  const { supabase } = useDatabase();

  const { profile } = useAuth();
  const profileId = profile?.profile_id;

  const [predictions, setPredictions] = useState([]);
  const [predictionsMap, setPredictionsMap] = useState({});
  const [loadingState, setLoadingState] = useState({
    loading: true,
    message: "Loading predictions...",
  });

  const refreshPredictions = useCallback(async () => {
    if (!profileId) {
      setLoadingState({
        loading: false,
        message: "No profile loaded",
      });
      return;
    }

    setLoadingState({
      loading: true,
      message: "Fetching predictions...",
    });

    try {
      const { data, error } = await supabase.rpc(
        "get_user_flavour_predictions",
        {
          p_flavour_id: flavourId ?? 1,
          p_profile_id: profileId,
        }
      );

      if (error) throw error;

      const list = data || [];

      setPredictions(list);
      
      setPredictionsMap(
        Object.fromEntries(
          list.map(p => [p.fixture_id, p])
        )
      );

      setLoadingState({
        loading: false,
        message: "",
      });
    } catch (error) {
      console.error("Failed to load predictions:", error);

      setLoadingState({
        loading: false,
        message: "Failed to load predictions",
      });
    }
  }, [supabase, flavourId, profileId]);

  useEffect(() => {
    if (!profileId) return;
    refreshPredictions();
  }, [profileId, refreshPredictions]);

  const submitPredictions = useCallback(async (payloads) => {
    if (!payloads?.length) return;
  
    try {
      const { error } = await supabase.rpc("upsert_predictions", {
        predictions: payloads,
      });
  
      if (error) throw error;
  
      // IMPORTANT: keep UI consistent
      refreshPredictions();
  
    } catch (error) {
      console.error("Failed to submit predictions:", error);
      throw error;
    }
  }, [supabase, refreshPredictions]);

  useEffect(() => {
    const channel = supabase
      .channel("predictions-provider")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "predictions",
        },
        () => {
          refreshPredictions();
        }
      )

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "prediction_scores",
        },
        () => {
          refreshPredictions();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, refreshPredictions]);

  return (
    <PredictionsContext.Provider
      value={{
        predictions,
        predictionsMap,
        predictionsLoading: loadingState.loading,
        predictionsLoadingMessage: loadingState.message,
        refreshPredictions,
        submitPredictions,
      }}
    >
      {children}
    </PredictionsContext.Provider>
  );
}