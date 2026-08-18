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
            return;
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

            {invites.map(invite => (
                <div 
                    key={invite.invite_id}
                    className="clubInvite"
                
                >
                    <strong>
                        {invite.club_name}
                    </strong>

                    <p>
                        Invited by {invite.sender_name}
                    </p>

                    <div className="clubInviteActions">
                        <button
                            onClick={() =>
                                handleAccept(invite.invite_id)
                            }
                        >
                            Accept
                        </button>

                        <button
                            onClick={() =>
                                declineInvite(invite.invite_id)
                            }
                        >
                            Decline
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}