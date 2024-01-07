using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoaderDoor : MonoBehaviour
{

    void Start()
    {
        LoadSavedScene();
    }

    void LoadSavedScene()
    {
        if (PlayerPrefs.HasKey("DoorRotationX") && PlayerPrefs.HasKey("DoorPositionX"))
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
        float doorRotationX = PlayerPrefs.GetFloat("DoorRotationX", 0f);
        float doorRotationY = PlayerPrefs.GetFloat("DoorRotationY", 0f);
        float doorRotationZ = PlayerPrefs.GetFloat("DoorRotationZ", 0f);

        Vector3 savedDoorRotation = new Vector3(doorRotationX, doorRotationY, doorRotationZ);
        this.transform.rotation = Quaternion.Euler(savedDoorRotation);

        float doorPositionX = PlayerPrefs.GetFloat("DoorPositionX", 0f);
        float doorPositionY = PlayerPrefs.GetFloat("DoorPositionY", 0f);
        float doorPositionZ = PlayerPrefs.GetFloat("DoorPositionZ", 0f);

        Vector3 savedDoorPosition = new Vector3(doorPositionX, doorPositionY, doorPositionZ);
        this.transform.position = savedDoorPosition;
    }

    void SetInitialObjectState()
    {
        float doorRotationX = PlayerPrefs.GetFloat("DoorRotationX", 1296f);
        float doorRotationY = PlayerPrefs.GetFloat("DoorRotationY", -117.692f);
        float doorRotationZ = PlayerPrefs.GetFloat("DoorRotationZ", -71.494f);

        Vector3 savedDoorRotation = new Vector3(doorRotationX, doorRotationY, doorRotationZ);
        this.transform.rotation = Quaternion.Euler(savedDoorRotation);

        float doorPositionX = PlayerPrefs.GetFloat("DoorPositionX", 1296f);
        float doorPositionY = PlayerPrefs.GetFloat("DoorPositionY", 151f);
        float doorPositionZ = PlayerPrefs.GetFloat("DoorPositionZ", 90f);

        Vector3 savedDoorPosition = new Vector3(doorPositionX, doorPositionY, doorPositionZ);
        this.transform.position = savedDoorPosition;
    }
}
