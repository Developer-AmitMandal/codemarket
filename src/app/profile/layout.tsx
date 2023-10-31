import { Topnavbar } from "../components/after_loggedIn/Topnavbar"
import Footer from "../components/before_loggedIn/footer"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Topnavbar />

      {children}
      <Footer />
    </section>
  )
}