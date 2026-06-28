export default function FixtureFilterSelect({
    value,
    options,
    placeholder,
    disabled = false,
    onChange,
    active
}) {
    return (
        <div className="filterSelectContainer">
            <select
                value={value ?? ""}
                className={active ? "active" : null}
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