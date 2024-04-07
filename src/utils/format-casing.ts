export const formatString = (inputString: string): string => {
    return inputString
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
