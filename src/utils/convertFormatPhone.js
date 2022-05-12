export const convertFormatPhone = (phone) => 
    phone.split('')
        .map((number, i) => {
            switch (i) {
                case 0:
                    return "(" + number;
                case 2:
                    return number + ")";
                case 5:
                    return number + "-";
                case 7:
                    return number + "-";
                default: return number;
            }
        })
        .join('');
