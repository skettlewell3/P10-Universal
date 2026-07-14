
export default function ClubMembersList({ clubMates }) {    

    return (
        <section className="accountCard">
            <h2>
                Members
            </h2>

            {clubMates.map(member => (
                <div
                    key={member.member_profile_id}
                    className="clubMemberRow"
                >

                    <span>
                        {member.display_name}
                    </span>

                    <span>
                        {member.club_role}
                    </span>

                </div>
            ))}
        </section>
    );
}