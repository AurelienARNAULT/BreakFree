import qrcode

# Couleurs à encoder
couleurs = ["bleu", "blanc", "rouge", "vert"]

# URL à encoder
url = "http://breakFree/scan"

# Concaténation des couleurs et de l'URL en une chaîne de caractères
data = f"{url}?colors={','.join(couleurs)}"

# Générer le QR Code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(data)
qr.make(fit=True)

# Convertir le QR Code en Image
qr_code_img = qr.make_image(fill=(37,155,157),fill_color='black', back_color='transparent')


from PIL import Image

# Charger l'image hôte
host_image = Image.open('assets/sprits/tableauChambreDechire.jpg')

# Redimensionner le QR code si nécessaire
qr_code_img = qr_code_img.resize((100, 100))  # Ajustez la taille selon vos besoins

# Position où vous voulez intégrer le QR code (en pixels)
width, height = host_image.size
position = (width-100, height-100)  # Exemple : (x, y)

# Coller le QR Code sur l'image hôte
# Assurez-vous que l'espace de couleur de l'image hôte et du QR code est compatible
host_image.paste(qr_code_img, position, qr_code_img)

# Sauvegarder l'image résultante
host_image.save('assets/sprits/QRImage.jpg')
