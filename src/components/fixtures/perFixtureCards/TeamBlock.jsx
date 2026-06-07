export default function TeamBlock ({ team }) {
    return (
        <div className="teamBlock">
            <img src="https://placehold.co/35" alt={`${team} flag`} />
            <div>{team}</div>
        </div>
    )
}