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
    const {
        changeMemberRole,
        removeClubMember,
        requestClubOwnershipTransfer
    } = useClubs();

    const [editing, setEditing] = useState(false);

    const handleRemoveMember = async (
        clubId,
        memberProfileId,
        displayName
    ) => {
        const confirmed = window.confirm(
            `Are you sure you want to remove ${displayName} from this club?`
        );

        if (!confirmed) return;

        const { error } = await removeClubMember(
            clubId,
            memberProfileId
        );

        if (error) {
            console.error(error);
        }
    };

    const handleTransferOwnership = async (
        clubId,
        memberProfileId,
        displayName
    ) => {
        const confirmed = window.confirm(
            `Send an ownership transfer request to ${displayName}?`
        );

        if (!confirmed) return;

        const result = await requestClubOwnershipTransfer(
            clubId,
            memberProfileId
        );

        if (!result.success) {
            console.error(result.error);
        }
    };

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

            {editing && canManageClub && (
                <SendClubInviteForm clubId={clubId} />
            )}

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
                            <option value="member">
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
                        <>
                            <button
                                className="clubTransferButton"
                                onClick={() =>
                                    handleTransferOwnership(
                                        clubId,
                                        member.member_profile_id,
                                        member.display_name
                                    )
                                }
                            >
                                Transfer
                            </button>

                            <button 
                                className="iconButton redBG"
                                onClick={() => 
                                    handleRemoveMember(
                                        clubId, 
                                        member.member_profile_id,
                                        member.display_name
                                    )
                                }
                                title="Remove member"
                            >
                                <RemoveIcon />
                            </button>
                        </>
                    )}
                </div>
            ))}
        </section>
    );
}