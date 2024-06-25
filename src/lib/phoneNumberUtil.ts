export function removePlusSign(phoneNumber: any ) {
    if (phoneNumber && phoneNumber.startsWith('+')) {
        return phoneNumber.substring(1);
    }
    return phoneNumber;
}