import pygame, sys
from pygame import *
from map.map import Map
from army.army import Army

WIDTH = 480
HEIGHT = 480
WHITE = (255, 255, 255)     # RGB
BLACK = (0, 0, 0)           # RGB
RED = (255, 0, 0)           # RGB
BLUE = (0, 0, 255)          # RGB


def launch(field: Map, blue: Army, red: Army) -> None:
    pygame.init()
    screen = display.set_mode((field.width, field.height), 0, 32)
    display.set_caption("CRAZY COMBAT SIM")
    screen.fill(WHITE)
    timer = pygame.time.Clock()
    while True:
        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()
        timer.tick(10)  # 60 times per second you can do the math for 17 ms
        screen.fill(WHITE)
        drawArmy(screen, blue, BLUE)
        drawArmy(screen, red, RED)
        display.update()
        if(blue.alive and red.alive):
            blue.step(red)
        if(blue.alive and red.alive):
            red.step(blue)
        if(not blue.alive or not red.alive):
            if red.alive:
                print("----------------RED ARMY WON----------------")
            else:
                print("----------------BLUE ARMY WON---------------")
            break

def drawArmy(screen, army: Army, color: (int, int, int)) -> None:
    for sl in army.army:
        if(sl.alive):
            pos_on_screen = (int(sl.x), int(sl.y))
            draw.circle(screen, color, pos_on_screen, 1)
        else:
            pos_on_screen = (int(sl.x), int(sl.y))
            draw.circle(screen, BLACK, pos_on_screen, 1)
