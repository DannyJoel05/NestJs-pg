import { CrudAction } from "../../../common/interceptor";

export interface InformationOption {
    action: CrudAction;
    resource: string;
    method: string;
    message?: string;
}



