using UnityEngine;
using UnityEngine.SceneManagement;
using Lean.Touch;

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
        // Vérifiez s'il y a une collision avec la zone interdite
        if (other.CompareTag("PieceInterdite"))
        {
            // Marquez que le personnage est actuellement dans une zone interdite
            inForbiddenZone = true;
        }
        else if (other.CompareTag("SalonCollider"))
        {
            inSalon = true;
        }
        else if (other.CompareTag("ChambreCollider"))
        {
            inChambre = true;
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
        Debug.Log("inForbiddenZone " + inForbiddenZone + " x " + LeanTouch.Fingers.Count);

        // Vérifiez si le personnage est actuellement dans une zone interdite et s'il n'y a pas de mouvement
        if (LeanTouch.Fingers.Count <= 1)
        {
            if (inForbiddenZone)
            {
                // Repositionnez le personnage à sa position d'origine
                ReplacerAPositionOrigine();
            }

            else if (inSalon)
            {
                SceneManager.LoadScene(1);
            }

            else if (inChambre)
            {
                SceneManager.LoadScene(3);
            }
        }
    }

    void ReplacerAPositionOrigine()
    {
        // Utilisez la position d'origine pour repositionner le personnage
        transform.position = positionOrigine;
    }
}
