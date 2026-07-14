import { useClubs } from "../../hooks/useClubs";
import OwnedClubSummaryCard from "../clubs/OwnedClubSummary";
import CreateClubForm from "../clubs/CreateClubForm";

export default function ProfileClubCard() {
    const { ownedClub } = useClubs();

    return (
        <section className="accountCard club">
            <h2>
                My Club
            </h2>

            {ownedClub ? (
                <OwnedClubSummaryCard club={ownedClub} />
            ) : (
                <CreateClubForm />
            )}

        </section>
    );
}