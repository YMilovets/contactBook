export const convertPhoneToNum = (phone) => {
    return Array.from(phone.matchAll(/\d+/g)).join('');
}