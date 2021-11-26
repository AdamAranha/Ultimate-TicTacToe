import { createSlice } from "@reduxjs/toolkit";

let sectionArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        value: {
            fullBoard: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]],

            overBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    reducers: {
        changeBoard: (state, action) => {

            const tempTable = state.value.fullBoard;
            const { position, marker } = action.payload;
            const position1 = sectionArr.indexOf(position[0]);
            const position2 = parseInt(position[1]);
            tempTable[position1][position2] = marker;
            state.value.fullBoard = [...tempTable];
        },
        clearBoard: (state, action) => {
            state.value.fullBoard = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]];

            state.value.overBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    }

})

export const { changeBoard, clearBoard } = boardSlice.actions;

export default boardSlice.reducer;