import { IInitDataResponse } from "@/services/service-index";
import { create } from "zustand";

interface IInitDataStore {
  initData?: IInitDataResponse;
  setInitData: (initData: IInitDataResponse) => void;
}

export const useInitDataStore = create<IInitDataStore>((set) => ({
  initData: undefined,
  setInitData: (initData) => set((state) => ({ ...state, initData })),
}));
