import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom"

export default function Profile() {
    const {id} = useParams();
    const token = localStorage.getItem("token")
    const user = jwtDecode<{id: string}>(token as string);

    if (id == user.id) {
        return (
            <div>
                This is my profile Ary1 !!
            </div>
        )
    }

    return (
        <div>
            Profile {id}
        </div>
    )
}