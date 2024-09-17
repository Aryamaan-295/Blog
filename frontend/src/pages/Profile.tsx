import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom"
import ProfileView from "../components/ProfileView";
import { useUser } from "../hooks";
import ProfileSkeleton from "../components/ProfileSkeleton";

function Profile() {
    const {id} = useParams();
    const token = localStorage.getItem("token")
    const info = jwtDecode<{id: string}>(token as string);
    const { loading, user } = useUser({
        id: id || ""
    })

    if (loading) {
        return (
            <>
                <ProfileSkeleton />
            </>
        )
    }

    return (
        <div>
            <ProfileView self={ info.id == id } user={ user }/>
        </div>
    )
}

export default function ProfileWrapper() {
    const { id } = useParams()

    return (
        <Profile key={id} />
    )
}