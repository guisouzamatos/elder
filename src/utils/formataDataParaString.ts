export function formataDataParaString(data: Date, comTempo = false, comSegundo = false): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    if (comTempo) {
        const hora = data.getHours().toString().padStart(2, '0');
        const minuto = data.getMinutes().toString().padStart(2, '0');
        const segundo = data.getSeconds().toString().padStart(2, '0');

        return comSegundo 
            ? `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}` 
            : `${ano}-${mes}-${dia} ${hora}:${minuto}`;
    }

    return `${ano}-${mes}-${dia}`;
}