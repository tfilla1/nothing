<script lang="ts" setup>
import useBrickBreaker, {
  BallType,
  BrickType,
  PaddleType,
} from "@/composables/useBrickBreaker";
import { AUTO, Game } from "phaser";
import { onBeforeUnmount, onMounted, ref } from "vue";
import games from "../../assets/games.json";

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
  addBall,
  addBrick,
  addPaddle,
  reflectBallOffPaddle,
  updatePaddle,
} = useBrickBreaker();

// modelValue >> v-model = breaker | eights | war
defineProps<{ modelValue: string; title: string }>();

const ballData: BallType[] = games.brickbreaker.balls;
const brickData: BrickType[] = games.brickbreaker.bricksLevel2;
const paddleData: PaddleType[] = games.brickbreaker.paddles;

onMounted((): void => {
  game = new Game({
    type: AUTO,
    width: 420,
    height: 520,
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

        brickData.forEach((brick, index) => {
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
});

onBeforeUnmount(() => {
  if (game) game.destroy(true);
});
</script>
<template>
  <div ref="gameContainer" class="game-container"></div>
</template>
<style scoped>
.game-container {
  width: 100%;
  height: 100%;
}
</style>
