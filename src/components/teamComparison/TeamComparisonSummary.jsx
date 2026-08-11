import { useMemo } from "react"; 
import { summariseGenericComparison, summariseDirectComparison } from "../../utils/helpers";
import ComparisonSummaryRow from "./ComparisonSummaryRow";
import ComparisonSummaryHeader from "./ComparisonSummaryHeader";

export default function TeamComparisonSummary({ data, comparisonMode }) {

  const summary = useMemo(() => {
    return comparisonMode === "generic"
      ? summariseGenericComparison(data)
      : summariseDirectComparison(data);
  }, [data, comparisonMode]);

  return (
    <div className="comparisonSummary">
      <ComparisonSummaryHeader />

      {/* Rows always consistent */}
      <ComparisonSummaryRow label="MP" stat="played" summary={summary} />
      <ComparisonSummaryRow label="W" stat="w" summary={summary} />
      <ComparisonSummaryRow label="D" stat="d" summary={summary} />
      <ComparisonSummaryRow label="L" stat="l" summary={summary} />
      <ComparisonSummaryRow label="GF" stat="gf" summary={summary} />
      <ComparisonSummaryRow label="GA" stat="ga" summary={summary} />
      <ComparisonSummaryRow
        label={comparisonMode === "direct" ? "+/-" : "Pts"}
        stat={comparisonMode === "direct" ? "swing" : "pts"}
        summary={summary}
      />

    </div>
  );
}