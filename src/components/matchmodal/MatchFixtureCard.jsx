import MatchFixtureRow from "./MatchFixtureRow";

export default function MatchFixtureCard({
    fixture,
    predictionDrafts,
    setPredictionDrafts
}) {
    const statusMap = {
        upcoming: { label: "Upcoming", color: "amber" },
        live_90: { label: "Live", color: "blue" },
        live_et: { label: "Live", color: "blue" },
        finished: { label: "Finished", color: "grey" }
    };

    const statusMeta = statusMap[fixture.fixture_status];

    return (
        <div className="mfCard matchCard">

            <div className="mfCardHeader">

                <div className="fcHeaderCenter">
                    <div className="day">
                        {fixture.day}
                    </div>

                    <div className="ko">
                        {fixture.ko}
                    </div>
                </div>

                {statusMeta && (
                    <div className={`fixtureStatus ${statusMeta.color}`}>
                        <span className="dot" />
                        {statusMeta.label}
                    </div>
                )}

            </div>

            <MatchFixtureRow
                fixture={fixture}
                predictionDrafts={predictionDrafts}
                setPredictionDrafts={setPredictionDrafts}
            />

        </div>
    );
}