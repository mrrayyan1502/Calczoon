import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogRegistry';

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts[params.slug];
  if (!post) {
    return {
      title: 'Blog Post Not Found | CalcZoon',
      description: 'The requested blog guide could not be found.',
    };
  }

  const canonicalUrl = `https://calczoon.com/blog/${params.slug}`;

  return {
    title: `${post.title} | CalcZoon`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts[params.slug];
  if (!post) {
    notFound();
  }

  const Component = post.component;
  return <Component />;
}
