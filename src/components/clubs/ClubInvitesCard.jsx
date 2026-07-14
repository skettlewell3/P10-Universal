import { useClubs } from "../../hooks/useClubs";

export default function ClubInvitesCard() {

    const {
        invites,
        acceptInvite,
        declineInvite
    } = useClubs();


    if (!invites.length) {
        return null;
    }


    return (
        <section className="accountCard">

            <h2>
                Club Invites
            </h2>


            {invites.map(invite => (

                <div key={invite.invite_id}>

                    <strong>
                        {invite.club_name}
                    </strong>

                    <p>
                        Invited by {invite.sender_name}
                    </p>


                    <button
                        onClick={() =>
                            acceptInvite(invite.invite_id)
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

            ))}

        </section>
    );
}