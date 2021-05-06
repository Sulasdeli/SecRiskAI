export const capitalize = (s: string) => {
    if (s === "DNS" || s === "SSL") return s
    let result = s.toLowerCase().split(" ")
    return result.map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(" ")
}