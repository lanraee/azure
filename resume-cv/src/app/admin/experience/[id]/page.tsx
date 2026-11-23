import { notFound } from "next/navigation";
import ExperienceForm from "@/components/ExperienceForm";
import { getContent } from "@/lib/content";
import { updateExperience } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = await getContent();
  const entry = content.experience.find((e) => e.id === id);
  if (!entry) notFound();

  const action = updateExperience.bind(null, id);

  return <ExperienceForm entry={entry} action={action} />;
}
