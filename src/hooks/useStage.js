import { useContext } from "react";
import { StageContext } from "../context/StageContext";

export function useStage() {
    const context = useContext(StageContext);
    if (!context) {
        throw new Error('useStage must be used within StageProvider');
    }
    return context;
}