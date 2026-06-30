import { useContext } from "react";
import { FlavourContext } from "../context/FlavourContext";

export function useFlavour() {
    const context = useContext(FlavourContext);

    if (!context) {
        throw new Error (
            'useFlavour must be used within FlavourProvider'
        )
    }

    return context;
}