import { Topnavbar } from "../components/after_loggedIn/Topnavbar"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Topnavbar />
      
      {children}
    </section>
  )
}