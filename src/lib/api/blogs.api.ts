import api from './axiosInstance'
import type { BlogListResponse, BlogDetailResponse, BlogSummary, BlogDetail } from '@/types/blog.type'

export async function fetchBlogs(params?: { category?: string; tag?: string }): Promise<BlogSummary[]> {
  const res = await api.get<BlogListResponse>('/v1/blogs', {
    params: { isPublished: true, ...params },
  })
  return res.data.data
}

export async function fetchBlogBySlug(slug: string): Promise<BlogDetail> {
  const res = await api.get<BlogDetailResponse>(`/v1/blogs/slug/${slug}`)
  return res.data.data
}
