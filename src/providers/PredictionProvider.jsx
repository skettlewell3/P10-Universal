import { useEffect, useState, useCallback } from "react";
import { PredictionsContext } from "../context/PredictionsContext";
import { useDatabase } from "../hooks/useDatabase";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth";

export function PredictionProvider({ children, flavourId }) {
  const { supabase } = useDatabase();
  const { profile } = useProfile();
  const { refreshSignal } = useAuth();

  const profileId = profile?.profile_id;

  const [predictions, setPredictions] = useState([]);
  const [predictionsMap, setPredictionsMap] = useState({});

  const [loadingState, setLoadingState] = useState({
    loading: true,
    message: "Loading predictions...",
  });

  const refreshPredictions = useCallback(async () => {
    if (!profileId) {
      setPredictions([]);
      setPredictionsMap({});
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

      console.log("RPC RESULT", {
        profileId,
        flavourId,
        data,
        error,
      });

      if (error) throw error;

      const list = data || [];

      setPredictions(list);

      setPredictionsMap(
        Object.fromEntries(list.map(p => [p.fixture_id, p]))
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

  // initial + auth-driven load
  useEffect(() => {
    if (!profileId) return;
    refreshPredictions();
  }, [profileId, refreshPredictions]);

  useEffect(() => {
    if (!refreshSignal) return;
    refreshPredictions();
  }, [refreshSignal, refreshPredictions])

  // submit function 
  const submitPredictions = useCallback(
    async (payloads) => {
      if (!payloads?.length) return;

      try {
        setLoadingState({
          loading: true,
          message: "Saving Predictions"
        });

        const { error } = await supabase.rpc("upsert_predictions", {
          predictions: payloads,
        });

        if (error) throw error;

        await refreshPredictions();
      } catch (error) {
        console.error("Failed to submit predictions:", error);
        throw error;
      } finally {
        setLoadingState({
          loading: false,
          message: ""
        });
      }
    },
    [supabase, refreshPredictions]
  );

  // realtime refresh
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
        () => refreshPredictions()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "prediction_scores",
        },
        () => refreshPredictions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, refreshPredictions]);

  console.log(predictions)



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