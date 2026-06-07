import PerFixtureCardHeader from "./PerFixtureCardHeader";

export default function PerFixtureCard({ fixture }) {

    return (
        <div className="fixtureCard perFixtureCard">
            <PerFixtureCardHeader 
                fixture_status={fixture.fixture_status}
                day={fixture.day}
                ko={fixture.ko}
            />
            {/* match details */}
            {/* fieldset row : capable of simulataneous results and prediction. or either/or depends on fixStatus */}
        </div>
    )
}