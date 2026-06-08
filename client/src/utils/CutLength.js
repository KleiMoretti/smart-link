export const CutLength = (text, max) => {
    const textLength = text.length > max ? text.slice(0, max) + "..." : text;
    return textLength;
}