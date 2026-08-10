import FormBlock from "./FormBlock";

export default function FormRow({
    fixture1,
    fixture2,
    team1Name,
    team2Name,
    scale
}) {
    return (
        <div className="formRow">

            <FormBlock
                side="left"
                fixture={fixture1}
                teamName={team1Name}
                scale={scale}
            />

            <FormBlock
                side="right"
                fixture={fixture2}
                teamName={team2Name}
                scale={scale}
            />

        </div>
    );
}