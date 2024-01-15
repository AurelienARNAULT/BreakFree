using UnityEngine;
using UnityEngine.SceneManagement;
using Lean.Touch;

public class MoveCharacter : MonoBehaviour
{
    private Vector3 positionOrigine;
    private bool inForbiddenZone = false;
    private bool inSalon = false;
    private bool inChambre = false;
    // private bool cadenasVisible = false;

    GameObject ChambreCollider;
    GameObject Door;
    GameObject CrimeDoNotCross;
    GameObject Cadenas;


    void Start()
    {
        positionOrigine = transform.position;

        ChambreCollider = GameObject.Find("ChambreCollider");
        Door = GameObject.Find("Door");
        CrimeDoNotCross = GameObject.Find("CrimeChambre");
        Cadenas = GameObject.Find("Cadenas");
        Cadenas.SetActive(false);

    }

    void OnTriggerEnter(Collider other)
    {
        Debug.Log(other.tag + "Enter");

        if (other.CompareTag("PieceInterdite"))
        {
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
        else if (other.CompareTag("PorteCollider"))
        {
            // cadenasVisible = true;
            Cadenas.SetActive(true);
        }
        else if (other.CompareTag("Map"))
        {
            inForbiddenZone = false; inSalon = false; inChambre = false;
        }
    }

    void OnTriggerExit(Collider other)
    {
        //Debug.Log(other.tag + "Exit");

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
        else if (other.CompareTag("PorteCollider"))
        {
            // cadenasVisible = false;
            Cadenas.SetActive(false);
        }
    }

    void Update()
    {
        if (LeanTouch.Fingers.Count <= 1)
        {
            if (inForbiddenZone)
            {
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
                Debug.Log("inChambre");

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
        Debug.Log("ReplacerAPositionOrigine");
        transform.position = positionOrigine;
    }
}
