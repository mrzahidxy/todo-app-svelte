// Column definitions for AG Grid
export interface ColumnDef {
    headerName: string;
    field: string;
    width?: number;
    cellStyle?: { [key: string]: string };
    type?: string;
    valueFormatter?: (params: any) => string;
    headerComponentParams?: {
        template: string;
    };
    cellRenderer?: (params: any) => string;
    headerTooltip?: string;
}

