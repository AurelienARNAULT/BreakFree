using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoaderPorteEntree : MonoBehaviour
{
    GameObject PorteGauche;
    GameObject PorteDroite;

    void Start()
    {
        PorteGauche = GameObject.Find("PorteGauche");
        PorteDroite = GameObject.Find("PorteDroite");
        LoadSavedScene();
    }

    void LoadSavedScene()
    {
        if (PlayerPrefs.HasKey("PadlockOpen"))
        {
            SetDoorOpen();
        }
        else
        {
            SetInitialObjectState();
        }
    }

    void SetDoorOpen()
    {
        if (PlayerPrefs.GetInt("PadlockOpen", 1) != 2)
        {
            SetInitialObjectState();
        }
        else
        {
            float doorRotationX = 280f;
            float doorRotationY = -90f;
            float doorRotationZ = 90f;

            Vector3 savedDoorRotation = new Vector3(doorRotationX, doorRotationY, doorRotationZ);
            PorteGauche.transform.rotation = Quaternion.Euler(savedDoorRotation);

            float doorPositionX = 37f;
            float doorPositionY = -21f;
            float doorPositionZ = 0f;

            Vector3 savedDoorPosition = new Vector3(doorPositionX, doorPositionY, doorPositionZ);
            PorteGauche.transform.position = savedDoorPosition;

            doorRotationX = 270f;
            doorRotationY = -90f;
            doorRotationZ = 90f;

            savedDoorRotation = new Vector3(doorRotationX, doorRotationY, doorRotationZ);
            PorteDroite.transform.rotation = Quaternion.Euler(savedDoorRotation);

            doorPositionX = -136f;
            doorPositionY = 29f;
            doorPositionZ = 0f;

            savedDoorPosition = new Vector3(doorPositionX, doorPositionY, doorPositionZ);
            PorteDroite.transform.position = savedDoorPosition;
        }
        
    }

    void SetInitialObjectState()
    {
        float doorRotationX = 180f;
        float doorRotationY = -90f;
        float doorRotationZ = 90f;

        Vector3 savedDoorRotation = new Vector3(doorRotationX, doorRotationY, doorRotationZ);
        PorteGauche.transform.rotation = Quaternion.Euler(savedDoorRotation);
        PorteDroite.transform.rotation = Quaternion.Euler(savedDoorRotation);

        float doorPositionX = 0f;
        float doorPositionY = 0f;
        float doorPositionZ = 0f;

        Vector3 savedDoorPosition = new Vector3(doorPositionX, doorPositionY, doorPositionZ);
        PorteGauche.transform.position = savedDoorPosition;

        doorPositionX = -72f;
        doorPositionY = 0f;
        doorPositionZ = 0f;

        savedDoorPosition = new Vector3(doorPositionX, doorPositionY, doorPositionZ);
        PorteDroite.transform.position = savedDoorPosition;
    }
}
