import { useContext } from 'react';
import { ActualTablesContext } from '../context/ActualTablesContext';

export function useActualTables() {
    const context = useContext(ActualTablesContext);

    if (!context) {
        throw new Error(
            'useActualTables must be used within ActualTablesProvider'
        );
    }

    return context;
}