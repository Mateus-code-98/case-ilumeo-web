export const msToTimeService = (duration: number, haveSeconds?: boolean) => {
    const seconds = Math.floor((duration / 1000) % 60)
    const minutes = Math.floor((duration / (1000 * 60)) % 60)
    const hours = Math.floor((duration / (1000 * 60 * 60)))

    const formattedHours = hours < 10 ? `0${hours}` : hours
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    if (haveSeconds) {
        return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`
    }

    return `${formattedHours}h ${formattedMinutes}m`
}