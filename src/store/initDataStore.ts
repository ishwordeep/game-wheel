import { create } from "zustand";

interface IInitData {
  name?: string;
  email?: string;
}

interface IInitDataStore {
  initData?: IInitData;
  setInitData: (initData: IInitData) => void;
}

export const useStoreInitData = create<IInitDataStore>((set) => ({
  initData: undefined,
  setInitData: (initData) => set((state) => ({ ...state, initData })),
}));
