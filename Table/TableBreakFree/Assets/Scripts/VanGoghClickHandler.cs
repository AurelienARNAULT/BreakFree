using UnityEngine;

public class VanGoghClickHandler : MonoBehaviour
{
    void Update()
    {
        // Vérifier si l'utilisateur a appuyé sur la souris ou a touché l'écran
        if (Input.GetMouseButtonDown(0) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began))
        {
            // Obtenir la position du clic ou du toucher
            Vector3 clickPosition = Vector3.zero;

            if (Input.GetMouseButtonDown(0))
            {
                clickPosition = Input.mousePosition;
            }
            else if (Input.touchCount > 0)
            {
                clickPosition = Input.GetTouch(0).position;
            }

            // Convertir la position du clic ou du toucher en un rayon dans l'espace du monde
            Ray ray = Camera.main.ScreenPointToRay(clickPosition);
            RaycastHit hit;

            // Vérifier si le rayon intersecte un objet dans la scène
            if (Physics.Raycast(ray, out hit))
            {
                // Objet cliqué ou touché
                GameObject clickedObject = hit.collider.gameObject;

                if (clickedObject.name == "VanGogh (1)")
                {
                    // Votre code à exécuter lorsque l'objet est cliqué ou touché
                    SocketManager.Instance.SendSocket("vanGoghClick");
                }

                if (clickedObject.name == "Tableau")
                {
                    // Votre code à exécuter lorsque l'objet est cliqué ou touché
                    SocketManager.Instance.SendSocket("tableauChambreClick");
                }
            }
        }
    }
}
