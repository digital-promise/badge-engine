import type { UseFormWatch } from "react-hook-form";
import { useAchievementStore } from "~/providers/achievement-form-provider";
import type { PartialCredentialForm } from "shared/interfaces/credential-form-object.interface";

export function useCredentialFormUpdate(
  watch: UseFormWatch<PartialCredentialForm>,
) {
  const { updateForm } = useAchievementStore();

  return () => {
    const subscription = watch((data) => {
      if (data) updateForm(data as PartialCredentialForm);
    });

    return () => {
      subscription.unsubscribe();
    };
  };
}
