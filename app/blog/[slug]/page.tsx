import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SEED_BLOGS } from '@/data/seedData';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SEED_BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const blog = SEED_BLOGS.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: 'Article Not Found | Smart Vision Gulf',
      description: 'The requested laptop article could not be found.',
    };
  }

  const title = `${blog.title} | svGulf Muscat`;
  const description = blog.excerpt;
  const canonicalUrl = `https://svgulf.com/blog/${blog.slug}`;

  return {
    title,
    description,
    keywords: blog.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Smart Vision Gulf',
      images: [
        {
          url: blog.thumbnail || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: 'en_OM',
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [blog.thumbnail || '/og-image.jpg'],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = SEED_BLOGS.find((b) => b.slug === params.slug);

  const articleJsonLd = blog
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.excerpt,
        image: `https://svgulf.com${blog.thumbnail || '/og-image.jpg'}`,
        datePublished: blog.publishedAt,
        author: {
          '@type': 'Person',
          name: blog.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Smart Vision Gulf',
          logo: {
            '@type': 'ImageObject',
            url: 'https://svgulf.com/logo.jpeg',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://svgulf.com/blog/${blog.slug}`,
        },
      }
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <BlogPostClient initialSlug={params.slug} />
    </>
  );
}
