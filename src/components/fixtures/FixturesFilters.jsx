import { useFixturesFilters } from "../../hooks/useFixturesFilters";

export default function FixturesFilters() {
    const { statusFilter, setStatusFilter } = useFixturesFilters();

    const fixtStatusOpts = ["upcoming", "live", "finished", "all"];

    return (
        <div className="fixtureFilters">
            <div className="fixStatusFilter">
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
        </div>
    )
}