import FormBlog from "@/components/FormBlog";

export default async function PostPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <FormBlog params={id} />
    )
}