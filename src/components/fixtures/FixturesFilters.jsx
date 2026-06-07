import { useFixturesFilters } from "../../hooks/useFixturesFilters";

export default function FixturesFilters() {
    const { statusFilter, setStatusFilter } = useFixturesFilters;

    const fixtStatusOpts = ["all", "upcoming", "live", "finished"];

    return (
        <div className="fixtureFilters">
            {fixtStatusOpts.map(opt => (
                <button
                    key={opt}
                    className={statusFilter === opt ? "active" : ""}
                    onClick={() => setStatusFilter(opt)}
                >
                    {opt}
                </button>
            ))}
        </div>
    )
}