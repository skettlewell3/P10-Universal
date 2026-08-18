import { useClubs } from "../../hooks/useClubs";

export default function ClubInvitesCard() {

    const {
        invites,
        acceptInvite,
        declineInvite
    } = useClubs();

    const handleAccept = async (inviteId) => {

        const result = await acceptInvite(inviteId);

        if (!result.success) {
            console.error(result.error);
        }
    };

    if (!invites.length) {
        return null;
    }

    return (
        <section className="accountCard">

            <h2>
                Club Invites
            </h2>

            <div className="clubInviteList">

                {invites.map(invite => (

                    <div
                        key={invite.invite_id}
                        className="clubInviteRow"
                    >

                        <div className="clubInviteMain">

                            <span className="clubName">
                                {invite.club_name}
                            </span>

                            <span className="clubRole">
                                Invited by {invite.sender_name}
                            </span>

                        </div>

                        <div className="clubInviteActions">

                            <button
                                className="clubInviteAccept"
                                onClick={() =>
                                    handleAccept(invite.invite_id)
                                }
                            >
                                Accept
                            </button>

                            <button
                                className="clubInviteDecline"
                                onClick={() =>
                                    declineInvite(invite.invite_id)
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