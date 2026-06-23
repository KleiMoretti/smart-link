import NavTest from "../TEST/NavTest"
import HomeTest from "../TEST/Home"
import AboutTest from "../TEST/About"

export default function LandingTest() {
    return (
        <>
            <NavTest />

            <main>
                <HomeTest />
                <AboutTest />
            </main>
        </>
    )
}