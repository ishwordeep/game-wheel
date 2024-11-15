import { Api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleDataResponse } from "./service-response";

export interface GameResponse {
  id: number;
  name: string;
  agent_link: string;
  player_link: string;
  image?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const useFetchGames = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<GameResponse>>({
    url: Api.Game.fetch({
      page,
      perPage,
      keyword,
    }),
    queryKey: ["games"],
  });
};

const useFetchGame = (id: number) => {
  return useFetch<SingleDataResponse<GameResponse>>({
    url: Api.Game.fetchOne.replace(":id", id + ""),
    queryKey: ["game", id],
    enabled: !!id,
  });
};

const useAddGame = () => {
  {
    return useMutate({
      url: Api.Game.create,
      invalidates: ["games"],
      message: "Game added successfully",
    });
  }
};

const useUpdateGame = () => {
  return useMutate({
    url: Api.Game.update,
    invalidates: ["games", "game"],
    message: "Game updated successfully",
    method: "POST",
  });
};

const useDeleteGame = () => {
  return useMutate({
    url: Api.Game.delete,
    invalidates: ["games"],
    message: "Game deleted successfully",
    method: "DELETE",
  });
};

export {
  useAddGame,
  useDeleteGame,
  useFetchGame,
  useFetchGames,
  useUpdateGame,
};
