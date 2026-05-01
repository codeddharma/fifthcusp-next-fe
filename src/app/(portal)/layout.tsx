import Sidebar from '@/components/layout/Sidebar'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ paddingTop: '72px' }}>
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
