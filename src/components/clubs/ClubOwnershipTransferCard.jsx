import { useClubs } from "../../hooks/useClubs";

export default function ClubOwnershipTransferCard() {
    const {
        ownershipTransferRequests,
        acceptClubOwnershipTransfer,
        declineClubOwnershipTransfer
    } = useClubs();

    const handleAccept = async (requestId) => {
        const confirmed = window.confirm(
            "Are you sure you want to become the owner of this club?"
        );

        if (!confirmed) return;

        const result =
            await acceptClubOwnershipTransfer(requestId);

        if (!result.success) {
            console.error(result.error);
        }
    };

    const handleDecline = async (requestId) => {
        const result =
            await declineClubOwnershipTransfer(requestId);

        if (!result.success) {
            console.error(result.error);
        }
    };

    if (!ownershipTransferRequests.length) {
        return null;
    }

    return (
        <section className="accountCard">
            <h2>
                Ownership Requests
            </h2>

            <div className="ownershipTransferList">
                {ownershipTransferRequests.map(request => (
                    <div
                        key={request.request_id}
                        className="ownershipTransferRow"
                    >
                        <div className="ownershipTransferMain">
                            <span className="clubName">
                                {request.club_name}
                            </span>

                            <span className="clubRole">
                                Ownership offered by {request.owner_display_name}
                            </span>
                        </div>

                        <div className="ownershipTransferActions">
                            <button
                                className="ownershipTransferAccept"
                                onClick={() =>
                                    handleAccept(request.request_id)
                                }
                            >
                                Accept
                            </button>

                            <button
                                className="ownershipTransferDecline"
                                onClick={() =>
                                    handleDecline(request.request_id)
                                }
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}