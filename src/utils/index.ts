export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

export function time() : number {
    return Math.floor((new Date()).getTime() / 1000)
}