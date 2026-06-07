import { useFixturesFilters } from "../../hooks/useFixturesFilters"

export default function perFixturesList({ fixtures }) {
    const { statusFilter } = useFixturesFilters();

    const VisibleFixtures = useMemo(() => {
        if (statusFilter === "all") return fixtures;

        return fixtures.filter(f => 
            f.fixture_status === statusFilter
        );
    }, [fixtures, statusFilter])
    return (
        
    )
}