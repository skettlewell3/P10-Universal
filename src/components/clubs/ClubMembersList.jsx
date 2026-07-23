import { useState } from "react";
import { useClubs } from "../../hooks/useClubs";
import RemoveIcon from "../app/RemoveIcon";
import { formatClubRole } from "../../utils/helpers";
import SendClubInviteForm from "./SendClubInviteForm";

export default function ClubMembersList({
    clubId,
    clubMates,
    canManageClub,
    canManageRoles
}) {
    const { changeMemberRole } = useClubs();

    const [editing, setEditing] = useState(false);

    return (
        <section className="accountCard">
            <div className="cardHeader">
                <h2>Members</h2>

                {canManageClub && (
                    <button
                        className="textButton"
                        onClick={() => setEditing(!editing)}
                    >
                        {editing ? "Done" : "Add/Edit Members"}
                    </button>
                )}
            </div>

            {clubMates.map(member => (
                <div
                    key={member.member_profile_id}
                    className="clubMemberRow"
                >   
                    <span className="displayName">
                        {member.display_name}
                    </span>

                    {editing &&
                    canManageRoles &&
                    member.club_role !== "owner" ? (
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
                            <option value="squad_member">
                                Member
                            </option>
                            <option value="captain">
                                Captain
                            </option>
                        </select>
                    ) : (
                        <span className="clubMemberRole">
                            {formatClubRole(member.club_role)}
                        </span>
                    )}

                    {editing &&
                    canManageClub &&
                    member.club_role !== "owner" && (
                        <button className="iconButton redBG">
                            <RemoveIcon />
                        </button>
                    )}
                </div>
            ))}

            {editing && canManageClub && (
                <SendClubInviteForm clubId={clubId} />
            )}

        </section>
    );
}