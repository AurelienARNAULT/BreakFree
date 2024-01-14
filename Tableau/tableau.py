import time
import pygame
import sys
import numpy as np
import socketio
import json

# Variables de gestion de connexion
reconnection_attempts = 5
reconnection_delay = 2 

# Initialiser le client Socket.io
sio = socketio.Client(reconnection_attempts=reconnection_attempts, reconnection_delay=reconnection_delay)
sent = False
active = False
transitioning = False
transition_progress = 0
transition_speed = 1  # Vitesse de la transition
bedRoom = False
scanned = False
mouse_is_pressed = False
razor_received = False
razor_used = False
wrong_object = False

current_image_path = 'assets/sprits/tableau.jpg'
background_image_path = 'assets/sprits/QRImage.jpg'
background_image = None

# Tenter de se connecter au serveur
attempt = 0
while not sio.connected and attempt < reconnection_attempts:
    try:
        sio.connect('http://localhost:3000')
        print("Connecté au serveur WebSocket.")
    except socketio.exceptions.ConnectionError as e:
        print(f"Tentative {attempt + 1}/{reconnection_attempts} échouée: {e}")
        time.sleep(reconnection_delay)

if not sio.connected:
    print("Impossible de se connecter au serveur WebSocket.")
    sys.exit()
else:
    sio.emit('helloWorld', {'deviceName': 'tableau', 'message': 'Hello World!'})

@sio.on('onVanGoghClick') # Décorateur pour gérer l'événement 'onVanGoghClick'
def onVanGoghClick(data):
    global active
    global transitioning
    global bedRoom
    global current_image_path
    global fond_original
    global facteur_luminosite
    global transition_progress
    if not active:
        transition_progress = 0
        transitioning = True
        active = True
        bedRoom = False
        current_image_path = 'assets/sprits/tableau.jpg'
        fond_original = pygame.image.load(current_image_path)  # Charger la nouvelle image
        fond_original = pygame.transform.scale(fond_original, (width, height))  # Redimensionner l'image
        facteur_luminosite = 0.10
        print('onVanGoghClick', data)
        awake_sound.play()

@sio.on('onEnterBedroom') # Décorateur pour gérer l'événement 'onBedRoomClick'
def onEnterBedroom(data):
    global active
    global transitioning
    global bedRoom
    global current_image_path
    global fond_original  # Ajoutez cette ligne si vous souhaitez mettre à jour fond_original directement ici
    global facteur_luminosite
    global transition_progress
    global background_image
    if not active:
        transition_progress = 0
        transitioning = True
        active = True
        bedRoom = True
        current_image_path = 'assets/sprits/tableauChambre.jpg'
        try:
            background_image = pygame.image.load(background_image_path).convert_alpha()  # Assurez-vous que le chemin est correct
            background_image = pygame.transform.scale(background_image, (width, height))
        except Exception as e:
            print(f"Erreur lors du chargement de l'image de fond : {e}")
            background_image = None  # Cela garantit que si le chargement échoue, background_image est défini sur None
        fond_original = pygame.image.load(current_image_path)  # Charger la nouvelle image
        fond_original = pygame.transform.scale(fond_original, (width, height))  # Redimensionner l'image
        facteur_luminosite = 1.0  # Réinitialiser le facteur de luminosité
        awake_sound.play()

@sio.on('onScanned') # Gestionnaire d'événement pour 'onScanned'
def onScanned(data):
    global scanned
    scanned = True
    print('onScanned', data)

@sio.on('onLeaveRoom') # Décorateur pour gérer l'événement 'onLeaveOffice'
def onLeaveRoom(data):
    global active
    global transitioning
    global bedRoom
    global dessin_surface
    transitioning = False
    active = False
    bedRoom = False
    dessin_surface = pygame.Surface((width, height), pygame.SRCALPHA)
    print('onLeaveRoom', data)

@sio.on('onObjectUsed') # Décorateur pour gérer l'événement 'onReceivedObject'
def onObjectUsed(data):
    global scanned
    global sent
    global razor_received
    global wrong_object
    print('onObjectUsed', data)
    # Extraire et analyser le contenu JSON de 'data'
    content = json.loads(data['content'])
    print(content)

    # Vérifier si le "name" est "razor"
    if content.get("name") == "razor" and razor_received == False:
        razor_received = True
    else:
        wrong_object = True

