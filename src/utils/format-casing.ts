export const formatString = (inputString: string, delimiter: string): string => {
    return inputString
        .split(delimiter)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
