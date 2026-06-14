export const CutLength = (text = "", max = 10) => {
    const textLength = text.length > max
        ? text.slice(0, max) + "..."
        : text;

    return textLength;
};