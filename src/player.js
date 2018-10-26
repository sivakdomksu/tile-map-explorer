/** @module Player
  * A class representing the player.
  */
export default class Player {
  /** @constructor
    * Constructs a new player instance
    * @param {float} x - the player's x position
    * @param {float} y - the player's y position
    */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /** @method update
    * Updates the player
    * @param {double} deltaT - the elapsed time
    * @param {Input} input - the input object
    */
  update(deltaT, input) {
    if(input.keyPressed("ArrowLeft")) this.x--;
    if(input.keyPressed("ArrowRight")) this.x++;
    if(input.keyPressed("ArrowUp")) this.y--;
    if(input.keyPressed("ArrowDown")) this.y++;
  }

  /** @method render
    * Renders the player
    * @param {double} deltaT - elapsed time
    * @param {Context2D} context - the rendering context
    */
  render(deltaT, context) {
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(this.x, this.y, 25, 0, 2*Math.PI);
    context.fill();
  }

}
