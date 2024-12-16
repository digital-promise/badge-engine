"use client";

import { useRouter } from "next/navigation";
import { submitCredential } from "~/lib/submit";
import { useAchievementStore } from "~/providers/achievement-form-provider";
import { useIssuerContext } from "~/providers/issuer-provider";
import { useState } from "react";
import { useNotifications } from "~/providers/notification-provider";

export default function ConfirmAndCreate({
  className,
}: {
  className?: string;
}) {
  const { docId: issuerId } = useIssuerContext();
  const { form, isExtrasComplete, setIsExtrasComplete } = useAchievementStore();
  const { notify } = useNotifications();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting || isSubmitted) return; 
    setIsSubmitting(true);
    if (isExtrasComplete) {
      setIsExtrasComplete(isExtrasComplete);
    }
    const newAchievement = await submitCredential(issuerId, form);

    if (newAchievement) {
      notify({
        type: "success",
        message: `Successfully added credential "${newAchievement.name}"`,
      });

      router.push(`/issuers/${issuerId}`);
      setIsSubmitted(true); 
    }
    setIsSubmitting(false);
  };

  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        void handleSubmit();
      }}
      disabled={isSubmitting || isSubmitted}
      className={`btn ${isSubmitting ? 'disabled' : ''} ${isSubmitted ? 'disabled' : ''} disabled:border-2 disabled:border-gray-4 disabled:bg-gray-3 ${className ?? ""}`}
    >
      Confirm and Create
    </button>
  );
}
