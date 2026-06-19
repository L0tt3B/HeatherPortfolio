import ProjectClient from "./ProjectClient";

export async function generateStaticParams() {
  return [
    { slug: "duo" },
    { slug: "skonz" },
    { slug: "onetouch" },
    { slug: "elastic" },
    { slug: "comics" },
    { slug: "aboutme" },
    { slug: "cv" },
  ];
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectClient slug={slug} />;
}