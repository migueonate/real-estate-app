import PropertyDetailClient from "@/components/properties/details";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />;
}
