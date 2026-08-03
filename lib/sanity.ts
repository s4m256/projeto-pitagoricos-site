import { departments, materials, metrics, posts, type Department, type Material, type Member, type Metric, type Post } from "./content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2026-08-03";

async function sanityQuery<T>(query: string, fallback: T): Promise<T> {
  if (!projectId) return fallback;
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return fallback;
    const payload = await response.json() as { result?: T };
    return payload.result ?? fallback;
  } catch {
    return fallback;
  }
}

export function getMaterials() {
  return sanityQuery<Material[]>(`*[_type == "material"] | order(featured desc, title asc){"id": _id,title,description,area,olympiad,level,type,href,featured}`, materials);
}

export function getMetrics() {
  return sanityQuery<Metric[]>(`*[_type == "metric"] | order(order asc){value,label,note}`, metrics);
}

export function getDepartments() {
  return sanityQuery<Department[]>(`*[_type == "department"] | order(order asc){name,symbol,description}`, departments);
}

export function getPosts() {
  return sanityQuery<Post[]>(`*[_type == "post"] | order(publishedAt desc){"date": coalesce(dateLabel, string::split(string(publishedAt), "T")[0]),category,title,excerpt}`, posts);
}

export function getMembers() {
  return sanityQuery<Member[]>(`*[_type == "member" && consentVerified == true && (!defined(isMinor) || isMinor == false || guardianConsentVerified == true)] | order(department asc, name asc){"id": _id,name,role,department,bio,achievement,"photoUrl": photo.asset->url}`, []);
}
