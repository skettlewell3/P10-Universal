export default function ComaprisonSummaryRow({ label, stat, summary }) {

  const t1 = summary.t1;
  const t2 = summary.t2;

  return (
    <div className="comparisonSummaryRow">
      <div>{t1.total[stat]}</div>
      <div>{t1.home[stat]}</div>
      <div>{t1.away[stat]}</div>

      <div className="summaryLabel">{label}</div>

      <div>{t2.home[stat]}</div>
      <div>{t2.away[stat]}</div>
      <div>{t2.total[stat]}</div>
    </div>
  );
}