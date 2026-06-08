import PerFixtureCardDetails from "./PerFixtureCardDetails";
import PerFixtureCardFieldset from "./PerFixtureCardFieldset";
import PerFixtureCardHeader from "./PerFixtureCardHeader";
import TeamBlock from "./TeamBlock";


export default function PerFixtureCard({ fixture }) {

    return (
        <div className="fixtureCard perFixtureCard">
            <PerFixtureCardHeader 
                fixture={fixture}
            />

            

            <div className="fixtureBody">
                <div className="teamCol homeCol" >
                    <TeamBlock team={fixture.home_team_name} />
                </div>

                <div className="detailsCol">
                    <PerFixtureCardDetails
                        fixture={fixture}
                    />
                    
                    <PerFixtureCardFieldset 
                        fixture={fixture}
                    />
                </div>

                <div className="teamCol awayCol" >
                    <TeamBlock team={fixture.away_team_name} />
                </div>
            </div>            
        

            
            {/* fieldset row : capable of simulataneous results and prediction. or either/or depends on fixStatus */}
        </div>
    )
}