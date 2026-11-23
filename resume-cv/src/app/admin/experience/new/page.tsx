import ExperienceForm from "@/components/ExperienceForm";
import { createExperience } from "@/lib/actions";

export default function NewExperiencePage() {
  return <ExperienceForm action={createExperience} />;
}
