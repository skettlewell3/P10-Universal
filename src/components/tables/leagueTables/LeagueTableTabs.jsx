export default function LeagueTableTabs({ view, setView }) {

    const tabs = [
        {
            key: "predicted",
            label: "Predicted"
        },
        {
            key: "actual",
            label: "Actual"
        },
        {
            key: "comparison",
            label: "Compare"
        }
    ];

    return (
        <div className="leagueTableTabs">

            {tabs.map(tab => (
                <button
                    key={tab.key}
                    className={
                        view === tab.key
                            ? "active"
                            : ""
                    }
                    onClick={() => setView(tab.key)}
                >
                    {tab.label}
                </button>
            ))}

        </div>
    );
}