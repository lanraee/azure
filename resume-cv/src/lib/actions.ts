"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAuthorizedAdminEmail } from "./admin-auth";
import { getContent, newId, saveContent } from "./content";
import type { ExperienceEntry, SkillGroup } from "./types";

async function requireAdmin() {
  const user = await currentUser();
  if (!isAuthorizedAdminEmail(user?.primaryEmailAddress?.emailAddress)) {
    redirect("/sign-in");
  }
}

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export async function updateProfile(formData: FormData) {
  await requireAdmin();
  const content = await getContent();
  content.profile = {
    name: String(formData.get("name") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    email: String(formData.get("email") ?? ""),
    location: String(formData.get("location") ?? ""),
    licence: String(formData.get("licence") ?? ""),
    profileText: String(formData.get("profileText") ?? ""),
  };
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

export async function updateSkills(formData: FormData) {
  await requireAdmin();
  const content = await getContent();
  const groups: SkillGroup[] = [];
  const ids = formData.getAll("groupId") as string[];
  const names = formData.getAll("groupName") as string[];
  const itemsRaw = formData.getAll("groupItems") as string[];
  ids.forEach((id, i) => {
    const name = (names[i] ?? "").trim();
    const items = (itemsRaw[i] ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (name) groups.push({ id: id || newId("group"), name, items });
  });
  const newGroupName = String(formData.get("newGroupName") ?? "").trim();
  if (newGroupName) {
    const newGroupItems = String(formData.get("newGroupItems") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    groups.push({ id: newId("group"), name: newGroupName, items: newGroupItems });
  }
  content.skills = groups;
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function updateCertifications(formData: FormData) {
  await requireAdmin();
  const content = await getContent();
  content.certsInProgress = linesToArray(formData.get("certsInProgress"));
  content.certifications = linesToArray(formData.get("certifications"));
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

function readExperienceForm(formData: FormData): Omit<ExperienceEntry, "id" | "order" | "hidden"> & {
  hidden: boolean;
} {
  return {
    title: String(formData.get("title") ?? ""),
    org: String(formData.get("org") ?? ""),
    date: String(formData.get("date") ?? ""),
    subtitle: String(formData.get("subtitle") ?? ""),
    bullets: linesToArray(formData.get("bullets")),
    hidden: formData.get("hidden") === "on",
    simulation: formData.get("simulation") === "on",
  };
}

export async function createExperience(formData: FormData) {
  await requireAdmin();
  const content = await getContent();
  const fields = readExperienceForm(formData);
  const order = content.experience.length
    ? Math.max(...content.experience.map((e) => e.order)) + 1
    : 0;
  content.experience.push({ id: newId("entry"), order, ...fields });
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAdmin();
  const content = await getContent();
  const fields = readExperienceForm(formData);
  const idx = content.experience.findIndex((e) => e.id === id);
  if (idx === -1) redirect("/admin/experience");
  content.experience[idx] = { ...content.experience[idx], ...fields };
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const content = await getContent();
  content.experience = content.experience.filter((e) => e.id !== id);
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function toggleExperienceHidden(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const content = await getContent();
  const entry = content.experience.find((e) => e.id === id);
  if (entry) entry.hidden = !entry.hidden;
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function moveExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  const content = await getContent();
  const sorted = [...content.experience].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((e) => e.id === id);
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapWith < 0 || swapWith >= sorted.length) return;
  const tmp = sorted[idx].order;
  sorted[idx].order = sorted[swapWith].order;
  sorted[swapWith].order = tmp;
  content.experience = sorted;
  await saveContent(content);
  revalidatePath("/");
  revalidatePath("/admin/experience");
}
