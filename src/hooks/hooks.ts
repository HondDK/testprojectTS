import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import  { AppDispatch } from '../redux/store/store'
import type  {RootState} from "../redux/types";

// Используйте во всем приложении вместо обычных `useDispatch` и `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector