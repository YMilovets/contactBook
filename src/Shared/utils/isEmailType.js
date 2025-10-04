export const isEmailType = function(string) {
    return !!string.match(/.+@.+\..+/i);
}