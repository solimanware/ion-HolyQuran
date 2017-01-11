import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

    //apply css to ancestor that was clicked
    findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }
}