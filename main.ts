controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -200
    }
})
info.onCountdownEnd(function () {
    game.over(true, effects.confetti)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.over(false, effects.melt)
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    info.changeScoreBy(1)
})
let time = 0
let projectile: Sprite = null
let mySprite: Sprite = null
info.startCountdown(60)
tiles.setTilemap(tilemap`level2`)
mySprite = sprites.create(img`
    . . . . e e e . . . . e e e 
    . . . . c d d c . . c d d c 
    . . . . c b d d f f d d b c 
    . . . . c 3 b d b d d b 3 c 
    . . . . f b 3 d d d d 3 b f 
    . . . . e d d d d d d d d e 
    b f b . e d f d d d d f d e 
    f d f . f d d f d d f d d f 
    f d f . f 2 d d b b d d b f 
    f d f f b b 2 2 2 2 2 2 f . 
    f b d b b d d d d d d b f . 
    . f f f d d b d d d d d f . 
    . . . f d f f d f f f d f . 
    . . . f f . . f f . . f f . 
    `, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 5))
mySprite.ay = 500
mySprite.setStayInScreen(true)
game.onUpdateInterval(1500, function () {
    projectile = sprites.createProjectileFromSide(img`
        . . b b b b b b b b b b b b . . 
        . b e 4 4 4 4 4 4 4 4 4 4 e b . 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e e 4 4 4 4 4 4 4 4 4 4 e e b 
        b e e e e e e e e e e e e e e b 
        b e e e e e e e e e e e e e e b 
        b b b b b b b d d b b b b b b b 
        c b b b b b b c c b b b b b b c 
        c c c c c c b c c b c c c c c c 
        b e e e e e c b b c e e e e e b 
        b e e e e e e e e e e e e e e b 
        b c e e e e e e e e e e e e c b 
        b b b b b b b b b b b b b b b b 
        . b b . . . . . . . . . . b b . 
        `, randint(-200, -50) - time, 0)
    tiles.placeOnTile(projectile, tiles.getTileLocation(9, 5))
})
forever(function () {
    pause(1000)
    time += 1
})
