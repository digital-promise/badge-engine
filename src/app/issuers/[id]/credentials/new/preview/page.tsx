import CredentialPreview, { CredentialPreviewActions } from "~/components/Credential/CredentialPreview";
import Icon from "~/components/icon";

export default function CredentialFormPreview() {
  return (
    <main className="flex min-h-screen flex-col items-stretch">
      <header className="bg-blue-1 py-4">
        <div className="mx-auto flex max-w-[75rem] justify-between gap-3">
          <section className="flex gap-2">
            <Icon name="eye-open" className="text-blue-5" />
            <div>
              <p className="font-bold text-blue-5">
                Previewing the achievement public page.
              </p>
              <p>
                If everything looks good, you can go ahead and create the
                achievement.
              </p>
            </div>
          </section>

          <CredentialPreviewActions />
        </div>
      </header>

      <CredentialPreview />
    </main>
  );
}
