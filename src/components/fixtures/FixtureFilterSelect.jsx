export default function FixtureFilterSelect({
    value,
    options,
    placeholder,
    disabled = false,
    onChange,
}) {
    return (
        <div className="fixtureSelectContainer">
            <select
                value={value ?? ""}
                disabled={disabled}
                onChange={(e) =>
                    onChange(
                        e.target.value === ""
                            ? null
                            : e.target.value
                    )
                }
            >
                <option value="">
                    {placeholder}
                </option>

                {options.map(opt => (
                    <option
                        key={opt.value}
                        value={opt.value}
                    >
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}