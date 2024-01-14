using System;
using SocketIOClient;
using UnityEngine;
using TMPro;
using Newtonsoft.Json.Linq;

public class IconClickHandler : MonoBehaviour
{
    public string message = "";
    public GameObject gobject;
    private JObject jsonMessage;

    private string eventName = "objectSentToPocket";

    void Start()
    {
        Debug.Log(message);
        // Création d'un nouvel objet JObject et ajout du champ "name"
        jsonMessage = new JObject
        {
            { "name", message }
        };
    }

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
                if (clickedObject == this.gameObject)
                {
                    Debug.Log("PocheIcon clicked");
                    // Votre code à exécuter lorsque l'objet est cliqué ou touché
                    SocketManager.Instance.SendSocket(eventName, jsonMessage.ToString());
                    if (gobject.name == "Key" || gobject.name == "Dice"){
                        SoundManager.Instance.PlayRiddleStep();
                    }
					gobject.SetActive(false);
                }
            }
        }
    }
}
