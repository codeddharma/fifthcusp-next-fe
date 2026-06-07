import FeedbackForm from '@/components/Feedback/FeedbackForm'

export default async function FeedbackPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params
  return <FeedbackForm orderNumber={orderNumber} />
}
