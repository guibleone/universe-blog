export function formatBrLocaleDate(date: Date) {

    return new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).format(date);
  
}
