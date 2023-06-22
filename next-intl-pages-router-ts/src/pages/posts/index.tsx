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
    posts: Post[]
}

export default function PostsPage({ posts }: Props) {
    return (
        <main className='flex flex-col h-[calc(100vh-50px)] items-center justify-center'>
            <div className='flex flex-col gap-2'>
                {
                    posts.map((post, index) => {
                        return (
                            <div key={index} className='flex flex-col'>
                                <Link href={`/posts/${post.slug}`} className='text-xl border border-slate-300 p-3 hover:bg-slate-200'>{post.title}</Link>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const titleField = (locale && locale.toLowerCase() === 'en') ? 'titleEN' : 'titleID';
    const descriptionField = (locale && locale.toLowerCase() === 'en') ? 'descriptionEN' : 'descriptionID';

    const posts = postsJson.map(post => {
        const slug = post.slug;
        const title = post[titleField];
        const description = post[descriptionField];

        return { slug, title, description };
    })

    return {
        props: {
            posts
        }
    };
};