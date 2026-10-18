import { NextResponse } from 'next/server';
import { getBlogs, saveBlog, deleteBlog, isRequestAuthorized } from '@/lib/serverStore';
import { BlogPost } from '@/lib/adminTypes';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    const blogs = await getBlogs();

    if (slug || id) {
      const match = blogs.find((b) => (slug && b.slug === slug) || (id && b.id === id));
      if (!match) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }
      return NextResponse.json(match);
    }

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  try {
    const blog: BlogPost = await request.json();

    if (!blog.title || !blog.slug || !blog.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required.' },
        { status: 400 }
      );
    }

    if (!blog.id) {
      blog.id = `blog-${Date.now()}`;
    }
    if (!blog.publishedAt) {
      blog.publishedAt = new Date().toISOString();
    }
    if (!blog.readingTime) {
      const wordCount = (blog.content || '').split(/\s+/).length;
      const mins = Math.max(1, Math.ceil(wordCount / 200));
      blog.readingTime = `${mins} min read`;
      blog.readingTimeAr = `قراءة في ${mins} دقائق`;
    }

    const saved = await saveBlog(blog);
    return NextResponse.json({
      success: true,
      message: 'Blog post saved successfully.',
      blog: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save blog post.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id') || searchParams.get('slug');

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id || body.slug;
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID or slug is required for deletion.' },
        { status: 400 }
      );
    }

    const deleted = await deleteBlog(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Blog post not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete blog post.' },
      { status: 500 }
    );
  }
}
