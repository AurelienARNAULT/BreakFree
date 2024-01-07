using UnityEngine;

public class VanGoghClickHandler : MonoBehaviour
{

    void Start()
    {
        SocketManager.Instance.SendSocket("vanGoghClick");
    }
    void Update()
    {
        // V�rifier si l'utilisateur a appuy� sur la souris ou a touch� l'�cran
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

            // V�rifier si le rayon intersecte un objet dans la sc�ne
            if (Physics.Raycast(ray, out hit))
            {
                // Objet cliqu� ou touch�
                GameObject clickedObject = hit.collider.gameObject;

                if (clickedObject.name == "VanGogh (1)")
                {
                    // Votre code � ex�cuter lorsque l'objet est cliqu� ou touch�
                    //SocketManager.Instance.SendSocket("vanGoghClick");
                }

                if (clickedObject.name == "Tableau")
                {
                    // Votre code � ex�cuter lorsque l'objet est cliqu� ou touch�
                    SocketManager.Instance.SendSocket("tableauChambreClick");
                }
            }
        }
    }
}
