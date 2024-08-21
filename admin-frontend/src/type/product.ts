export interface Product{
    productNo : number,
    price : number,
    qty : number,
    title : string,
    content : string,
    status : string,
    likes : number,
}

export const initProduct:Product = {
    productNo : 0,
    price : 0,
    qty : 0,
    title : '',
    content : '',
    status : 'Y',
    likes : 0,
}

export const initProductList:Product[] = [];