import { IssuingOrganizationForm } from "~/components/forms/issuing-organization";
import BreadcrumbNavigation from "~/components/global/breadcrumb";

export default function NewIssuer() {
  const breadcrumbs = [
    <p key="title">Add New Issuing Organization</p>
  ]

  return (
    <>
      <BreadcrumbNavigation items={breadcrumbs} />
      <main className="mx-auto min-h-screen max-w-[45rem] py-8">
        <h1 className="mb-6 border-b border-gray-2 pb-6 text-xl font-bold">
          Add New Issuing Organization
        </h1>
        <IssuingOrganizationForm />
      </main>
    </>
  );
}
