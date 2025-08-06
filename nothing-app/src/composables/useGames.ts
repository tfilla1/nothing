import { Ref, ref } from "vue";

export type GameType = "brickbreaker" | "eights" | "canvas" | "card";


export default function useGames() {
  const gameList = [
    {
      modelValue: "brickbreaker",
      title: "brickbreaker",
      prependIcon: "$arrowLeft",
      // onClick: () => (selectedGame.value = undefined),
      props: {
        appendIcon: "$arrowRight",
        onClick: (chosenGame: GameType): any => {
          selectedGame.value = gameList.find(
            (game: any) => game.modelValue === chosenGame)
        },
      },
    },
    {
      modelValue: "eights",
      title: "eights",
      prependIcon: "$arrowLeft",
      // onClick: () => (selectedGame.value = undefined),
      props: {
        appendIcon: "$arrowRight",
        onClick: (chosenGame: GameType): any => {
          console.log({ chosenGame })
          selectedGame.value = gameList.find(
            (game: any) => game.modelValue === chosenGame)
        },
      },
    },
  ]

  const selectedGame: Ref<any> = ref(undefined)
  const chooseGame = (chosenGame: string) => {
    console.log({ chosenGame })
    selectedGame.value = gameList.find(x => x.modelValue === chosenGame)
  }
  const getGameList = () => {
    return gameList
  }

  return {
    selectedGame,
    chooseGame,
    getGameList
  }
}
