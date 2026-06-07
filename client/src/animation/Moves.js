import gsap from "gsap";

export function MoveY(ref, f, t, d) {
    if (!ref) return;
    gsap.from(ref, {
        y: f,
        opacity: 0,
        duration: d

    })

    gsap.to(ref, {
        y: t,
        duration: d,
        opacity: 1,
        ease: "power3.out"
    })
}

export function MoveX(ref, f, t, d) {
    if (!ref) return;
    gsap.from(ref, {
        x: f,
        duration: d
    })
    gsap.to(ref, {
        x: t,
        duration: d,
        ease: "power3.out"
    })

}