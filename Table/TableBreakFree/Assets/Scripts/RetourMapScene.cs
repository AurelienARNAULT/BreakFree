using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.EventSystems;

public class RetourMapScene : MonoBehaviour
{
    GameObject ObjectDice;
    GameObject ObjectPaint;
    GameObject ObjectKey;


    void Start()
    {
        ObjectDice = GameObject.Find("Dice");
        ObjectPaint = GameObject.Find("Paint");
        ObjectKey = GameObject.Find("Key");
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

                if (clickedObject.name == "RetourMapScene")
                {
                    
                    SocketManager.Instance.SendSocket("leaveRoom", "{\"msg\":\"leaving the room\"}");
                    SceneManager.LoadScene(1);
                }
                if (clickedObject.name == "RetourSalonSceneFromBillard")
                {
                    if (ObjectPaint) PlayerPrefs.SetInt("PaintPresent", ObjectPaint.activeInHierarchy ? 2 : 1);
                    if (ObjectDice)  PlayerPrefs.SetInt("DicePresent", ObjectDice.activeInHierarchy ? 2 : 1);

                    PlayerPrefs.Save();
                    // Votre code � ex�cuter lorsque l'objet est cliqu� ou touch�
                    SceneManager.LoadScene(2);
                }
                if (clickedObject.name == "RetourSalonSceneFromBureau")
                {
                    if (ObjectKey) PlayerPrefs.SetInt("KeyPresent", ObjectKey.activeInHierarchy ? 2 : 1);

                    PlayerPrefs.Save();
                    // Votre code � ex�cuter lorsque l'objet est cliqu� ou touch�
                    SceneManager.LoadScene(2);
                }
            }
        }
    }
}
