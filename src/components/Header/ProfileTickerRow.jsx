import { useProfileTicker } from "../../hooks/useProfileTicker";

export default function ProfileTickerRow() {

    const {
        globalPoints,
        globalRank,

        flavourPoints,
        flavourRank,

        campaignPoints,
        campaignRank,

        stagePoints,
        stageRank,

        tickerLoading
    } = useProfileTicker();


    if (tickerLoading) {
        return (
            <div className="profileTickerRow">
                Loading...
            </div>
        );
    }


    return (
        <div className="profileTickerRow">

            <div className="tickerStat">
                <span>Global</span>
                <small>
                    #{globalRank}
                </small>
                <strong>
                    {globalPoints} PTS
                </strong>
            </div>


            <div className="tickerStat">
                <span>Flavour</span>
                <small>
                    #{flavourRank}
                </small>
                <strong>
                    {flavourPoints} PTS
                </strong>
            </div>


            <div className="tickerStat">
                <span>Campaign</span>
                <small>
                    #{campaignRank}
                </small>
                <strong>
                    {campaignPoints} PTS
                </strong>
            </div>


            <div className="tickerStat">
                <span>Stage</span>
                <small>
                    #{stageRank}
                </small>
                <strong>
                    {stagePoints} PTS
                </strong>
            </div>

        </div>
    );
}