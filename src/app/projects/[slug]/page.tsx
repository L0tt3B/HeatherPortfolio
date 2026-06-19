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

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <ProjectClient slug={params.slug} />;
}