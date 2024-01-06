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
    GameObject ChambreCollider;


    void Start()
    {
        ObjectDice = GameObject.Find("Dice");
        ObjectPaint = GameObject.Find("Paint");
        ObjectKey = GameObject.Find("Key");
        ChambreCollider = GameObject.Find("ChambreCollider");
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

                if (clickedObject.name == "RetourMapScene")
                {
                    if (ChambreCollider) PlayerPrefs.SetInt("PaintPresent", ChambreCollider.tag == "ChambreCollider" ? 2 : 1);
                    // Votre code à exécuter lorsque l'objet est cliqué ou touché
                    SceneManager.LoadScene(1);
                }
                if (clickedObject.name == "RetourSalonSceneFromBillard")
                {
                    if (ObjectPaint) PlayerPrefs.SetInt("PaintPresent", ObjectPaint.activeInHierarchy ? 2 : 1);
                    if (ObjectDice)  PlayerPrefs.SetInt("DicePresent", ObjectDice.activeInHierarchy ? 2 : 1);

                    PlayerPrefs.Save();
                    // Votre code à exécuter lorsque l'objet est cliqué ou touché
                    SceneManager.LoadScene(2);
                }
                if (clickedObject.name == "RetourSalonSceneFromBureau")
                {
                    if (ObjectKey) PlayerPrefs.SetInt("KeyPresent", ObjectKey.activeInHierarchy ? 2 : 1);

                    PlayerPrefs.Save();
                    // Votre code à exécuter lorsque l'objet est cliqué ou touché
                    SceneManager.LoadScene(2);
                }
            }
        }
    }
}
