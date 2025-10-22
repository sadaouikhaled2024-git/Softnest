
import MissionSection from "./MissionSection"
import TeamSection from "./TeamSection"
import ContactSection from "./ContactSection"
import AboutHeroSection from "./AboutHeroSection"
import "./AboutContent.css"

export default function AboutContent() {
  return (
    <div className="about-content">
    <AboutHeroSection/>
      <MissionSection />
      <TeamSection />
      <ContactSection />
    </div>
  )
}
