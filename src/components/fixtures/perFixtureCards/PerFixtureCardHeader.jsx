export default function PerFixtureCardHeader({ fixture, fixture_status, day, ko}) {
    
    // const isOpen = fixture.predictions_open && fixture.fixture_status === "upcoming";

    // const 

    const statusMap = {
        upcoming: {label: 'Upcoming', color: 'amber'},
        live: {label: 'Live', color: 'green'},
        finished: {label: 'Finished', color: 'red'}
    };

    const statusMeta = statusMap[fixture_status]

    return (
        <div className="fixtureCardHeader perFixtureCardHeader">
            <div className="fcHeaderCenter">
                <div className="day">{day}</div>
                <div className="ko">{ko}</div>
            </div>

            {statusMeta && (
                <div className={`fixtureStatus ${statusMeta.color}`}>
                    <span className="dot" />
                    {statusMeta.label}
                </div>
            )}
        </div>
    )
}