def ajuster_luminosite(image, facteur):
    # Convertir l'image en un tableau numpy
    array = pygame.surfarray.pixels3d(image)
    # Ajuster la luminosité
    array = np.clip(array * facteur, 0, 255).astype(np.uint8)
    # Convertir le tableau numpy en une nouvelle surface pygame
    return pygame.surfarray.make_surface(array)


def verifier_soleil(surface, zone, couleur, seuil):
    # Conversion de la surface en un tableau NumPy
    pixels = pygame.surfarray.pixels3d(surface)
    zone_pixels = pixels[zone.left:zone.right, zone.top:zone.bottom]

    # Compter le nombre de pixels correspondant à la couleur donnée
    nombre_pixels_colores = np.sum(np.all(zone_pixels == couleur, axis=2))
    return nombre_pixels_colores > seuil

def verifier_rayons(surface, zone_rayon, zone_soleil, couleur, seuil):
    pixels = pygame.surfarray.pixels3d(surface)
    zone_rayon_pixels = pixels[zone_rayon.left:zone_rayon.right, zone_rayon.top:zone_rayon.bottom]

    nombre_pixels_zone_rayon = np.sum(np.all(zone_rayon_pixels == couleur, axis=2))

    pixels = pygame.surfarray.pixels3d(surface)
    zone_soleil_pixels = pixels[zone_soleil.left:zone_soleil.right, zone_soleil.top:zone_soleil.bottom]

    nombre_pixels_zone_soleil = np.sum(np.all(zone_soleil_pixels == couleur, axis=2))
    return (nombre_pixels_zone_rayon - nombre_pixels_zone_soleil) > seuil


# Initialiser Pygame
pygame.init()
pygame.mixer.init()

# Sons
steps = 0
awake_sound = pygame.mixer.Sound('assets/sounds/PaintingAwake.mp3')
step_sound = pygame.mixer.Sound('assets/sounds/riddleStep.mp3')
finished_sound = pygame.mixer.Sound('assets/sounds/riddleFinished.mp3')
wrong_sound = pygame.mixer.Sound('assets/sounds/wrongObject.mp3')

# Récupération des dimensions de l'écran
infoObject = pygame.display.Info()
#width, height = infoObject.current_w, infoObject.current_h
#TODO: Remove this line
width, height = 1024, 768

# Paramètres de l'image et de la fenêtre
chemin_image = current_image_path
fond_original = pygame.image.load(chemin_image)
original_width, original_height = fond_original.get_size()

# Redimensionner l'image de fond pour qu'elle corresponde à la taille de l'écran
fond_original = pygame.transform.scale(fond_original, (width, height))
fond = fond_original.copy()
facteur_luminosite = 0.10

# Création de la fenêtre plein écran
#TODO: Remove the comment
screen = pygame.display.set_mode((width, height))#, pygame.FULLSCREEN)
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
GREY = (128, 128, 128)

# Calculer les facteurs d'échelle
facteur_echelle_largeur = width / original_width - 0.5
facteur_echelle_hauteur = height / original_height

# Ajuster les zones
zone_soleil = pygame.Rect(width - 101* facteur_echelle_largeur,1,100 * facteur_echelle_largeur,100 * facteur_echelle_hauteur)
zone_rayons = pygame.Rect((width - 200 * facteur_echelle_largeur), 0, 200 * facteur_echelle_largeur, 200 * facteur_echelle_hauteur)



