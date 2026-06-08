import { formatInTimeZone } from "date-fns-tz";

export default function PerFixtureCardDetails({ fixture }) {

    const venueKO = formatInTimeZone(
        fixture.kickoff_at,
        fixture.timezone,
        "HH:mm"
    );

    // console.log({
    //   kickoff_at: fixture.kickoff_at,
    //   parsed: new Date(fixture.kickoff_at),
    //   timezone: fixture.timezone
    // });

    return (
        <div className="fixtureDetails perFixtureDetails">
            <div className="fixtureLocation">
                <p>{venueKO}</p>
                <p>{fixture.venue_name}</p>
                <p>
                    <span>{fixture.city}, </span>
                    <span>{fixture.country}</span>
                </p>
            </div>
        </div>
    )
}