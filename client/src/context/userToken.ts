import { createContext } from "react";
import type { UserTokenDataT } from "../App";

type userDataT = {
  userData: UserTokenDataT,
  setUserData: React.Dispatch<React.SetStateAction<UserTokenDataT>>
}

const UserTokenContext = createContext<userDataT | null>(null)

export default UserTokenContext
