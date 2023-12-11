using UnityEngine;
using UnityEngine.SceneManagement;

public class MoveCharacter : MonoBehaviour
{
    private Vector3 positionOrigine;
    private bool inForbiddenZone = false;
    private bool inSalon = false;
    private bool inChambre = false;


    void Start()
    {
        positionOrigine = transform.position;
    }

    void OnTriggerEnter(Collider other)
    {
        Debug.Log("OnTriggerEnter");
        // Vérifiez s'il y a une collision avec la zone interdite
        if (other.CompareTag("PieceInterdite"))
        {
            // Marquez que le personnage est actuellement dans une zone interdite
            inForbiddenZone = true;
            Debug.Log("Collision avec la zone interdite");
        }
        else if (other.CompareTag("SalonCollider"))
        {
            inSalon = true;
            Debug.Log("Collision avec le salon");
        }
        else if (other.CompareTag("ChambreCollider"))
        {
            inChambre = true;
            Debug.Log("Collision avec la chambre");
        }
    }

    void OnTriggerExit(Collider other)
    {
        // Réinitialisez le booléen lorsque le personnage quitte la zone interdite
        if (other.CompareTag("PieceInterdite"))
        {
            inForbiddenZone = false;
        }

        else if (other.CompareTag("SalonCollider"))
        {
            inSalon = false;
        }

        else if (other.CompareTag("ChambreCollider"))
        {
            inChambre = false;
        }
    }

    void Update()
    {
        // Vérifiez si le personnage est actuellement dans une zone interdite et s'il n'y a pas de mouvement
        if (inForbiddenZone && !(Input.GetMouseButtonDown(0) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)))
        {
            // Repositionnez le personnage à sa position d'origine
            ReplacerAPositionOrigine();
        }

        else if (inSalon && !(Input.GetMouseButtonDown(0) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)))
        {
            SceneManager.LoadScene(1);
        }

        else if (inChambre && !(Input.GetMouseButtonDown(0) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)))
        {
            SceneManager.LoadScene(3);
        }
    }

    void ReplacerAPositionOrigine()
    {
        // Utilisez la position d'origine pour repositionner le personnage
        transform.position = positionOrigine;
    }
}
