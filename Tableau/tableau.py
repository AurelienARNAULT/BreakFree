import pygame
import sys
import numpy as np
import socketio


# Initialiser le client Socket.io
sio = socketio.Client()
sio.connect('http://localhost:3000')
sent = False

def ajuster_luminosite(image, facteur):
    # Convertir l'image en un tableau numpy
    array = pygame.surfarray.pixels3d(image)
    # Ajuster la luminosité
    array = np.clip(array * facteur, 0, 255).astype(np.uint8)
    # Convertir le tableau numpy en une nouvelle surface pygame
    return pygame.surfarray.make_surface(array)


def verifier_dessin(surface, zone, couleur, seuil):
    # Conversion de la surface en un tableau NumPy
    pixels = pygame.surfarray.pixels3d(surface)
    zone_pixels = pixels[zone.left:zone.right, zone.top:zone.bottom]

    # Compter le nombre de pixels correspondant à la couleur donnée
    nombre_pixels_colores = np.sum(np.all(zone_pixels == couleur, axis=2))
    return nombre_pixels_colores > seuil

# Initialiser Pygame
pygame.init()

# Récupération des dimensions de l'écran
infoObject = pygame.display.Info()
width, height = infoObject.current_w, infoObject.current_h

# Paramètres de l'image et de la fenêtre
chemin_image = 'assets/sprits/tableau.jpg'
fond_original = pygame.image.load(chemin_image)
original_width, original_height = fond_original.get_size()

# Redimensionner l'image de fond pour qu'elle corresponde à la taille de l'écran
fond_original = pygame.transform.scale(fond_original, (width, height))
fond = fond_original.copy()
facteur_luminosite = 0.10

# Création de la fenêtre plein écran
screen = pygame.display.set_mode((width, height), pygame.FULLSCREEN)
pygame.display.set_caption("Détection de Dessin de Soleil")

# Initialisation des variables
soleil = False
rayons_haut = False
rayons_centre = False
rayons_droite = False
afficher_sprites = False

# Chargement des sprites
curved_arrow_sprit = pygame.image.load('assets/sprits/curved-arrow_sprit.png')
book_sprit = pygame.image.load('assets/sprits/book_sprit.png')
arrow_sprit = pygame.image.load('assets/sprits/arrow_sprit.png')
key_sprit = pygame.image.load('assets/sprits/key_sprit.png')

# Coordonnées de départ pour les sprites
sprite_x = 10  # 10 pixels depuis le bord gauche
sprite_y = height - curved_arrow_sprit.get_height() - 10

# Création d'une surface pour le dessin
dessin_surface = pygame.Surface((width, height), pygame.SRCALPHA)

# Couleurs
YELLOW = (244, 221, 39)
RED = (255, 0, 0)

# Calculer les facteurs d'échelle
facteur_echelle_largeur = width / original_width - 0.5
facteur_echelle_hauteur = height / original_height
print(facteur_echelle_largeur, facteur_echelle_hauteur)

# Ajuster les zones
zone_soleil = pygame.Rect(
    width - 100 * facteur_echelle_largeur,
    0,
    100 * facteur_echelle_largeur,
    100 * facteur_echelle_hauteur
)
zone_rayons_haut = pygame.Rect(
    (width - 150 * facteur_echelle_largeur), 
    0, 
    50 * facteur_echelle_largeur, 
    75 * facteur_echelle_hauteur
)
zone_rayons_centre = pygame.Rect((width - 150 * facteur_echelle_largeur), 75 * facteur_echelle_hauteur, 50 * facteur_echelle_largeur, 75 * facteur_echelle_hauteur)
zone_rayons_droite = pygame.Rect((width - 100 * facteur_echelle_largeur), 100 * facteur_echelle_hauteur, 100 * facteur_echelle_largeur, 50 * facteur_echelle_hauteur)


# Boucle principale
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False
    # Dessin
    if pygame.mouse.get_pressed()[0]:
        mouse_pos = pygame.mouse.get_pos()
        if zone_soleil.collidepoint(mouse_pos) or zone_rayons_haut.collidepoint(mouse_pos) or zone_rayons_centre.collidepoint(mouse_pos) or zone_rayons_droite.collidepoint(mouse_pos):
            if last_pos is not None:
                # Dessiner une ligne de la dernière position à la position actuelle
                pygame.draw.line(dessin_surface, YELLOW, last_pos, mouse_pos, 8)
            last_pos = mouse_pos
    else:
        last_pos = None

    # Détection
    if not soleil and verifier_dessin(dessin_surface, zone_soleil, YELLOW, seuil=2500 * max(facteur_echelle_largeur,facteur_echelle_hauteur)):
        soleil = True
        facteur_luminosite = facteur_luminosite + 0.30
    if not rayons_haut and verifier_dessin(dessin_surface, zone_rayons_haut, YELLOW, seuil=200 * max(facteur_echelle_largeur,facteur_echelle_hauteur)):
        rayons_haut = True
        facteur_luminosite = facteur_luminosite + 0.20
    if not rayons_centre and verifier_dessin(dessin_surface, zone_rayons_centre, YELLOW, seuil=200 * max(facteur_echelle_largeur,facteur_echelle_hauteur)):
        rayons_centre = True
        facteur_luminosite = facteur_luminosite + 0.20
    if not rayons_droite and verifier_dessin(dessin_surface, zone_rayons_droite, YELLOW, seuil=200 * max(facteur_echelle_largeur,facteur_echelle_hauteur)):
        rayons_droite = True
        facteur_luminosite = facteur_luminosite + 0.20

    # Affichage de l'image de fond
    fond = ajuster_luminosite(fond_original, facteur_luminosite)
    screen.blit(fond, (0, 0))
    screen.blit(dessin_surface, (0, 0))

    # Dessin des zones de dessin
    pygame.draw.rect(screen, RED, zone_soleil, 2)
    pygame.draw.rect(screen, RED, zone_rayons_haut, 2)
    pygame.draw.rect(screen, RED, zone_rayons_centre, 2)
    pygame.draw.rect(screen, RED, zone_rayons_droite, 2)

    if soleil and rayons_haut and rayons_centre and rayons_droite and not sent:
        afficher_sprites = True
        sio.emit('newMessage', {'message': 'Le soleil a été entièrement dessiné'})
        sent = True

    if afficher_sprites:
        screen.blit(curved_arrow_sprit, (sprite_x, sprite_y))
        screen.blit(book_sprit, (sprite_x + curved_arrow_sprit.get_width() + 5, sprite_y))
        screen.blit(arrow_sprit, (sprite_x + curved_arrow_sprit.get_width() + book_sprit.get_width() + 10, sprite_y))
        screen.blit(key_sprit, (sprite_x + curved_arrow_sprit.get_width() + book_sprit.get_width() + arrow_sprit.get_width() + 15, sprite_y))

    # Mise à jour de l'affichage
    pygame.display.flip()

pygame.quit()
sys.exit()