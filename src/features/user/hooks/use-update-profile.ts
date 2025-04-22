import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateUserInfo } from "@/stores/slices/user-slice";
import { useGetUserProfileQuery } from "../api/get-user-profile";
import { useUpdateUserProfileMutation } from "../api/update-user-profile";
import { UpdateUser } from "../types";

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch();

  const { data: userInfo, isLoading } = useGetUserProfileQuery();
  const [updatedUser, { isLoading: isProfileLoading }] = useUpdateUserProfileMutation();

  const submitProfile = async (data: UpdateUser) => {
    const result = await updatedUser(data).unwrap();

    dispatch(updateUserInfo({ city: result.city }));
    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Your profile has been successfully updated",
      }),
    );
  };

  return {
    userInfo: userInfo || {},
    submitProfile,
    isLoading,
    isProfileLoading,
  };
};
