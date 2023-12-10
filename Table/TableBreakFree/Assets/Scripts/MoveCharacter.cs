using UnityEngine;
using UnityEngine.SceneManagement;

public class MoveCharacter : MonoBehaviour
{
    private Vector3 positionOrigine;
    private bool inForbiddenZone = false;
    private bool inSalon = false;


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
    }

    void Update()
    {
        // Vérifiez si le personnage est actuellement dans une zone interdite et s'il n'y a pas de mouvement
        if (inForbiddenZone && !Input.GetMouseButtonDown(0))
        {
            // Repositionnez le personnage à sa position d'origine
            ReplacerAPositionOrigine();
        }

        else if (inSalon && !Input.GetMouseButtonDown(0))
        {
            SceneManager.LoadScene(1);
        }
    }

    void ReplacerAPositionOrigine()
    {
        // Utilisez la position d'origine pour repositionner le personnage
        transform.position = positionOrigine;
    }
}
