export default function FixtureCell({ hGoals, aGoals, metaData, className }) {
    const isPaired = metaData !== null && metaData !== undefined;

    return (
        <div className={`fixtureCell ${className || ""} ${!isPaired ? "opaqueFixture" : ""}`}>
            <div className="resultCell">
                {hGoals}-{aGoals}
            </div>
            <div className="metaCell">
                {metaData}
            </div>
        </div>
    )
}

