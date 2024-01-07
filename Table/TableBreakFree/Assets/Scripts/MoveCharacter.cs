using UnityEngine;
using UnityEngine.SceneManagement;
using Lean.Touch;

public class MoveCharacter : MonoBehaviour
{
    private Vector3 positionOrigine;
    private bool inForbiddenZone = false;
    private bool inSalon = false;
    private bool inChambre = false;


    GameObject ChambreCollider;
    GameObject Door;
    GameObject CrimeDoNotCross;


    void Start()
    {
        positionOrigine = transform.position;


        ChambreCollider = GameObject.Find("ChambreCollider");
        Door = GameObject.Find("Door");
        CrimeDoNotCross = GameObject.Find("CrimeChambre");
    }

    void OnTriggerEnter(Collider other)
    {
        // V�rifiez s'il y a une collision avec la zone interdite
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
        // R�initialisez le bool�en lorsque le personnage quitte la zone interdite
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
        //Debug.Log("inForbiddenZone " + inForbiddenZone + " x " + LeanTouch.Fingers.Count);

        // V?rifiez si le personnage est actuellement dans une zone interdite et s'il n'y a pas de mouvement
        if (LeanTouch.Fingers.Count <= 1)
        {
            if (inForbiddenZone)
            {
                // Repositionnez le personnage ? sa position d'origine
                ReplacerAPositionOrigine();
            }

            else if (inSalon)
            {
                if (ChambreCollider) PlayerPrefs.SetInt("ChambreOpen", ChambreCollider.tag == "ChambreCollider" ? 2 : 1);
                if (CrimeDoNotCross) PlayerPrefs.SetInt("CrimePresent", CrimeDoNotCross.activeInHierarchy ? 2 : 1);
                if (Door)
                {
                    Transform doorTransform = Door.transform;
                    Vector3 rotation = doorTransform.rotation.eulerAngles;

                    PlayerPrefs.SetFloat("DoorRotationX", rotation.x);
                    PlayerPrefs.SetFloat("DoorRotationY", rotation.y);
                    PlayerPrefs.SetFloat("DoorRotationZ", rotation.z);

                    Vector3 position = doorTransform.position;

                    PlayerPrefs.SetFloat("DoorPositionX", position.x);
                    PlayerPrefs.SetFloat("DoorPositionY", position.y);
                    PlayerPrefs.SetFloat("DoorPositionZ", position.z);
                }

                PlayerPrefs.Save();

                SceneManager.LoadScene(2);
            }

            else if (inChambre)
            {
                if (ChambreCollider) PlayerPrefs.SetInt("ChambreOpen", ChambreCollider.tag == "ChambreCollider" ? 2 : 1);
                if (CrimeDoNotCross) PlayerPrefs.SetInt("CrimePresent", CrimeDoNotCross.activeInHierarchy ? 2 : 1);
                if (Door)
                {
                    Transform doorTransform = Door.transform;
                    Vector3 rotation = doorTransform.rotation.eulerAngles;

                    PlayerPrefs.SetFloat("DoorRotationX", rotation.x);
                    PlayerPrefs.SetFloat("DoorRotationY", rotation.y);
                    PlayerPrefs.SetFloat("DoorRotationZ", rotation.z);

                    Vector3 position = doorTransform.position;

                    PlayerPrefs.SetFloat("DoorPositionX", position.x);
                    PlayerPrefs.SetFloat("DoorPositionY", position.y);
                    PlayerPrefs.SetFloat("DoorPositionZ", position.z);
                }

                PlayerPrefs.Save();

                SceneManager.LoadScene(5);
            }
        }
    }

    void ReplacerAPositionOrigine()
    {
        // Utilisez la position d'origine pour repositionner le personnage
        transform.position = positionOrigine;
    }
}
