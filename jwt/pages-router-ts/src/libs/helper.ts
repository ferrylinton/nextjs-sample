export function randomId() {
    return Math.random().toString(36).replace('0.', 'app');
}

export function stringLastChars(str : string){
    if(str && str.length > 30){
        return str.slice(-30);
    }

    return null;
}