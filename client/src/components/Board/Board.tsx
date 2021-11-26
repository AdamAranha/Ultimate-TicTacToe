import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeBoard, clearBoard } from '../../features/boardSlice';


export const Board: FC = (): any => {

    let sectionArr: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const board = useSelector((state: any) => state.board.value)
    const dispatch = useDispatch();

    useEffect(() => {
        let squareList = document.getElementsByClassName('square');
        Array.from(squareList).forEach((square: any) => {
            square.addEventListener('click', registerClick)
        })
    }, [])

    const registerClick = (event: any): void => {
        dispatch(changeBoard({
            position: event.target.id,
            marker: 1
        }));
    }

    const decideMarker = (marker: number): string | undefined => {
        switch (marker) {
            case 0:
                return undefined;
            case 1:
                return 'X';
            case 2:
                return 'O';
            default:
                return undefined
        }
    }

    return (
        <div className='board'>
            {sectionArr.map((section: any, bigIndex: number) => (
                <div className={`section section${section}`} id={section} key={section}>
                    {sectionArr.map((square: any, smallIndex: number) => (
                        <div className={`square square${smallIndex}`} id={`${section}${smallIndex}`} key={`${section}${smallIndex}`} data-marker={decideMarker(board.fullBoard[bigIndex][smallIndex])} />
                    ))}
                </div>
            ))}
            <p>{board.fullBoard[0][0]}</p>
            <button onClick={() => {
                dispatch(changeBoard({
                    position: 'A0',
                    marker: 2
                }));
            }}>Click Me</button>
            <button onClick={() => {
                dispatch(clearBoard({}))
            }}>reset</button>
        </div>
    )
}