using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoaderPorteDroite : MonoBehaviour
{
    GameObject PorteGauche;
    GameObject PorteDroite;

    void Start()
    {
        LoadSavedScene();
    }

    void LoadSavedScene()
    {
        if (PlayerPrefs.HasKey("PadlockOpen"))
        {
            SetDoorOpen();
        }
        //else
        //{
        //    SetInitialObjectState();
        //}
    }

    void SetDoorOpen()
    {
        //if (PlayerPrefs.GetInt("PadlockOpen", 1) != 2)
        //{
        //    // SetInitialObjectState();
        //}
        if (PlayerPrefs.GetInt("PadlockOpen", 1) == 2)
        {
            float doorRotationX = 262.916f;
            float doorRotationY = -90f;
            float doorRotationZ = 90f;

            Vector3 savedDoorRotation = new Vector3(doorRotationX, doorRotationY, doorRotationZ);
            this.transform.rotation = Quaternion.Euler(savedDoorRotation);

            float doorPositionX = 367f;
            float doorPositionY = 630f;
            float doorPositionZ = 70f;

            Vector3 savedDoorPosition = new Vector3(doorPositionX, doorPositionY, doorPositionZ);
            this.transform.position = savedDoorPosition;
        }
        
    }

    void SetInitialObjectState()
    {
        //float doorRotationX = 180f;
        //float doorRotationY = -90f;
        //float doorRotationZ = 90f;

        //Vector3 savedDoorRotation = new Vector3(doorRotationX, doorRotationY, doorRotationZ);
        //this.transform.rotation = Quaternion.Euler(savedDoorRotation);

        //float doorPositionX = -72f;
        //float doorPositionY = 0f;
        //float doorPositionZ = 0f;

        //Vector3 savedDoorPosition = new Vector3(doorPositionX, doorPositionY, doorPositionZ);
        //this.transform.position = savedDoorPosition;
    }
}
