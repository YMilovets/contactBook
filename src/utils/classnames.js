export const classnames = function(...classes) {
    return [...classes].filter(Boolean).join(" ");
}