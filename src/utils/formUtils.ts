import * as xml2js from 'xml2js';
export class FormUtils {

    static checkIsEmail = (email) => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return validRegex.test(email);
    };

    static checkIsCnpj(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g,'');
        if(cnpj == '') return false;
        if (cnpj.length != 14)
            return false;
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }


    static isDataValida(data: Date) {
        return !isNaN(data.getTime());
    }

    static isDomainTelebras = (email) => {
        return email.indexOf('@telebras.com.br') !== -1;
    };

    static removerCaracteresEpeciais = (value: string): string => {
        if (value) {
            return value.replace(/[^a-zA-Z\d]/g, '');
        }
        return '';
    };

    static retornarCnpjFormatado(cnpj: string) {
        if (cnpj) {
            const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
            return cnpj.replace(/\D/g, '').replace(cnpjRegex, '$1.$2.$3/$4-$5');
        }
        return '';
    }

    static retornarDataFormatada(dateString, isDataFim?): Date {
        let dataFormatada = '';
        let hora = 'T00:00:00';
        if (isDataFim) {
            hora = 'T23:59:59';
        }
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (regex.test(dateString)) {
            if (dateString.length < 10 && dateString.length > 0) {
                dateString = '99/99/9999';
            }
            if (dateString.length !== 0) {
                dataFormatada = dateString.split('/').reverse().join('-');
            }
        }
        else {
            dataFormatada = dateString;
        }
        return new Date(`${dataFormatada}${hora}`);
    }

    static retornarDecimal(value: string) {
        if (value) {
            const valorFormatado = value.toString().replace(',', '.');
            if (!isNaN(+valorFormatado)) {
                return +value.toString().replace(',', '.');
            }
        }
        return 0;
    }

    static retornarFormatacaoPorcentagem(valor) {
        if (valor) {
            return `${valor.toFixed(2).replace('.', ',')}%`
        }
        return '0,00%'
    }

    static retornarFormatacaoMilisegundo(valor) {
        if (valor) {
            return `${valor.toFixed(2).replace('.', ',')}ms`
        }
        return '0,00ms'
    }

    static retornarDataHoraTextual(data: Date, exibirSegundos?: boolean) {
        let dia = data.getDate().toString();
        let mes = (data.getMonth() + 1).toString();
        let ano = data.getFullYear();
        let hora = data.getHours().toString();
        let minutos = data.getMinutes().toString();
        let segundos = data.getSeconds().toString();

        if (+dia < 10) {
            dia = `0${dia}`;
        }
        if (+mes < 10) {
            mes = `0${mes}`;
        }
        if (+hora < 10) {
            hora = `0${hora}`;
        }
        if (+minutos < 10) {
            minutos = `0${minutos}`;
        }
        if (+segundos < 10) {
            segundos = `0${segundos}`;
        }
        let dataFormatada =  `${dia}/${mes}/${ano} - ${hora}:${minutos}`;
        if (exibirSegundos) {
            dataFormatada+=`:${segundos}`
        }
        return dataFormatada;
    }

    static formatarDataParaConsulta(data: Date, isDataFim?: boolean) {
        let dia = data.getDate() < 10 ? `0${data.getDate().toString()}` : data.getDate().toString();
        let mes = (data.getMonth() + 1) < 10 ? `0${(data.getMonth() + 1).toString()}` : (data.getMonth() + 1).toString();
        let ano = data.getFullYear();
        let hora = '00:00';
        if (isDataFim) {
            hora = '23:59'
        }
        return `${dia}.${mes}.${ano} ${hora}`;
    }

    static formatarDataComTracos(data: Date, isDataFim?: boolean) {
        let dia = data.getDate() < 10 ? `0${data.getDate().toString()}` : data.getDate().toString();
        let mes = (data.getMonth() + 1) < 10 ? `0${(data.getMonth() + 1).toString()}` : (data.getMonth() + 1).toString();
        let ano = data.getFullYear();
        let hora = '00:00';
        if (isDataFim) {
            hora = '23:59'
        }
        return `${ano}-${mes}-${dia} ${hora}`;
    }

    static formatarDataHora(string) {
        const date = new Date(string);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        const hora = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');

        return `${dia}/${mes}/${ano} - ${hora}:${minutos}`;
    }

    static converterDataPadraoYYYYMMDD(dateString): Date {
        if (dateString) {
            if (dateString.length !== 0) {
                const parts = dateString.split(" ")
                const data = parts[0].split("/");
                const hora = parts[1];
                const ano = data[2];
                const mes = data[1].length === 1 ? "0" + data[1] : data[1];
                const dia = data[0].length === 1 ? "0" + data[0] : data[0];
                return new Date(`${ano}-${mes}-${dia} ${hora}`);
            }
        }
        return new Date();
    }

    static parseXmlToJson(xml): any {
        const json = {};
        for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
            const key = res[1] || res[3];
            const value = res[2] && this.parseXmlToJson(res[2]);
            json[key] = ((value && Object.keys(value).length) ? value : res[2]) || null;

        }
        return json;
    }

    static parseXmlToJsonXml2js(xml): any {
        let json: any = {};
        xml2js.parseString(xml, {explicitArray: false}, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                json = JSON.stringify(result, null, 2);
            }
        });
        return JSON.parse(json.toString());
    }

    static parseXmlToJson2(xml): any {
        let json: any = {};
        xml2js.parseString(xml, {explicitArray: false}, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                json = JSON.stringify(result, null, 2);
            }
        });
        return JSON.parse(json.toString());
    }

    static converterByteParaGiga(bytes: number): string {
        if (bytes) {
            return String(bytes / 1000000000);
        }
        return '0';
    }

    static converterByteParaMega(bytes: number): string {
        if (bytes) {
            let mega = (bytes / 1000000).toFixed(2)
            return String(mega);
        }
        return '0';
    }

    static converterMinutosParaHoraMinutos(minutos) {
        if (minutos) {
            const horas = Math.floor(minutos / 60);
            const minutosRestantes = minutos % 60;

            const horaFormatada = horas.toString().padStart(2, '0');
            const minutosFormatados = minutosRestantes.toString().padStart(2, '0');

            return `${horaFormatada}:${minutosFormatados}`;
        }
        return `00:00`;
    }

    static converterDataStringParaDate(dataString) {
        const [datePart, timePart] = dataString.split(' - ');

        const [mes, dia, ano] = datePart.split('/');
        const [hora, minuto] = timePart.split(':');

        return new Date(ano, mes - 1, dia, hora, minuto);
    }

    static getFileExtension(nomeArquivo) {
        const parts = nomeArquivo.split('.');
        return parts[parts.length - 1].toLowerCase();
    }

    static getMimeTypeFromExtension(extensao) {
        switch (extensao) {
            case 'pdf':
                return 'application/pdf';
            case 'xlsx':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
    }

    static getHost = (urlString): string => {
        try {
            const url = new URL(urlString);
            return url.origin;
        } catch (error) {
            return "";
        }
    }

    static isMesAtual = (date: Date): boolean => {
        const hoje = new Date();
        return hoje.getMonth() === date.getMonth() && hoje.getFullYear() === date.getFullYear();
    }

    static isSemanaAtual(data: Date): boolean {
        const hoje = new Date();
        const diaDaSemana = hoje.getDay();
        const diasPassadosSemana = 6 - diaDaSemana;
        const domingo = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - diasPassadosSemana + 2, 0, 0, 0);
        const sabado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + diasPassadosSemana, 23, 59, 59);
    
        return data >= domingo && data <= sabado;
    }
}
