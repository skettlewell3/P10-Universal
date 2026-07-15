import { useClubs } from "../../hooks/useClubs";
import RemoveIcon from "../app/RemoveIcon";
import { formatClubRole } from "../../utils/helpers";

export default function ClubMembersList({
    clubId,
    clubMates,
    canManageClub,
    canManageRoles
}) {
    const { changeMemberRole } = useClubs();

    return (
        <section className="accountCard">
            <h2>Members</h2>

            {clubMates.map(member => (
                <div key={member.member_profile_id} className="clubMemberRow">
                    <span className="displayName">{member.display_name}</span>
                    {canManageRoles && member.club_role !== "owner" ? (
                        <select
                            className="clubRoleSelect"
                            value={member.club_role}
                            onChange={(e) =>
                                changeMemberRole(
                                    clubId,
                                    member.member_profile_id,
                                    e.target.value
                                )
                            }
                        >
                            <option value="squad_member">Member</option>
                            <option value="captain">Captain</option>
                        </select>
                    ) : (
                        <span className="clubMemberRole">{formatClubRole(member.club_role)}</span>
                    )}

                    {canManageClub && member.club_role !== "owner" && (
                        <button className="iconButton redBG">
                            <RemoveIcon />
                        </button>
                    )}
                </div>
            ))}
        </section>
    );
}