# Boucle principale
running = True
not_in_zone = False
temp_surface = dessin_surface.copy()
while running:
    if not active:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False   

        screen.fill(GREY)
        pygame.display.flip()
    elif transitioning:
        # Mise à jour de la progression de la transition
        transition_progress += transition_speed
        color = (transition_progress, transition_progress, transition_progress)
        if transition_progress >= 255:
            color = (transition_progress - 255, transition_progress - 255, transition_progress - 255)
            if transition_progress >= 310:
                transitioning = False
        
        screen.fill(color)
        pygame.display.flip()
    elif bedRoom :
        if background_image is None:
            print("L'image de fond n'a pas été chargée.")
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_ESCAPE:
                    running = False
            elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:  # Bouton gauche de la souris
                if razor_received:
                    if not razor_used:
                        step_sound.play()
                        razor_used = True
                    mouse_is_pressed = True
                elif wrong_object:
                    wrong_sound.play()
                    wrong_object = False
            elif event.type == pygame.MOUSEBUTTONUP and event.button == 1:  # Bouton gauche de la souris
                mouse_is_pressed = False
            elif event.type == pygame.MOUSEMOTION and mouse_is_pressed:
                # Obtenir la position de la souris
                mouse_pos = event.pos
                # Définir la taille de la brosse
                brush_size = 20
                # Calculer la zone à effacer
                clear_rect = pygame.Rect(mouse_pos[0] - brush_size // 2, mouse_pos[1] - brush_size // 2, brush_size, brush_size)
                # Effacer cette zone sur l'image de premier plan
                if background_image:
                    fond_original.blit(background_image, clear_rect.topleft, clear_rect)
        screen.blit(fond_original, (0, 0))

        if scanned:
            font_size = 75
            font = pygame.font.SysFont(None, font_size)
            if not font:
                print("Failed to load font.")
            text = font.render("Scanned Successfully!", True, (255, 255, 255))
            text_rect = text.get_rect(center=(width / 2, height / 2))

            background_rect = text_rect.inflate(20, 10)
            pygame.draw.rect(screen, (255, 0, 0), background_rect)
            screen.blit(text, text_rect)

        pygame.display.flip()
    else:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                if not (zone_rayons.collidepoint(event.pos) or zone_soleil.collidepoint(event.pos)):
                    not_in_zone = True
            if event.type == pygame.MOUSEBUTTONUP:
                if not_in_zone:
                    dessin_surface = temp_surface
                    temp_surface = dessin_surface.copy()
                    not_in_zone = False
        # Dessin
        if pygame.mouse.get_pressed()[0]:
            mouse_pos = pygame.mouse.get_pos()
            #if zone_rayons.collidepoint(mouse_pos) or zone_soleil.collidepoint(mouse_pos):
            if last_pos is not None:
                # Dessiner une ligne de la dernière position à la position actuelle
                pygame.draw.line(dessin_surface, YELLOW, last_pos, mouse_pos, 8)
            last_pos = mouse_pos
        else:
            last_pos = None

        # Détection
        if not not_in_zone:
            if not soleil and verifier_soleil(dessin_surface, zone_soleil, YELLOW, seuil=2500 * max(facteur_echelle_largeur,facteur_echelle_hauteur)):
                steps += 1
                if steps <= 3 and steps > 0:
                    step_sound.play()
                soleil = True
                facteur_luminosite = facteur_luminosite + 0.30
            if not rayons_haut and verifier_rayons(dessin_surface, zone_rayons, zone_soleil,  YELLOW, seuil=200 * max(facteur_echelle_largeur,facteur_echelle_hauteur)):
                steps += 1
                if steps <= 3 and steps > 0:
                    step_sound.play()
                rayons_haut = True
                facteur_luminosite = facteur_luminosite + 0.20
            if not rayons_centre and verifier_rayons(dessin_surface, zone_rayons, zone_soleil,  YELLOW, seuil=500 * max(facteur_echelle_largeur,facteur_echelle_hauteur)):
                steps += 1
                if steps <= 3 and steps > 0:
                    step_sound.play()
                rayons_centre = True
                facteur_luminosite = facteur_luminosite + 0.20
            if not rayons_droite and verifier_rayons(dessin_surface, zone_rayons, zone_soleil,  YELLOW, seuil=800 * max(facteur_echelle_largeur,facteur_echelle_hauteur)):
                steps += 1
                if steps <= 3 and steps > 0:
                    step_sound.play()
                rayons_droite = True
                facteur_luminosite = facteur_luminosite + 0.20
            

        # Affichage de l'image de fond
        fond = ajuster_luminosite(fond_original, facteur_luminosite)
        screen.blit(fond, (0, 0))
        screen.blit(dessin_surface, (0, 0))

        if soleil and rayons_haut and rayons_centre and rayons_droite and not sent:
            finished_sound.play()
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
