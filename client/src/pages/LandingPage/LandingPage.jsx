import NavTest from "./NavTest"
import HomeTest from "./Home"
import AboutTest from "./About"
import ContactTest from "./Contact"
import FooterTest from "./Footer"


export default function LandingTest() {
    return (
        <>
            <NavTest />

            <main>
                <HomeTest />
                <AboutTest />
                <ContactTest />
            </main>

            <footer>
                <FooterTest />
            </footer>
        </>
    )
}