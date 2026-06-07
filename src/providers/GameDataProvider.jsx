import { FixturesProvider } from "./FixturesProvider";

export default function GameDataProvider ({children}) {
    return (
        <FixturesProvider>
            {children}
        </FixturesProvider>
    )
}