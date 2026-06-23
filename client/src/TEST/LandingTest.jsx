import NavTest from "../TEST/NavTest"
import HomeTest from "../TEST/Home"
import AboutTest from "../TEST/About"
import ContactTest from "../TEST/Contact"
import FooterTest from "../TEST/Footer"


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