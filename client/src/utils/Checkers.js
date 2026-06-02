// Handle SignUp
export const handleSignUp = (e, setState, setState1) => {
    if (!e || !setState) return;
    const value = e.target.value;
    setState(value.length > 8)
    setState1(value.length > 8)
}

//checker for inputs
export const checker = (e, checkState, active, show, check) => {
    const value = e.target.value;
    checkState(value)
    if (value.length > 10) {
        active(true)
    } else {
        active(false)
        show(false)
        check(false)
    }
}

//show input fields
export function showInput(setState, setState1) {
    if (!setState || !setState1) return;
    if (setState) {
        setState1(true)
    } else {
        setState1(false)
    }
}