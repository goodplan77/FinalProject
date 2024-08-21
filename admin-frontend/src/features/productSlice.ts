import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product , initProduct, initProductList  } from "../type/product";

// 초기 상태에 전체 리스트와 필터링된 리스트를 분리
let initialState = {
    allProducts: initProductList,
    filteredProducts: [] as Product[],
    oneProduct : initProduct
};

let productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        selectAllProduct: (state, action: PayloadAction<Product[]>) => {
            state.allProducts = action.payload;
            state.filteredProducts = action.payload; // 모든 게시물을 필터링된 리스트에도 저장
        },
        selectOneProduct:(state , action: PayloadAction<Product>) => {
            state.oneProduct = action.payload;
        }
    }
});

export const { selectAllProduct , selectOneProduct } = productSlice.actions;
export default productSlice.reducer;