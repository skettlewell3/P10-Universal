export default function PerFixturesList({ fixtures }) {
    return (
        <div>
            {fixtures.map(f => (
                <div key={f.fixture_id}>
                    {f.fixture_id}
                </div>
            ))}
        </div>
    )
};