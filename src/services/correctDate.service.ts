interface ICorrectDateServiceProps {
    month_in_extension?: boolean
    no_have_time?: boolean
}

export const correctDateService = (date: any, props: ICorrectDateServiceProps = {}) => {
    const { month_in_extension, no_have_time } = props
    if (!date) return ''
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const months_in_extension = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    const correct_months = month_in_extension ? months_in_extension : months

    date = new Date(date)
    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
    const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`
    const year = date.getFullYear()
    const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`

    return `${day} ${month_in_extension ? 'de ' : ''}${correct_months[month - 1]} ${month_in_extension ? 'de ' : ''}${year}${no_have_time ? '' : ` às ${hours}:${minutes}`}`
}