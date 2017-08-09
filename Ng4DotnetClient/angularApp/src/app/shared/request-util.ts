
import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
    let httpParams = new HttpParams();
    Object.keys(req).forEach(function (key) {
        httpParams = httpParams.append(key, req[key]);
    });
    return httpParams;
};
