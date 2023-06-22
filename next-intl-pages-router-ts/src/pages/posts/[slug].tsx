import React from 'react';
import postsJson from '../../json/posts.json';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Post = {
    slug: string,
    title: string,
    description: string
}

type Props = {
    post: Post
}

export default function PostBySlug({ post }: Props) {
    return (
        <main className='flex flex-col h-[calc(100vh-50px)] items-center justify-center'>
            <h1>{post.title}</h1>
            <h1>{post.description}</h1>
        </main>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
    const slug = params?.slug as string;
    const titleField = (locale && locale.toLowerCase() === 'en') ? 'titleEN' : 'titleID';
    const descriptionField = (locale && locale.toLowerCase() === 'en') ? 'descriptionEN' : 'descriptionID';

    const posts = postsJson
        .filter(post => post.slug === slug)
        .map(post => {
            const slug = post.slug;
            const title = post[titleField];
            const description = post[descriptionField];

            return { slug, title, description };
        });

    if (posts.length !== 1) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post: posts[0]
        }
    };
};