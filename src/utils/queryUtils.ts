export class QueryUtils {
    private query = '';
    private parameters: any[] = [];


    constructor() {
        this.query = '';
        this.parameters = [];
    }

    /**
     * set Select definition definition
     */
   addSelect = (select: string) => {
       if (!this.query.includes('SELECT') && !select.includes('SELECT')) {
           this.query = 'SELECT ';
       }
        this.query = ` ${this.query} ${select} `;
       return this;
   }

    /**
     * set From table definition
     */
    addFrom = (table: string) => {
        this.query = `${this.query} FROM ${table} `;
        return this;
    }

    addJoin = (join: string) => {
        this.query = `${this.query} ${join} `;
        return this;
    }

    /**
     * set Where definition definition
     */
    addWhere = (where: string, parameter: any) => {
        if (!this.query.includes('WHERE') && !where.includes('WHERE')) {
            this.query = `${this.query} WHERE 1=1 `;
        }
        this.query = `${this.query} AND ${where}`;
        if (Array.isArray(parameter)) {
            parameter.forEach(p => this.parameters.push(p))
            return this;
        }
        this.parameters.push(parameter);
        return this;
    }

    /**
     * set Order By definition definition
     */
    addOrder = (order: string) => {
        if (!this.query.includes('ORDER BY') && !order.includes('ORDER BY')) {
            this.query = `${this.query} ORDER BY `;
        }
        this.query = `${this.query} ${order}`;
        return this;
    }


    /**
     * set Group By definition definition
     */
    addGroup = (order: string) => {
        if (!this.query.includes('GROUP BY') && !order.includes('GROUP BY')) {
            this.query = `${this.query} GROUP BY `;
        }
        this.query = `${this.query} ${order}`;
        return this;
    }

    /**
     * Get raw query definition
     */
    rawQuery() {
       return this.query;
   }

    /**
     * Get parameters query definition
     */
    getParameters() {
        return this.parameters;
    }

    slices(array: any[], limit: number) {
        const slices: any[] = [];
        let index = 0;

        while (index < array.length) {
            slices.push(array.slice(index, index + limit));
            index += limit;
        }

        return slices;
    }
}