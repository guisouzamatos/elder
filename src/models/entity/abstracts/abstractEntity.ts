import {BaseEntity} from "typeorm";
import {PaginateProjection} from "../../interface/paginate-projection";

export class AbstractEntity extends BaseEntity {
    public static async findPaginate(query: string, parameters: any[], page: number, size: number): Promise<PaginateProjection> {
        if (isNaN(page) ) {
            page = 1;
        }
        if (isNaN(size)) {
            size = 10;
        }
        const {count} = await this.getCount(query, parameters);
        const offset = (page - 1) * size;
        const limit = size;
        const newParameters = [...parameters, Number(limit), Number(offset)];
        const dataQuery = `
            SELECT *
            FROM (${query}) dt
            LIMIT $${parameters.length + 1} OFFSET $${parameters.length + 2}
        `;
        const data = await this.query(dataQuery, newParameters)
        const hasData = data && data.length;
        const first = hasData ? data[0]['rn'] : 0;
        const last = hasData ? data[data.length - 1]['rn'] : 0;
        const isFirstPage = (first === Number(page));
        const isLastElement = (last === count);
        return {
            content: data,
            first: first,
            last: last,
            isFirstPage: isFirstPage,
            isLastPage: isLastElement,
            pageNumber: Number(page),
            pageSize: Number(size),
            totalElements: count
        };
    }

    private static async getCount(query: string, parameters: any[]) {
        const dataCount = `select count(*) as "count" FROM (${query})`;
        return (await this.query(dataCount, parameters))[0];
    }
}


