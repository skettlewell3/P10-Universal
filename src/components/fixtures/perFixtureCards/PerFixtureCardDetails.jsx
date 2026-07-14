import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";

export default function PerFixtureCardDetails({ fixture }) {

    const userKO = format(
        new Date(fixture.kickoff_at),
        "HH:mm"
    )

    const venueKO = formatInTimeZone(
        fixture.kickoff_at,
        fixture.timezone,
        "HH:mm"
    );

    const timeCheck = venueKO != userKO

    return (
        <div className="fixtureDetails perFixtureDetails">
            <div className="fixtureLocation">
                {timeCheck && (<p>{venueKO}</p>)}
                <p>{fixture.venue_name}</p>
                <p>
                    <span>{fixture.city}, </span>
                    <span>{fixture.country}</span>
                </p>
            </div>
        </div>
    )
}