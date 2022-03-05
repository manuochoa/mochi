export default function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n - 14) + '...' + str.substr(str.length - 3) : str;
};