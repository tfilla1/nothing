import useRandom from "./useRandom";

export interface GameBallType {
  circle: Phaser.GameObjects.Arc;
  body?: Phaser.Physics.Arcade.Body;
  baseY: number;
  offset: number;
}
export interface GameBrickType {
  direction?: string;
  rect: Phaser.GameObjects.Rectangle;
  body?: Phaser.Physics.Arcade.Body;
  baseY: number;
  offset: number;
}
export interface GamePaddleType {
  direction?: string;
  rect: Phaser.GameObjects.Rectangle;
  body?: Phaser.Physics.Arcade.Body;
  baseY: number;
  offset: number;
}

export interface BallType {
  x: number;
  y: number;
  size: number;
}
export interface Brick {
  x: number
  y: number
  size: number
  hitsLeft?: number
  text?: string
}
export interface PaddleType {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: string;
}

export default function useBrickBreaker() {

  const paddleDirection = {
    horizontal: "horizontal",
    vertical: "vertical",
  };

  const ORIGIN_TOP_LEFT = 0;
  const ORIGIN_CENTER = 0.5;

  const colors = {
    ball: 0xaa00ff,
    brick: 0xff00aa,
    paddle: 0x00aaff
  }
  const hits = {
    brick: 12
  }
  const size = {
    brick: 25,
    canvas: 500,
    paddle: { width: 50, height: 200 },
  }
  const speed = {
    ball: 200,
    paddle: 200
  }

  const balls: GameBallType[] = [];
  const bricks: GameBrickType[] = [];
  const paddles: GamePaddleType[] = [];

  function addBall(this: Phaser.Scene, ball: BallType, index: number) {
    const circle = this.add.circle(ball.x, ball.y, ball.size, colors.ball);
    circle.setOrigin(ORIGIN_CENTER);

    this.physics.add.existing(circle);

    const body = circle.body as Phaser.Physics.Arcade.Body;

    body.setCollideWorldBounds(true);
    body.setBounce(1);
    body.setVelocity(speed.ball, speed.ball);

    balls.push({ circle, body, baseY: ball.y, offset: index * 0.2 });
  }

  function addBrick(this: Phaser.Scene, brick: Brick, index: number) {
    const rect = this.add.rectangle(
      brick.x,
      brick.y,
      brick.size,
      brick.size,
      colors.brick
    );
    rect.setOrigin(ORIGIN_TOP_LEFT);

    this.physics.add.existing(rect);
    const body = rect.body as Phaser.Physics.Arcade.Body;

    body.setCollideWorldBounds(true);
    body.setImmovable(true);

    bricks.push({ rect, baseY: brick.y, offset: index * 0.2 });
  }

  function addPaddle(this: Phaser.Scene, paddle: PaddleType, index: number) {
    const rect = this.add.rectangle(
      paddle.x,
      paddle.y,
      paddle.width,
      paddle.height,
      colors.paddle
    );

    rect.setOrigin(ORIGIN_TOP_LEFT);

    this.physics.add.existing(rect);
    const body = rect.body as Phaser.Physics.Arcade.Body;
    body.setImmovable(true);
    body.setCollideWorldBounds(true);

    paddles.push({
      direction: paddle.direction,
      rect,
      body,
      baseY: paddle.y,
      offset: index * 0.2,
    });
  }

  function generateBricks(amount: number, boundary: number): Brick[] {
    return Array.from(
      { length: amount },
      () => ({
        x: useRandom(boundary, 50),
        y: useRandom(boundary),
        size: size.brick,
        hitsLeft: hits.brick
      })
    )
  }

  function reflectBallOffPaddle(ball: GameBallType, paddle: GamePaddleType) {
    const ballBody = ball.body!;

    if (paddle.direction === "horizontal") {
      const paddleCenterX = paddle.rect.x + paddle.rect.width / 2;
      const diffX = ball.circle.x - paddleCenterX;
      ballBody.setVelocityX(diffX * 10);
      ballBody.setVelocityY(-Math.abs(ballBody.velocity.y)); // keep it going upward
    }

    if (paddle.direction === "vertical") {
      const paddleCenterY = paddle.rect.y + paddle.rect.height / 2;
      const diffY = ball.circle.y - paddleCenterY;
      ballBody.setVelocityY(diffY * 10);
      ballBody.setVelocityX(-Math.abs(ballBody.velocity.x)); // bounce to the left
    }
  }
  function updatePaddle(paddle: GamePaddleType, cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined, letters: Record<"W" | "A" | "S" | "D", Phaser.Input.Keyboard.Key>) {
    paddle.body?.setVelocity(0);

    if (paddle.direction && paddle.direction === paddleDirection.horizontal) {
      if (cursors?.left.isDown || letters.A.isDown)
        paddle.body?.setVelocityX(-speed.paddle);
      if (cursors?.right.isDown || letters.D.isDown)
        paddle.body?.setVelocityX(speed.paddle);
    }
    if (paddle.direction && paddle.direction === paddleDirection.vertical) {
      if (cursors?.up.isDown || letters.W.isDown)
        paddle.body?.setVelocityY(-speed.paddle);
      if (cursors?.down.isDown || letters.S.isDown)
        paddle.body?.setVelocityY(speed.paddle);
    }
  }

  return {
    balls,
    bricks,
    paddles,
    size,
    addBall,
    addBrick,
    addPaddle,
    generateBricks,
    reflectBallOffPaddle,
    updatePaddle,
  }
}
