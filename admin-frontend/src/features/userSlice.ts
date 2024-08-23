import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUserList, initUser, User } from "../type/User";

// 초기 상태에 전체 리스트와 필터링된 리스트를 분리
let initialState = {
    allBoards: initialUserList,
    filteredUsers: [] as User[],
    oneUser: initUser
};

let userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        selectAllUser: (state, action: PayloadAction<User[]>) => {
            state.allBoards = action.payload;
            state.filteredUsers = action.payload; // 모든 회원을 필터링된 리스트에도 저장
        },
        selectOneUser: (state, action: PayloadAction<User>) => {
            state.oneUser = action.payload;
        }
    }
});

export const { selectAllUser, selectOneUser } = userSlice.actions;
export default userSlice.reducer;
