import gsap from "gsap";

export function MoveY(ref, f, t) {
    if (!ref) return;
    gsap.from(ref, {
        y: f,
        duration: 1
    })

    gsap.to(ref, {
        y: t,
        duration: 1
    })
}

export function MoveX(ref) {
    if (!ref) return;
    gsap.from(ref, {
        x: -100,
        duration: 1
    })
    gsap.to(ref, {
        x: 0,
        duration: 1
    })

}