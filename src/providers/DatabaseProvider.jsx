import { DatabaseContext } from '../context/DatabaseContext'
import { supabase } from '../supbaseClient'

export function DatabaseProvider({ children }) {
    return (
        <DatabaseContext.Provider value={{ supabase }}>
            {children}
        </DatabaseContext.Provider>
    );
}