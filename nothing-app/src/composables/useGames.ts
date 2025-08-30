// import { Item } from "@/classes/Item";
import { Ref, ref } from "vue";

export type GameType = "brickbreaker" | "eights" | "canvas" | "card";

export interface GameItem {
  modelValue: GameType;
  title: string;
  prependIcon: string;
  props: {
    appendIcon: string;
    onClick: () => void;
  };
}

export default function useGames() {

  const gameList: GameItem[] = [
    {
      modelValue: "brickbreaker",
      title: "brickbreaker",
      prependIcon: "$arrowLeft",
      props: {
        appendIcon: "$arrowRight",
        onClick: () => {
          selectedGame.value = gameList.find(
            game => game.modelValue === "brickbreaker")
        },
      },
    },
    {
      modelValue: "eights",
      title: "eights",
      prependIcon: "$arrowLeft",
      props: {
        appendIcon: "$arrowRight",
        onClick: () => {
          selectedGame.value = gameList.find(
            game => game.modelValue === "eights")
        },
      },
    },
  ]

  const selectedGame: Ref<GameItem | undefined> = ref(undefined)
  const byType = new Map(gameList.map(g => [g.modelValue, g] as const));
  const chooseGame = (chosenGame: GameType) => { selectedGame.value = byType.get(chosenGame); };

  const getGameList = () => gameList

  return {
    selectedGame,
    chooseGame,
    getGameList
  }
}
