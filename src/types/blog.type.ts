export interface BlogSummary {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
  readTime: number
  isPublished: boolean
  publishedAt: string
}

export interface BlogDetail extends BlogSummary {
  content: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
}

export interface BlogListResponse {
  success: boolean
  message: string
  data: BlogSummary[]
}

export interface BlogDetailResponse {
  success: boolean
  message: string
  data: BlogDetail
}
