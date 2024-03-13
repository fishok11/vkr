import { userState } from './../../../app/userSlice';
import { useAppSelector } from "../../../app/hooks"

export const useUserPrtofle = () => {
  const stateUser = useAppSelector(userState);
}