export default function useRandom(length: number, start?: number) {
    return Math.floor(Math.random() * length) + (start ? start : 0)
}
