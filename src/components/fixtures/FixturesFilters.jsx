import { useFixturesFilters } from "../../hooks/useFixturesFilters";

export default function FixturesFilters() {
    const { statusFilter, setStatusFilter } = useFixturesFilters();

    const fixtStatusOpts = [
        {
            label: "Upcoming",
            value: "upcoming" 
        },
        {
            label: "Live",
            value: "live" 
        }, 
        {
            label: "Finished",
            value: "finished" 
        }, 
        {
            label: "All",
            value: "all" 
        },  
    ];

    return (
        <div className="filters fixtureFilters">
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