<script lang="ts" setup>
import useBrickBreaker, {
  BallType,
  Brick,
  PaddleType,
} from "@/composables/useBrickBreaker";
import { GameType } from "@/composables/useGames";
import useLocalStorage, { STORAGE_KEYS } from "@/composables/useLocalStorage";
import { AUTO, Game } from "phaser";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import games from "../../assets/games.json";
import Search from "../../layouts/default/Search.vue";

const pendingChanges = ref(0);
const loading = computed(() => pendingChanges.value > 0);

const WOBBLE_SPEED = 0.005;
const WOBBLE_INTENSITY = 2;

const gameContainer = ref(undefined);
let game: Game | undefined = undefined;

let cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
let letters: Record<"W" | "A" | "S" | "D", Phaser.Input.Keyboard.Key>;

const {
  balls,
  bricks,
  paddles,
  size,
  addBall,
  addBrick,
  addPaddle,
  generateBricks,
  reflectBallOffPaddle,
  resetLevel,
  updatePaddle,
} = useBrickBreaker();
const { getItem, setItem } = useLocalStorage();

// modelValue >> v-model = breaker | eights | war
const things = defineProps<{ modelValue: GameType; title: string }>();

const ballData: BallType[] = games.brickbreaker.balls;
// const brickData: Brick[] = games.brickbreaker.bricksLevel2;
const paddleData: PaddleType[] = games.brickbreaker.paddles;

function init() {
  // TODO generate bricks
  // TODO create bricks
}

// TODO onWatch: savePreviousLevel
interface Level {
  key: string;
  level: number;
  bricks: Brick[];
}

const generateLevel = (scene: Phaser.Scene, level: number) => {
  currentGeneratedLevel.value = {
    level,
    key: `Level_${level}`,
    bricks: generateBricks(20, size.canvas),
  };

  currentGeneratedLevel.value.bricks.forEach((brick, index) => {
    addBrick.call(scene, brick, index);
  });
};
// const generatedLevel = computed(
//   (): Level => ({
//     key: `Level_${currentLevel.value}`,
//     bricks: generateBricks(20, size.canvas),
//   })
// );

const currentGeneratedLevel = ref({} as Level);
const currentLevel = ref(0);

const generatedLevels = ref([] as Level[]);
// const currentLevel = ref(0);
watch(
  () => currentGeneratedLevel.value,
  (val, old) => {
    if (val !== old) {
      generatedLevels.value.push(val);

      setItem(STORAGE_KEYS.currentLevels, generatedLevels.value);
    }
  }
);

function levelComplete() {
  currentLevel.value++;
  pendingChanges.value++;
  resetLevel();
  generateLevel(game?.scene.keys.default!, currentLevel.value);
  // setTimeout(() => {
  //   // this.scene.restart({ level: currentLevel.value });
  // }, 1500);

  setTimeout(() => {
    pendingChanges.value--;
  }, 1500);
}
function createBrickBreaker() {
  return new Game({
    type: AUTO,
    width: size.canvas,
    height: size.canvas,
    parent: gameContainer.value,
    physics: {
      default: "arcade",
      arcade: {
        debug: import.meta.env.DEV,
      },
    },
    scene: {
      preload() {
        // load assets
      },
      create(this: Phaser.Scene) {
        // set up the game

        // there's two paddles
        // one goes up and down
        // the other one goes left and right

        // there a ball with the option for multiple
        // more as level increases idk

        cursors = this.input.keyboard!.createCursorKeys();

        letters = this.input.keyboard!.addKeys("W,A,S,D") as typeof letters;

        ballData.forEach((ball, index) => {
          addBall.call(this, ball, index);
        });

        // const generatedBricks = generateBricks(20, size.canvas);
        // const level = this.physics.add.staticGroup()
        // currentGeneratedLevel.value =
        generateLevel(this, currentLevel.value);
        currentGeneratedLevel.value.bricks.forEach((brick, index) => {
          addBrick.call(this, brick, index);
        });

        paddleData.forEach((paddle: PaddleType, index: number) => {
          addPaddle.call(this, paddle, index);
        });

        balls.forEach((ball) => {
          paddles.forEach((paddle) => {
            this.physics.add.collider(ball.circle, paddle.rect, () => {
              reflectBallOffPaddle(ball, paddle);
            });
          });

          bricks.forEach((brick) => {
            const collider = this.physics.add.collider(
              ball.circle,
              brick.rect,
              () => {
                // Optional: Remove brick on hit
                collider.destroy();
                brick.rect.destroy();
                if (brick.rect.body) {
                  (brick.rect.body as Phaser.Physics.Arcade.Body).destroy();
                }

                if (bricks.every((brick) => !brick.rect.active)) {
                  levelComplete();
                }
                console.log({
                  bricks,
                  filtered: bricks.filter((brick) => brick.rect.active),
                });
              }
            );
          });
        });
      },
      update(this: Phaser.Scene, time: number, delta: number) {
        paddles.forEach((paddle) => {
          updatePaddle(paddle, cursors, letters);
        });

        bricks.forEach((b) => {
          // wobbler
          const yOffset =
            Math.sin(time * WOBBLE_SPEED + b.offset) * WOBBLE_INTENSITY; // wiggle by 2px
          b.rect.y = b.baseY + yOffset;
        });
      },
    },
  });
}
const hand = ref([] as any[]);
function createEights() {
  hand.value = [
    {
      suit: "spade",
      value: "A",
    },
  ];
}
function createGame() {
  console.log({ things });
  console.log({ generatedLevel: currentGeneratedLevel.value });
  if (things.modelValue === "brickbreaker") game = createBrickBreaker();
  if (things.modelValue === "eights") createEights();
}

const previousLevels = ref(getItem(STORAGE_KEYS.currentLevels));
onMounted((): void => {
  init();

  console.log({ previousLevels });
  createGame();

  levelComplete();
});

onBeforeUnmount(() => {
  if (game) game.destroy(true);
});
</script>
<template>
  <Search></Search>
  <div v-if="loading" class="d-flex flex-fill justify-center pa-4 ma-4">
    <div class="d-flex flex-column align-center">
      <v-progress-circular indeterminate></v-progress-circular>
      <div class="text-caption">generating level... take a breath</div>
    </div>
  </div>
  <div v-else>
    <div ref="gameContainer" class="game-container"></div>
    <div v-if="things.modelValue === 'eights'">
      {{ hand }}
    </div>
  </div>
</template>
<style scoped>
.game-container {
  width: 100%;
  height: 100%;
}
</style>
